/* Oru Perfumes houses page. Needs shared.js first. All houses and descriptions are fictional sample content. */
const HOUSES=[
  {name:'MAISON VERANE',tag:'01 / THE MODERN CLASSIC',desc:'Polished, wearable signatures with a quiet confidence. The house leans on woods, soft spice and fresh green notes.'},
  {name:'CASA AMBRA',tag:'02 / THE ROMANTIC',desc:'Romantic compositions built around roses and florals, from deep and velvety to bright and citrus-led.'},
  {name:'ATELIER DUNE',tag:'03 / THE ARTISAN',desc:'Textured, artisanal fragrances shaped around oud, vetiver and driftwood, made to linger on the skin.'}
];
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  const root=document.getElementById('houseRoot');
  root.innerHTML=HOUSES.map(h=>{
    const list=products.filter(p=>p.house===h.name);
    const slug=h.name.toLowerCase().replace(/[^a-z0-9]+/g,'-');
    return `<section class="hb" id="${slug}">
      <div class="hb-head"><div><div class="eyebrow">${esc(h.tag)}</div><h2 class="hb-name">${esc(h.name)}</h2></div><div><p class="hb-desc">${esc(h.desc)}</p><span class="hb-count">${list.length} ${list.length===1?'FRAGRANCE':'FRAGRANCES'}</span></div></div>
      <div class="row g-4">${list.map(r=>`<div class="col-6 col-lg-3"><article class="product-card"><a class="pd-rel-img" href="product.html?id=${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt="${esc(r.name)}"></a><div class="product-meta"><span>${esc(r.family.toUpperCase())}</span></div><h3><a href="product.html?id=${encodeURIComponent(r.id)}">${esc(r.name)}</a></h3><div class="product-bottom"><span>${esc(r.size)} · ${esc(r.concentration)}</span><b>${money(r.price)}</b></div></article></div>`).join('')}</div>
    </section>`;
  }).join('');
});
