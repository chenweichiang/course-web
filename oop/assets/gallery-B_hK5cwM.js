import"./modulepreload-polyfill-P2Xu9kJm.js";var e=document.getElementById(`wall`);try{let t=await(await fetch(`./students.json`)).json(),n=Object.fromEntries(t.students.map(e=>[e.id,e])),r=(t.weeks??[]).filter(e=>(e.works??[]).length>0);e.innerHTML=r.length===0?`<div class="empty">還沒有作品——第一批作業上線後，這裡就會長出全班的作品牆。<br/>（同學：deadline 前 push 到你的作品集 repo 就會出現在這）</div>`:r.map(e=>`
              <section class="week">
                <h2><span class="w mono">W${e.w}</span>${e.title??``}</h2>
                <div class="grid">
                  ${e.works.map(e=>{let t=n[e.id];return t?`<a class="card" href="${e.url}" target="_blank" rel="noopener">
                        <div class="name">${t.name}</div>
                        <div class="hint mono">open work ↗</div>
                      </a>`:``}).join(``)}
                </div>
              </section>`).join(``)}catch{e.innerHTML=`<div class="empty">作品資料載入失敗（students.json）。</div>`}