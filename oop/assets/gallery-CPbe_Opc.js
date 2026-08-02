import"./modulepreload-polyfill-P2Xu9kJm.js";var e=document.getElementById(`wall`);try{let t=await(await fetch(`./students.json`)).json(),n=Object.fromEntries(t.students.map(e=>[e.id,e])),r=(t.weeks??[]).filter(e=>(e.works??[]).length>0);e.innerHTML=r.length===0?`<div class="empty">動物園尚未開園——第一批物種上線後，這裡就會長出整座園區。<br/>（同學：deadline 前 push 到你的作品集 repo，你的物種就會入住）</div>`:r.map(e=>`
              <section class="week">
                <h2><span class="w mono">W${e.w}</span>${e.title??``}</h2>
                <div class="grid">
                  ${e.works.map(e=>{let t=n[e.id];return t?`<a class="card" href="${e.url}" target="_blank" rel="noopener">
                        <div class="name">${t.name}</div>
                        <div class="hint mono">open work ↗</div>
                      </a>`:``}).join(``)}
                </div>
              </section>`).join(``)}catch{e.innerHTML=`<div class="empty">作品資料載入失敗（students.json）。</div>`}