/* Oru Perfumes order-received page. Needs shared.js first. Shows the latest demo order saved in this browser. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();
  const root=document.getElementById('orderRoot');
  const o=store.get('oruLastOrder',null);
  const ok=o&&typeof o==='object'&&Array.isArray(o.items)&&o.items.length&&o.totals&&o.customer;
  if(!ok){
    root.innerHTML='<div class="empty-state"><p>We could not find a recent order in this browser.</p><a class="btn btn-oru-dark" href="index.html#shop">BROWSE THE COLLECTION</a></div>';
    return;
  }
  const d=new Date(o.date);
  const date=isNaN(d)?'':d.toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'});
  const PAYL={card:'Card payment (demo)',transfer:'Bank transfer (demo)',cod:'Pay on delivery (demo)'};
  const c=o.customer,t=o.totals,m=n=>money(Number(n)||0);
  root.innerHTML=`<p class="ord-no">${esc(o.no)}</p><p class="pd-desc">Thank you, ${esc(String(c.name).split(' ')[0])}. Your demo order has been recorded. No payment was taken and nothing will be shipped.</p>
  <div class="ord-grid">
    <div class="ord-box"><dl>
      <dt>ORDER NUMBER</dt><dd>${esc(o.no)}</dd>
      <dt>DATE</dt><dd>${esc(date)}</dd>
      <dt>PAYMENT METHOD</dt><dd>${esc(PAYL[o.payment]||'Demo')}</dd>
      <dt>DELIVERY</dt><dd>${esc(o.ship)}</dd>
      <dt>DELIVER TO</dt><dd>${esc(c.name)}<br>${esc(c.address)}<br>${esc(c.city)}, ${esc(c.state)}<br>${esc(c.phone)}<br>${esc(c.email)}</dd>
      ${c.notes?`<dt>NOTES</dt><dd>${esc(c.notes)}</dd>`:''}
    </dl></div>
    <div>
      <table class="ord-table"><thead><tr><th>Product</th><th>Total</th></tr></thead><tbody>
        ${o.items.map(i=>`<tr><td>${esc(i.name)} · ${esc(i.size)} × ${esc(i.qty)}<br><small class="text-muted">${esc(i.house)}</small></td><td>${m(i.unit*i.qty)}</td></tr>`).join('')}
        <tr><td>Subtotal</td><td>${m(t.sub)}</td></tr>
        ${t.discount?`<tr><td>Discount${o.coupon?' ('+esc(o.coupon)+')':''}</td><td>−${m(t.discount)}</td></tr>`:''}
        <tr><td>Delivery</td><td>${t.shipping?m(t.shipping):'Free'}</td></tr>
        <tr><td><b>Total</b></td><td><b>${m(t.total)}</b></td></tr>
      </tbody></table>
      <p class="sum-note mt-3">This order is stored only in this browser for the demo.</p>
      <a class="btn btn-oru-dark mt-2" href="index.html#shop">CONTINUE SHOPPING</a>
    </div>
  </div>`;
});
