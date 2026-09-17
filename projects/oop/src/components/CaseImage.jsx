// 案例卡片的官方配圖：public/cases/ 底下的檔案，圖下標出處與教育用途（2026-09-17 使用者同意公開頁使用官方圖）
export default function CaseImage({ img, credit, alt }) {
  if (!img) return null
  return (
    <figure className="-mx-5 -mt-5 mb-3 border-b border-neutral-900 bg-neutral-100">
      <img
        src={`${import.meta.env.BASE_URL}cases/${img}`}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="block w-full aspect-[4/3] object-cover"
      />
      <figcaption className="px-3 py-1 text-[0.65rem] leading-snug text-neutral-500 bg-paper">
        圖：{credit}，教育用途引用
      </figcaption>
    </figure>
  )
}
