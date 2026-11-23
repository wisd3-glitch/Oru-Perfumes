/* Oru Perfumes journal article page. Reads ?slug=. Needs shared.js and articles.js first. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  const root=document.getElementById('articleRoot');
  const i=ARTICLES.findIndex(a=>a.slug===new URLSearchParams(location.search).get('slug'));
  if(i<0){
    document.title='Story not found — ORU PERFUMES';
    root.innerHTML='<div class="empty-state"><h1 class="pg-title">Story not found</h1><p>We could not find that story.</p><a class="btn btn-oru-dark" href="journal.html">BACK TO THE JOURNAL</a></div>';
    return;
  }
  const a=ARTICLES[i];
  document.title=a.title+' — ORU PERFUMES';
  const FB="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80";
  const body=a.body.map(b=>b.h?`<h2>${esc(b.h)}</h2>`:b.ul?`<ul>${b.ul.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:`<p>${esc(b.p)}</p>`).join('');
  const prods=(a.products||[]).map(byId).filter(Boolean);
  const prev=ARTICLES[i-1],next=ARTICLES[i+1];
  const nl=(x,l)=>x?`<a class="art-nav-link" href="article.html?slug=${encodeURIComponent(x.slug)}"><span>${l}</span>${esc(x.title)}</a>`:'<span></span>';
  const more=ARTICLES.filter((_,k)=>k!==i).slice(0,3);
  root.innerHTML=`<article class="art">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="journal.html">Journal</a><span>/</span><span>${esc(a.cat)}</span></nav>
    <div class="eyebrow">${esc(a.cat.toUpperCase())} · ${esc(a.min)} MIN READ</div>
    <h1 class="pg-title">${esc(a.title)}</h1>
    <p class="art-meta">By the Oru team · ${esc(fmtDate(a.date))}</p>
    <img class="art-hero" onerror="this.onerror=null;this.src='${FB}'" src="${esc(a.image)}" alt="${esc(a.title)}">
    <div class="art-body">${body}</div>
    ${prods.length?`<div class="art-prods"><div class="eyebrow">FRAGRANCES MENTIONED</div><div class="row g-3">${prods.map(r=>`<div class="col-6 col-md-4"><a class="art-prod" href="product.html?id=${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt=""><span>${esc(r.house)}</span><b>${esc(r.name)}</b><small>${esc(r.size)} · ${money(r.price)}</small></a></div>`).join('')}</div></div>`:''}
    <div class="art-nav">${nl(prev,'← PREVIOUS')}${nl(next,'NEXT →')}</div>
  </article>
  <div class="eyebrow mt-5">KEEP READING</div><h2 class="pd-related-title">More <em>stories</em></h2>
  <div class="row g-4">${more.map(articleCard).join('')}</div>
  <p class="pd-demo">Sample editorial content for the case study. Images are placeholders from Unsplash.</p>`;
});
