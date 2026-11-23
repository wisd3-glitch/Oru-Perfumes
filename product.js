/* Oru Perfumes product page. Reads ?id=product-id. Needs shared.js first. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  const wb=document.getElementById('wishBtn');
  if(wb)wb.addEventListener('click',()=>{location.href='index.html?saved=1#shop'});

  const root=document.getElementById('productRoot');
  const p=byId(new URLSearchParams(location.search).get('id'));
  if(!p){
    document.title='Fragrance not found — ORU PERFUMES';
    root.innerHTML='<div class="container-xl pd text-center"><h1 class="pd-name">Fragrance not found</h1><p class="pd-desc mx-auto">We could not find that fragrance. It may have been removed.</p><a class="btn btn-oru-dark" href="index.html#shop">BACK TO THE COLLECTION</a></div>';
    return;
  }
  document.title=p.name+' — ORU PERFUMES';

  let size=p.size,qty=1;
  const sizes=Object.keys(p.variants);
  const rel=[...products.filter(x=>x.id!==p.id&&x.family===p.family),...products.filter(x=>x.id!==p.id&&x.family!==p.family)].slice(0,4);

  root.innerHTML=`
  <div class="container-xl pd">
    <nav class="crumbs" aria-label="Breadcrumb"><a href="index.html">Home</a><span>/</span><a href="index.html#shop">Shop</a><span>/</span><span>${esc(p.name)}</span></nav>
    <div class="pd-grid">
      <div class="pd-gallery">
        <div class="pd-main"><img id="pdMain" class="crop-0" src="${esc(p.image)}" alt="${esc(p.name)} by ${esc(p.house)}"></div>
        <div class="pd-thumbs">${[0,1,2].map(k=>`<button type="button" class="pd-thumb${k===0?' is-on':''}" data-thumb="${k}" aria-label="Show view ${k+1} of ${esc(p.name)}"><img class="crop-${k}" src="${esc(p.image)}" alt=""></button>`).join('')}</div>
      </div>
      <div class="pd-info">
        <div class="eyebrow">${esc(p.house)}</div>
        <h1 class="pd-name">${esc(p.name)}</h1>
        <div class="pd-price" id="pdPrice" aria-live="polite"></div>
        <p class="pd-desc">${esc(p.desc)}</p>
        <div class="pd-label">SIZE</div>
        <div class="pd-sizes" role="group" aria-label="Size">${sizes.map(s=>`<button type="button" class="pd-size${s===size?' is-on':''}" data-size="${esc(s)}" aria-pressed="${s===size}">${esc(s)}</button>`).join('')}</div>
        <div class="pd-buy">
          <div class="qty-ctl pd-qty"><button type="button" id="pdDec" aria-label="Decrease quantity">−</button><span id="pdQty" aria-live="polite">1</span><button type="button" id="pdInc" aria-label="Increase quantity">+</button></div>
          <button type="button" class="btn btn-oru-dark pd-add" id="pdAdd">ADD TO BAG +</button>
          <button type="button" class="pd-wish" id="pdWish" aria-label="Save to wishlist" aria-pressed="false">♡</button>
        </div>
        <ul class="pd-facts">
          <li><span>CONCENTRATION</span><b>${esc(p.concentration)}</b></li>
          <li><span>FAMILY</span><b>${esc(p.family)}</b></li>
          <li><span>SKU</span><b>${esc(p.sku)}</b></li>
        </ul>
        <details class="pd-more"><summary>Authenticity</summary><p>In a live shop this section would state where each bottle is sourced and how it is verified. Sample text for the case study; confirm real sourcing before launch.</p></details>
        <details class="pd-more"><summary>Delivery and returns</summary><p>Nationwide delivery. Estimates and costs are confirmed at checkout. Unopened bottles may be returned; opened fragrance cannot be. Sample policy for the case study.</p></details>
      </div>
    </div>

    <div class="pd-tabs">
      <div class="pd-tablist" role="tablist">
        <button type="button" role="tab" class="is-on" aria-selected="true" data-tab="desc">Description</button>
        <button type="button" role="tab" aria-selected="false" data-tab="info">Additional information</button>
        <button type="button" role="tab" aria-selected="false" data-tab="rev">Reviews (0)</button>
      </div>
      <div class="pd-panel" data-panel="desc">
        <p>${esc(p.desc)}</p>
        <div class="pd-notes">
          <div><span>TOP</span>${esc(p.notes.top)}</div>
          <div><span>HEART</span>${esc(p.notes.heart)}</div>
          <div><span>BASE</span>${esc(p.notes.base)}</div>
        </div>
      </div>
      <div class="pd-panel" data-panel="info" hidden>
        <table class="pd-table"><tbody>
          <tr><th>House</th><td>${esc(p.house)}</td></tr>
          <tr><th>Concentration</th><td>${esc(p.concentration)}</td></tr>
          <tr><th>Available sizes</th><td>${sizes.map(esc).join(', ')}</td></tr>
          <tr><th>Fragrance family</th><td>${esc(p.family)}</td></tr>
          <tr><th>SKU</th><td>${esc(p.sku)}</td></tr>
        </tbody></table>
      </div>
      <div class="pd-panel" data-panel="rev" hidden>
        <p>No reviews yet. Reviews from verified buyers will appear here.</p>
      </div>
    </div>

    <div class="eyebrow mt-5">KEEP EXPLORING</div>
    <h2 class="pd-related-title">Discover your signature <em>scent</em></h2>
    <div class="row g-4">${rel.map(r=>`<div class="col-6 col-lg-3"><article class="product-card"><a class="pd-rel-img" href="product.html?id=${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt="${esc(r.name)}"></a><div class="product-meta"><span>${esc(r.house)}</span></div><h3><a href="product.html?id=${encodeURIComponent(r.id)}">${esc(r.name)}</a></h3><div class="product-bottom"><span>${esc(r.size)} · ${esc(r.concentration)}</span><b>${money(r.price)}</b></div></article></div>`).join('')}</div>
    <p class="pd-demo">Case-study prototype. Product information, notes and prices are illustrative. Images are placeholders from Unsplash.</p>
  </div>`;

  const $=id=>document.getElementById(id);
  const refresh=()=>{
    $('pdPrice').textContent=money(p.variants[size]);
    $('pdQty').textContent=qty;
    $('pdInc').disabled=qty>=MAX_QTY;
    $('pdDec').disabled=qty<=1;
    const on=isWished(p.id),w=$('pdWish');
    w.textContent=on?'♥':'♡';w.classList.toggle('wished',on);
    w.setAttribute('aria-pressed',String(on));
    w.setAttribute('aria-label',on?'Remove from wishlist':'Save to wishlist');
  };
  refresh();

  root.addEventListener('click',e=>{
    const t=e.target.closest('button');if(!t)return;
    if(t.dataset.thumb!==undefined){
      $('pdMain').className='crop-'+t.dataset.thumb;
      root.querySelectorAll('.pd-thumb').forEach(b=>b.classList.toggle('is-on',b===t));
    }else if(t.dataset.size){
      size=t.dataset.size;
      root.querySelectorAll('.pd-size').forEach(b=>{const on=b===t;b.classList.toggle('is-on',on);b.setAttribute('aria-pressed',String(on))});
      refresh();
    }else if(t.dataset.tab){
      root.querySelectorAll('.pd-tablist button').forEach(b=>{const on=b===t;b.classList.toggle('is-on',on);b.setAttribute('aria-selected',String(on))});
      root.querySelectorAll('.pd-panel').forEach(pn=>{pn.hidden=pn.dataset.panel!==t.dataset.tab});
    }else if(t.id==='pdInc'){qty=Math.min(qty+1,MAX_QTY);refresh()}
    else if(t.id==='pdDec'){qty=Math.max(qty-1,1);refresh()}
    else if(t.id==='pdAdd'){addItem(p.id,size,qty)}
    else if(t.id==='pdWish'){toggleWishId(p.id);refresh()}
  });
});
