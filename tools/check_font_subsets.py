#!/usr/bin/env python3
"""朱雀仿宋標題字子集檢查。

每個用 ZhuqueFangsong-subset.woff2 的頁面都要有自己的子集（README「每個用朱雀標題字的頁面
要有自己的子集」）。這支腳本檢查：

1. 缺字：該頁自己的來源文字（手寫頁＝該頁 index.html；Vite 專案照
   projects/designthinking/README.md 的 SOP＝src/**/*.js* 與 html 入口）裡，
   朱雀仿宋原始字體有收、子集卻沒有的字。原始字體本來就沒有的字（emoji 等）不算缺字，
   只列出數量。
2. 借用：頁面引用的字型網址必須指向自己的子集，不能指向別頁的。
3. 未登記：repo 裡任何引用 ZhuqueFangsong-subset.woff2 的 html/css/js 都要登記在 PAGES，
   新頁面沒登記會直接失敗（提醒補設定、建自己的子集）。
4. ?v=：字型網址要帶 ?v=，且不早於子集檔最後一次 commit 的日期（否則使用者瀏覽器沿用舊字型）。
   同一頁的多個引用 ?v= 要一致。Vite 專案 public/ 與上線目錄的子集要相同（否則要重新 build）。

1～3 是錯誤（exit 1）；4 預設是警告，加 --strict 才算錯誤。

需要 fonttools＋brotli。原始字體用 --full-font 指定，否則從 TrionesType/zhuque 的 release
下載到 ~/.cache/zhuque/。

    python3 tools/check_font_subsets.py [--full-font ZhuqueFangsong-Regular.ttf] [--strict]
"""

from __future__ import annotations

import argparse
import io
import os
import posixpath
import re
import subprocess
import sys
import urllib.request
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

from fontTools.ttLib import TTFont

ROOT = Path(__file__).resolve().parent.parent
FONT_NAME = 'ZhuqueFangsong-subset.woff2'
ZHUQUE_VERSION = '0.212'
ZHUQUE_URL = (f'https://github.com/TrionesType/zhuque/releases/download/'
              f'v{ZHUQUE_VERSION}/ZhuqueFangsong-v{ZHUQUE_VERSION}.zip')
REF_SUFFIXES = {'.html', '.css', '.js', '.jsx', '.mjs', '.ts', '.tsx'}
URL_RE = re.compile(r"""url\(\s*['"]?([^'")\s]*""" + re.escape(FONT_NAME) + r"""[^'")\s]*)['"]?\s*\)""")


@dataclass
class Page:
    name: str
    base: str                 # 上線網址路徑，例如 /oop/
    sources: list[str]        # 來源文字（glob，相對 repo 根目錄）
    font: str                 # 子集檔（Vite 專案＝public/ 那份）
    refs: list[str]           # 允許引用字型的檔案（glob）
    deployed_font: str | None = None  # Vite 專案 build 後的上線子集
    source_files: list[Path] = field(default_factory=list)

    @property
    def served_font(self) -> str:
        return '/' + (self.deployed_font or self.font)


# 新增使用朱雀標題字的頁面時，在這裡登記，並照 SOP 建它自己的子集。
PAGES = [
    Page('課程總覽首頁', '/',
         sources=['index.html'],
         font='fonts/' + FONT_NAME,
         refs=['index.html']),
    Page('脈絡設計與實踐', '/contextdesign/',
         sources=['contextdesign/index.html'],
         font='contextdesign/fonts/' + FONT_NAME,
         refs=['contextdesign/index.html']),
    Page('研究寫作套件', '/research-writing-kit/',
         sources=['research-writing-kit/index.html'],
         font='research-writing-kit/fonts/' + FONT_NAME,
         refs=['research-writing-kit/index.html']),
    Page('設計思考（Vite）', '/designthinking/',
         sources=['projects/designthinking/src/**/*.js*',
                  'projects/designthinking/index.html'],
         font='projects/designthinking/public/fonts/' + FONT_NAME,
         deployed_font='designthinking/fonts/' + FONT_NAME,
         refs=['projects/designthinking/src/**/*.css',
               'designthinking/assets/*.css']),
    Page('物件導向程式設計（Vite，含作業牆）', '/oop/',
         sources=['projects/oop/src/**/*.js*',
                  'projects/oop/index.html',
                  'projects/oop/gallery/index.html'],
         font='projects/oop/public/fonts/' + FONT_NAME,
         deployed_font='oop/fonts/' + FONT_NAME,
         refs=['projects/oop/src/**/*.css',
               'projects/oop/gallery/index.html',
               'oop/assets/*.css',
               'oop/gallery/index.html']),
]


