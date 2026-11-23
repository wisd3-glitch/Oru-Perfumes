/* Oru Perfumes checkout page. Needs shared.js first. Demo only: no payment is taken. */
const PAY=[
  {id:'card',label:'Card payment',note:'Demo only. A real gateway such as Paystack must be connected and tested before launch.'},
  {id:'transfer',label:'Bank transfer',note:'Demo only. Real bank details would be shown after the order is placed.'},
  {id:'cod',label:'Pay on delivery',note:'Demo only. Availability and areas would be confirmed by the shop.'}
];
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();
  const root=document.getElementById('checkoutRoot');
  if(!bag.length){
    root.innerHTML='<div class="empty-state"><p>Your bag is empty, so there is nothing to check out yet.</p><a class="btn btn-oru-dark" href="index.html#shop">BROWSE THE COLLECTION</a></div>';
    return;
  }
  const fld=(id,label,type,extra='',cls='')=>`<div class="fld ${cls}"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" ${extra}><div class="err" id="err-${id}" aria-live="polite"></div></div>`;
  root.innerHTML=`<form id="coForm" class="co-layout co-form" novalidate>
    <div>
      <div class="form-alert" id="formAlert" role="alert" hidden></div>
      <fieldset><legend>Contact</legend><div class="fgrid">
        ${fld('fn','FIRST NAME','text','autocomplete="given-name"')}
        ${fld('ln','LAST NAME','text','autocomplete="family-name"')}
        ${fld('email','EMAIL','email','autocomplete="email"')}
        ${fld('phone','PHONE','tel','autocomplete="tel" inputmode="tel" placeholder="08012345678"')}
      </div></fieldset>
      <fieldset><legend>Delivery address</legend><div class="fgrid">
        <div class="fld"><label for="state">STATE</label><select id="state" name="state" autocomplete="address-level1"><option value="">Select a state</option>${NG_STATES.map(s=>`<option>${esc(s)}</option>`).join('')}</select><div class="err" id="err-state" aria-live="polite"></div></div>
        ${fld('city','TOWN / CITY','text','autocomplete="address-level2"')}
        ${fld('address','STREET ADDRESS','text','autocomplete="street-address"','full')}
        <div class="fld full"><label for="notes">ORDER NOTES (OPTIONAL)</label><textarea id="notes" name="notes" rows="3" placeholder="Gift message or delivery instructions"></textarea></div>
      </div></fieldset>
      <fieldset><legend>Payment</legend>
        ${PAY.map((p,i)=>`<label class="pay-opt"><input type="radio" name="pay" value="${p.id}"${i===0?' checked':''}><span><b>${esc(p.label)}</b><small>${esc(p.note)}</small></span></label>`).join('')}
      </fieldset>
    </div>
    <aside class="summary" id="coSummary"></aside>
  </form>`;

  if(isSignedIn()){
    const a=getAccount(),f=document.getElementById('coForm').elements,parts=String(a.name||'').trim().split(/\s+/);
    const set=(k,v)=>{if(v&&f[k])f[k].value=v};
    set('fn',parts[0]);set('ln',parts.slice(1).join(' '));set('email',a.email);set('phone',a.phone);
    if(a.address){set('address',a.address.street);set('city',a.address.city);set('state',a.address.state)}
  }
  const sum=document.getElementById('coSummary');
  function renderSummary(){
    const t=calcTotals();
    sum.innerHTML=`<h2>Your order</h2>
      ${bag.map(x=>{const p=byId(x.id);return `<div class="sum-item"><span>${esc(p.name)} · ${esc(x.size)} × ${x.qty}</span><b>${money(p.variants[x.size]*x.qty)}</b></div>`}).join('')}
      <div class="ship-title">DELIVERY</div>${shipHTML(t)}
      ${totalsRows(t)}
      <button type="submit" class="btn btn-oru-dark w-100 mt-3" id="placeBtn">PLACE ORDER</button>
      <p class="sum-note">By placing an order you agree to our <a href="terms.html">Terms</a> and <a href="privacy.html">Privacy policy</a>.</p><p class="sum-note">Demo only. No payment is taken and nothing is shipped. <a href="cart.html">Edit bag</a></p>`;
  }
  renderSummary();
  sum.addEventListener('change',e=>{
    if(e.target.name!=='ship')return;
    setShip(e.target.value);renderSummary();
    sum.querySelector(`input[name="ship"][value="${e.target.value}"]`)?.focus();
  });

  const form=document.getElementById('coForm');
  const val=id=>form.elements[id].value.trim();
  function validate(){
    const e={};
    if(!val('fn'))e.fn='Enter your first name.';
    if(!val('ln'))e.ln='Enter your last name.';
    if(!/^\S+@\S+\.\S+$/.test(val('email')))e.email='Enter a valid email address.';
    if(val('phone').replace(/\D/g,'').length<10)e.phone='Enter a phone number with at least 10 digits.';
    if(!val('state'))e.state='Choose a state.';
    if(!val('city'))e.city='Enter your town or city.';
    if(val('address').length<5)e.address='Enter your street address.';
    return e;
  }
  form.addEventListener('submit',ev=>{
    ev.preventDefault();
    const errs=validate();
    ['fn','ln','email','phone','state','city','address'].forEach(id=>{
      document.getElementById('err-'+id).textContent=errs[id]||'';
      form.elements[id].setAttribute('aria-invalid',errs[id]?'true':'false');
    });
    const alertBox=document.getElementById('formAlert');
    const keys=Object.keys(errs);
    if(keys.length){
      alertBox.hidden=false;
      alertBox.textContent='Please check the highlighted fields.';
      form.elements[keys[0]].focus();
      return;
    }
    alertBox.hidden=true;
    document.getElementById('placeBtn').disabled=true;
    const payment=form.elements.pay.value;
    const order=placeOrder({name:val('fn')+' '+val('ln'),email:val('email'),phone:val('phone'),state:val('state'),city:val('city'),address:val('address'),notes:val('notes')},payment);
    if(order)location.href='order-received.html';
    else document.getElementById('placeBtn').disabled=false;
  });
});
