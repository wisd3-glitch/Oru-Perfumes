/* Oru Perfumes cart page. Needs shared.js first. */
document.addEventListener('DOMContentLoaded',()=>{
  const lines=document.getElementById('cartLines');
  const side=document.getElementById('cartSummary');
  const more=document.getElementById('cartMore');
  let couponMsg='';

  function render(focusShip){
    renderBag();
    const t=calcTotals();
    if(!bag.length){
      lines.innerHTML='<div class="empty-state"><p>Your bag is waiting for something exceptional.</p><a class="btn btn-oru-dark" href="index.html#shop">BROWSE THE COLLECTION</a></div>';
      side.hidden=true;side.innerHTML='';
    }else{
      lines.innerHTML=bag.map(x=>{
        const p=byId(x.id),u=p.variants[x.size];
        const a=`data-id="${esc(p.id)}" data-size="${esc(x.size)}"`;
        const link='product.html?id='+encodeURIComponent(p.id);
        return `<article class="cl"><a href="${link}"><img src="${esc(p.image)}" alt="${esc(p.name)}"></a><div class="cl-info"><span class="cl-house">${esc(p.house)}</span><a class="cl-name" href="${link}">${esc(p.name)}</a><small>${esc(x.size)} · ${money(u)} each</small></div><div class="qty-ctl"><button type="button" data-act="dec" ${a} aria-label="Decrease quantity of ${esc(p.name)}">−</button><span aria-live="polite">${x.qty}</span><button type="button" data-act="inc" ${a} aria-label="Increase quantity of ${esc(p.name)}"${x.qty>=MAX_QTY?' disabled':''}>+</button><button type="button" class="remove-link" data-act="remove" ${a}>REMOVE</button></div><b class="cl-total">${money(u*x.qty)}</b></article>`;
      }).join('');
      side.hidden=false;
      const note=couponMsg||(checkoutPrefs.coupon?COUPONS[checkoutPrefs.coupon].label+' applied.':'');
      side.innerHTML=`<h2>Order summary</h2>
        <form id="couponForm" class="coupon"><input name="code" value="${esc(checkoutPrefs.coupon)}" placeholder="Coupon code" aria-label="Coupon code" autocomplete="off"><button type="submit">APPLY</button></form>
        <div class="coupon-msg" role="status">${esc(note)}</div>
        ${totalsRows(t,true)}
        <div class="ship-title">DELIVERY</div>${shipHTML(t)}
        <div class="sum-row total"><span>Total</span><span>${money(t.total)}</span></div>
        <a class="btn btn-oru-dark w-100 mt-3" href="checkout.html">PROCEED TO CHECKOUT ↗</a>
        <p class="sum-note">Sample delivery rates and demo coupon for the case study.</p>`;
      if(focusShip)side.querySelector(`input[name="ship"][value="${focusShip}"]`)?.focus();
    }
    const inBag=new Set(bag.map(x=>x.id));
    const rel=products.filter(p=>!inBag.has(p.id)).slice(0,4);
    more.innerHTML=rel.length?`<div class="eyebrow mt-5">KEEP EXPLORING</div><h2 class="pd-related-title">You may be <em>interested</em></h2><div class="row g-4">${rel.map(r=>`<div class="col-6 col-lg-3"><article class="product-card"><a class="pd-rel-img" href="product.html?id=${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt="${esc(r.name)}"></a><div class="product-meta"><span>${esc(r.house)}</span></div><h3><a href="product.html?id=${encodeURIComponent(r.id)}">${esc(r.name)}</a></h3><div class="product-bottom"><span>${esc(r.size)} · ${esc(r.concentration)}</span><b>${money(r.price)}</b></div></article></div>`).join('')}</div>`:'';
  }

  lines.addEventListener('click',e=>{
    const b=e.target.closest('[data-act]');if(!b)return;
    const {id,size,act}=b.dataset;
    if(act==='remove')removeFromBag(id,size);else changeQty(id,size,act==='inc'?1:-1);
    couponMsg='';render();
  });
  side.addEventListener('submit',e=>{
    if(e.target.id!=='couponForm')return;
    e.preventDefault();
    couponMsg=applyCoupon(e.target.elements.code.value).msg;
    render();
  });
  side.addEventListener('change',e=>{
    if(e.target.name!=='ship')return;
    setShip(e.target.value);couponMsg='';render(e.target.value);
  });
  render();
});
