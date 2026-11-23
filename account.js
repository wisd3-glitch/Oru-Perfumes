/* Oru Perfumes account page (demo). Needs shared.js first. Views: #dashboard #orders #addresses #details #wishlist */
document.addEventListener('DOMContentLoaded',()=>{
  if(!isSignedIn()){location.replace('login.html');return}
  const root=document.getElementById('accountRoot');
  const VIEWS=[['dashboard','Dashboard'],['orders','Orders'],['addresses','Addresses'],['details','Account details'],['wishlist','Wishlist']];
  const m=n=>money(Number(n)||0);
  const first=a=>String(a.name||'').trim().split(/\s+/)[0]||'there';
  const fld=(id,label,type,val,extra='')=>`<div class="fld"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" value="${esc(val||'')}" ${extra}><div class="err" id="err-${id}" aria-live="polite"></div></div>`;
  const getOrder=()=>{const o=store.get('oruLastOrder',null);return o&&typeof o==='object'&&Array.isArray(o.items)&&o.totals&&o.customer?o:null};

  const views={
    dashboard(a){
      const o=getOrder(),qty=bag.reduce((s,x)=>s+x.qty,0);
      return `<h2>Hello, ${esc(first(a))}</h2><p class="ac-lead">From here you can see your latest order, manage your details and revisit the fragrances you have saved.</p>
      <div class="ac-stats"><a href="#wishlist"><b>${wish.length}</b><span>SAVED FRAGRANCES</span></a><a href="cart.html"><b>${qty}</b><span>ITEMS IN BAG</span></a><a href="#orders"><b>${o?esc(o.no):'None'}</b><span>LATEST ORDER</span></a></div>
      <a class="btn btn-oru-dark" href="index.html#shop">CONTINUE SHOPPING</a>`;
    },
    orders(){
      const o=getOrder();
      if(!o)return `<h2>Orders</h2><div class="empty-state"><p>No orders yet.</p><a class="btn btn-oru-dark" href="index.html#shop">BROWSE THE COLLECTION</a></div>`;
      const d=new Date(o.date),date=isNaN(d)?'':d.toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'});
      return `<h2>Orders</h2><table class="ord-table"><thead><tr><th>Order</th><th>Date</th><th>Total</th><th></th></tr></thead><tbody><tr><td>${esc(o.no)}</td><td>${esc(date)}</td><td>${m(o.totals.total)}</td><td><a class="text-link" href="order-received.html">VIEW ↗</a></td></tr></tbody></table><p class="sum-note">Demo: only your most recent order is kept, in this browser.</p>`;
    },
    addresses(a){
      const ad=a.address||{};
      return `<h2>Addresses</h2><p class="ac-lead">Your saved delivery address fills in the checkout form for you.</p>
      <form id="addrForm" class="co-form" novalidate><div class="form-ok" id="addrOk" role="status" hidden>Address saved.</div><div class="fgrid">
        <div class="fld full"><label for="street">STREET ADDRESS</label><input id="street" name="street" value="${esc(ad.street||'')}" autocomplete="street-address"></div>
        <div class="fld"><label for="city">TOWN / CITY</label><input id="city" name="city" value="${esc(ad.city||'')}" autocomplete="address-level2"></div>
        <div class="fld"><label for="state">STATE</label><select id="state" name="state" autocomplete="address-level1"><option value="">Select a state</option>${NG_STATES.map(s=>`<option${s===ad.state?' selected':''}>${esc(s)}</option>`).join('')}</select></div>
        <div class="fld"><label for="phone">PHONE</label><input id="phone" name="phone" type="tel" value="${esc(a.phone||'')}" autocomplete="tel"></div>
      </div><button type="submit" class="btn btn-oru-dark mt-3">SAVE ADDRESS</button></form>`;
    },
    details(a){
      return `<h2>Account details</h2>
      <form id="detForm" class="co-form" novalidate><div class="form-ok" id="detOk" role="status" hidden>Details saved.</div><div class="fgrid">
        ${fld('name','NAME','text',a.name,'autocomplete="name"')}${fld('email','EMAIL','email',a.email,'autocomplete="email"')}
      </div><button type="submit" class="btn btn-oru-dark mt-3">SAVE DETAILS</button></form>
      <p class="sum-note">Demo account: no password is stored. See our <a href="privacy.html">Privacy policy</a>.</p>`;
    },
    wishlist(){
      const list=wish.map(byId).filter(Boolean);
      if(!list.length)return `<h2>Wishlist</h2><div class="empty-state"><p>Nothing saved yet. Tap the heart on a fragrance to save it.</p><a class="btn btn-oru-dark" href="index.html#shop">BROWSE THE COLLECTION</a></div>`;
      return `<h2>Wishlist</h2><div class="row g-4">${list.map(r=>`<div class="col-6 col-xl-4"><article class="product-card"><a class="pd-rel-img" href="product.html?id=${encodeURIComponent(r.id)}"><img src="${esc(r.image)}" alt="${esc(r.name)}"></a><div class="product-meta"><span>${esc(r.house)}</span></div><h3><a href="product.html?id=${encodeURIComponent(r.id)}">${esc(r.name)}</a></h3><div class="product-bottom"><span>${esc(r.size)}</span><b>${m(r.price)}</b></div><button type="button" class="remove-link mt-2" data-unwish="${esc(r.id)}">REMOVE</button></article></div>`).join('')}</div>`;
    }
  };

  function render(){
    const a=getAccount();if(!a){location.replace('login.html');return}
    const key=VIEWS.some(v=>v[0]===location.hash.slice(1))?location.hash.slice(1):'dashboard';
    root.innerHTML=`<div class="faq-layout"><aside class="faq-side"><nav aria-label="Account">${VIEWS.map(([k,l])=>`<a href="#${k}"${k===key?' class="is-on" aria-current="page"':''}>${l}<span>→</span></a>`).join('')}<button type="button" class="ac-logout" id="logoutBtn">Log out<span>→</span></button></nav></aside><div class="ac-main">${views[key](a)}</div></div>`;
    window.scrollTo(0,0);
  }
  window.addEventListener('hashchange',render);
  root.addEventListener('click',e=>{
    if(e.target.closest('#logoutBtn')){signOut();location.href='login.html';return}
    const u=e.target.closest('[data-unwish]');
    if(u){toggleWishId(u.dataset.unwish);render()}
  });
  root.addEventListener('submit',e=>{
    e.preventDefault();
    const f=e.target,a=getAccount();if(!a)return;
    if(f.id==='addrForm'){
      a.address={street:f.elements.street.value.trim(),city:f.elements.city.value.trim(),state:f.elements.state.value};
      a.phone=f.elements.phone.value.trim();
      saveAccount(a);document.getElementById('addrOk').hidden=false;
    }else if(f.id==='detForm'){
      const name=f.elements.name.value.trim(),email=f.elements.email.value.trim();
      const eN=!name?'Enter your name.':'',eE=/^\S+@\S+\.\S+$/.test(email)?'':'Enter a valid email address.';
      document.getElementById('err-name').textContent=eN;document.getElementById('err-email').textContent=eE;
      f.elements.name.setAttribute('aria-invalid',eN?'true':'false');f.elements.email.setAttribute('aria-invalid',eE?'true':'false');
      if(eN||eE){(eN?f.elements.name:f.elements.email).focus();return}
      a.name=name;a.email=email;saveAccount(a);document.getElementById('detOk').hidden=false;
    }
  });
  renderBag();syncWishCount();render();
});