class Report:
    def __init__(self, strict: bool):
        self.strict = strict
        self.errors = 0
        self.warnings = 0
        self.gha = os.environ.get('GITHUB_ACTIONS') == 'true'

    def _emit(self, level: str, msg: str, file: str | None, line: int | None):
        print(f'  [{"錯誤" if level == "error" else "警告"}] {msg}')
        if self.gha:
            loc = ''
            if file:
                loc = f' file={file}' + (f',line={line}' if line else '')
            print(f'::{level}{loc}::{msg}')

    def error(self, msg, file=None, line=None):
        self.errors += 1
        self._emit('error', msg, file, line)

    def warn(self, msg, file=None, line=None):
        if self.strict:
            self.error(msg, file, line)
            return
        self.warnings += 1
        self._emit('warning', msg, file, line)


def tracked_files() -> list[str]:
    # 含未 commit 的新檔（剛 build 出來的 assets），排除 .gitignore
    out = subprocess.run(['git', 'ls-files', '-z', '--cached', '--others', '--exclude-standard'],
                         cwd=ROOT, check=True, capture_output=True).stdout.decode()
    return sorted({p for p in out.split('\0') if p and (ROOT / p).is_file()})


def expand(globs: list[str]) -> list[Path]:
    files: list[Path] = []
    for g in globs:
        hits = sorted(p for p in ROOT.glob(g) if p.is_file() and 'node_modules' not in p.parts)
        files.extend(h for h in hits if h not in files)
    return files


def cmap_chars(path: Path) -> set[str]:
    font = TTFont(path)
    return {chr(cp) for cp in font.getBestCmap()}


def load_full_font(arg: str | None) -> Path:
    if arg:
        return Path(arg)
    if os.environ.get('ZHUQUE_TTF'):
        return Path(os.environ['ZHUQUE_TTF'])
    cache = Path(os.environ.get('ZHUQUE_CACHE', Path.home() / '.cache' / 'zhuque')) / ZHUQUE_VERSION
    ttf = cache / 'ZhuqueFangsong-Regular.ttf'
    if not ttf.exists():
        print(f'下載朱雀仿宋 v{ZHUQUE_VERSION}：{ZHUQUE_URL}')
        with urllib.request.urlopen(ZHUQUE_URL, timeout=120) as r:
            data = r.read()
        with zipfile.ZipFile(io.BytesIO(data)) as z:
            member = next(n for n in z.namelist() if n.endswith('ZhuqueFangsong-Regular.ttf'))
            cache.mkdir(parents=True, exist_ok=True)
            ttf.write_bytes(z.read(member))
    return ttf


def last_commit_date(rel: str) -> str | None:
    """子集檔最後一次 commit 的日期（臺北時間 YYYYMMDD）。"""
    r = subprocess.run(['git', 'log', '-1', '--format=%ad', '--date=format-local:%Y%m%d', '--', rel],
                       cwd=ROOT, capture_output=True, text=True, env={**os.environ, 'TZ': 'Asia/Taipei'})
    return r.stdout.strip() or None


def served_path(rel: str, page: Page | None) -> str:
    """引用檔在網站上的位置，用來解析相對網址。projects/ 底下的原始碼以頁面 base 為準。"""
    if rel.startswith('projects/') and page:
        return page.base + 'index.html'
    return '/' + rel


def resolve(url: str, rel: str, page: Page | None) -> tuple[str, str | None]:
    path, _, query = url.partition('?')
    v = None
    for part in query.split('&'):
        if part.startswith('v='):
            v = part[2:]
    if not path.startswith('/'):
        path = posixpath.normpath(posixpath.join(posixpath.dirname(served_path(rel, page)), path))
    return path, v


def fmt_chars(chars: set[str]) -> str:
    return ''.join(sorted(chars)) + '（' + ' '.join(f'U+{ord(c):04X}' for c in sorted(chars)) + '）'


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__.split('\n')[0])
    ap.add_argument('--full-font', help='朱雀仿宋原始 ttf（未指定則下載 release）')
    ap.add_argument('--strict', action='store_true', help='?v= 與 build 同步問題也算錯誤')
    args = ap.parse_args()
    rep = Report(args.strict)

    full = cmap_chars(load_full_font(args.full_font))
    by_served = {p.served_font: p for p in PAGES}

    # 每個引用檔屬於哪一頁
    owner: dict[str, Page] = {}
    for page in PAGES:
        for f in expand(page.refs):
            owner[f.relative_to(ROOT).as_posix()] = page

    # 掃全 repo 的字型引用
    refs_by_page: dict[str, list[tuple[str, int, str, str | None]]] = {p.name: [] for p in PAGES}
    print('== 字型引用')
    for rel in tracked_files():
        if Path(rel).suffix not in REF_SUFFIXES or 'node_modules' in rel:
            continue
        try:
            text = (ROOT / rel).read_text(encoding='utf-8')
        except (UnicodeDecodeError, FileNotFoundError):
            continue
        for lineno, line in enumerate(text.splitlines(), 1):
            for m in URL_RE.finditer(line):
                page = owner.get(rel)
                path, v = resolve(m.group(1), rel, page)
                print(f'  {rel}:{lineno} → {m.group(1)}')
                if page is None:
                    rep.error(f'{rel} 引用了朱雀子集 {m.group(1)}，但沒有登記在 tools/check_font_subsets.py 的 PAGES；'
                              '新頁面要登記並建自己的子集', rel, lineno)
                    continue
                if path != page.served_font:
                    other = by_served.get(path)
                    whose = f'「{other.name}」的子集' if other else '不存在的子集'
                    rep.error(f'{page.name}：{rel} 借用了{whose} {path}，應該用自己的 {page.served_font}',
                              rel, lineno)
                refs_by_page[page.name].append((rel, lineno, path, v))

    for page in PAGES:
        print(f'\n== {page.name}（{page.base}）')
        font_path = ROOT / page.font
        if not font_path.exists():
            rep.error(f'{page.name}：找不到子集 {page.font}', page.font)
            continue
        subset = cmap_chars(font_path)

        page.source_files = expand(page.sources)
        if not page.source_files:
            rep.error(f'{page.name}：找不到來源文字 {page.sources}')
            continue
        text = ''.join(f.read_text(encoding='utf-8') for f in page.source_files)
        used = {c for c in text if not c.isspace() and c.isprintable()}
        in_font = used & full
        missing = in_font - subset
        print(f'  子集：{page.font}（{len(subset)} 字）')
        print(f'  來源：{", ".join(f.relative_to(ROOT).as_posix() for f in page.source_files)}')
        print(f'  來源用字 {len(used)}，原始字體有收 {len(in_font)}，原始字體沒有 {len(used - full)}（不計）')
        if missing:
            # 標出缺字第一次出現的位置，方便在 PR 上看到
            where = None
            for f in page.source_files:
                for lineno, line in enumerate(f.read_text(encoding='utf-8').splitlines(), 1):
                    if any(c in missing for c in line):
                        where = (f.relative_to(ROOT).as_posix(), lineno)
                        break
                if where:
                    break
            rep.error(f'{page.name}：子集缺 {len(missing)} 字：{fmt_chars(missing)}；'
                      f'照 projects/designthinking/README.md 的 SOP 重新子集化並更新 ?v=',
                      *(where or (page.font, None)))
        else:
            print('  缺字：無')

        if page.deployed_font:
            dep = ROOT / page.deployed_font
            if not dep.exists():
                rep.error(f'{page.name}：找不到上線子集 {page.deployed_font}（需要重新 build）', page.deployed_font)
            elif dep.read_bytes() != font_path.read_bytes():
                rep.warn(f'{page.name}：上線子集 {page.deployed_font} 與 {page.font} 不同，需要重新 build',
                         page.deployed_font)

        refs = refs_by_page[page.name]
        if not refs:
            rep.warn(f'{page.name}：沒有找到任何引用字型的檔案，PAGES 設定可能過時')
        versions = {v for *_, v in refs}
        for rel, lineno, _, v in refs:
            if v is None:
                rep.warn(f'{page.name}：{rel} 的字型網址沒有帶 ?v=，更新子集後使用者瀏覽器會沿用舊字型',
                         rel, lineno)
        if len(versions - {None}) > 1:
            rep.warn(f'{page.name}：同一頁的字型網址 ?v= 不一致：{sorted(versions - {None})}')
        committed = last_commit_date(page.font)
        for v in sorted(versions - {None}):
            if committed and re.fullmatch(r'\d{8}', v) and v < committed:
                rep.warn(f'{page.name}：?v={v} 早於子集最後更新日 {committed}，要把 ?v= 改成新日期')

    print(f'\n結果：{rep.errors} 個錯誤、{rep.warnings} 個警告')
    return 1 if rep.errors else 0


if __name__ == '__main__':
    sys.exit(main())
