/* Oru Perfumes: data and logic shared by every page. All product data is fictional sample data. */
const MAX_QTY=10;
const products=[
{id:'santal-no-04',sku:'ORU-001',name:'Santal No. 04',house:'MAISON VERANE',family:'Woody',size:'50ml',concentration:'Eau de Parfum',variants:{'50ml':185000,'100ml':320000},notes:{top:'Cardamom, pink pepper',heart:'Sandalwood, cedar',base:'Soft musk, vanilla'},image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',desc:'A warm, polished study in sandalwood, soft spice and quiet woods.'},
{id:'petale-de-minuit',sku:'ORU-002',name:'Pétale de Minuit',house:'CASA AMBRA',family:'Floral',size:'75ml',concentration:'Eau de Parfum',variants:{'75ml':220000,'100ml':280000},notes:{top:'Bergamot, pear',heart:'Rose, jasmine',base:'White musk, amber'},image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=85',desc:'A romantic floral with a softly luminous finish.'},
{id:'oud-velours',sku:'ORU-003',name:'Oud Velours',house:'ATELIER DUNE',family:'Amber',size:'100ml',concentration:'Eau de Parfum',variants:{'50ml':165000,'100ml':265000},notes:{top:'Saffron, bergamot',heart:'Oud, rose',base:'Amber, leather'},image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',desc:'A rich, enveloping oud accord with ambered depth.'},
{id:'verde-d-ete',sku:'ORU-004',name:'Verde d’Été',house:'MAISON VERANE',family:'Fresh',size:'50ml',concentration:'Eau de Toilette',variants:{'50ml':155000,'100ml':260000},notes:{top:'Lemon, green mandarin',heart:'Fig leaf, tea',base:'Cedar, light musk'},image:'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=900&q=85',desc:'Bright green notes and a crisp citrus opening.'},
{id:'bois-de-sable',sku:'ORU-005',name:'Bois de Sable',house:'ATELIER DUNE',family:'Woody',size:'100ml',concentration:'Extrait',variants:{'50ml':185000,'100ml':295000},notes:{top:'Juniper, incense',heart:'Vetiver, driftwood',base:'Ambergris, sandalwood'},image:'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=900&q=85',desc:'A textured, woody composition with a lingering drydown.'},
{id:'rose-noire',sku:'ORU-006',name:'Rose Noire',house:'CASA AMBRA',family:'Floral',size:'50ml',concentration:'Eau de Parfum',variants:{'50ml':198000,'100ml':330000},notes:{top:'Blackcurrant, pink pepper',heart:'Damask rose',base:'Patchouli, cedar'},image:'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=900&q=85',desc:'A darker rose interpretation balanced by soft woods.'},
{id:'ambre-serein',sku:'ORU-007',name:'Ambre Serein',house:'MAISON VERANE',family:'Amber',size:'75ml',concentration:'Eau de Parfum',variants:{'75ml':245000,'100ml':310000},notes:{top:'Mandarin, cardamom',heart:'Labdanum, cinnamon',base:'Amber, tonka bean'},image:'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=900&q=85',desc:'Golden amber, gentle spice and a smooth resinous warmth.'},
{id:'citrus-archive',sku:'ORU-008',name:'Citrus Archive',house:'CASA AMBRA',family:'Fresh',size:'50ml',concentration:'Eau de Parfum',variants:{'50ml':175000,'100ml':290000},notes:{top:'Grapefruit, yuzu',heart:'Neroli, ginger',base:'Vetiver, white musk'},image:'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=900&q=85',desc:'A fresh citrus-led scent with a clean, modern character.'}
];
products.forEach(p=>{p.price=p.variants[p.size]});
const byId=id=>products.find(p=>p.id===id);
const money=n=>'₦'+Number(n).toLocaleString('en-NG');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fold=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');

/* Safe storage: never throws, even if storage is blocked or the saved data is corrupted. */
const store={
  get(key,fallback){try{const v=localStorage.getItem(key);return v?JSON.parse(v):fallback}catch(e){return fallback}},
  set(key,val){try{localStorage.setItem(key,JSON.stringify(val));return true}catch(e){return false}}
};

/* Bag items are saved as {id,size,qty}. Older saves (list position, or no size) are converted once. */
function loadBag(){
  const raw=store.get('oruBag',[]);
  const out=[];
  if(!Array.isArray(raw))return out;
  raw.forEach(x=>{
    if(!x||typeof x!=='object')return;
    const p=x.id?byId(x.id):products[x.i];
    const qty=Math.min(Math.floor(Number(x.qty)),MAX_QTY);
    if(!p||!(qty>0))return;
    const size=p.variants[x.size]?x.size:p.size;
    const same=out.find(o=>o.id===p.id&&o.size===size);
    if(same)same.qty=Math.min(same.qty+qty,MAX_QTY);else out.push({id:p.id,size,qty});
  });
  return out;
}
let bag=loadBag();
function saveBag(){store.set('oruBag',bag);renderBag()}
function openBag(){
  const panel=document.getElementById('cartPanel');if(!panel)return;
  window.bootstrap?bootstrap.Offcanvas.getOrCreateInstance(panel).show():panel.classList.add('show','fallback-visible');
}
function addItem(id,size,qty){
  const p=byId(id);if(!p||!p.variants[size])return;
  const found=bag.find(x=>x.id===id&&x.size===size);
  const add=Math.max(1,Math.floor(Number(qty)||1));
  if(found)found.qty=Math.min(found.qty+add,MAX_QTY);else bag.push({id,size,qty:Math.min(add,MAX_QTY)});
  saveBag();openBag();
}
function addToBag(i){const p=products[i];if(p)addItem(p.id,p.size,1)}
function removeFromBag(id,size){bag=bag.filter(x=>!(x.id===id&&x.size===size));saveBag()}
function changeQty(id,size,delta){
  const x=bag.find(b=>b.id===id&&b.size===size);if(!x)return;
  x.qty+=delta;
  if(x.qty<1)bag=bag.filter(b=>b!==x);else x.qty=Math.min(x.qty,MAX_QTY);
  saveBag();
}
function renderBag(){
  const count=document.getElementById('bagCount');if(!count)return;
  const qty=bag.reduce((s,x)=>s+x.qty,0);
  count.textContent=qty;
  const label=document.getElementById('cartQtyLabel');if(label)label.textContent='('+qty+')';
  const el=document.getElementById('cartItems');
  if(el){
    if(!bag.length){
      el.innerHTML='<p class="empty-cart">Your bag is waiting for something exceptional.</p>';
    }else{
      el.innerHTML=bag.map(x=>{
        const p=byId(x.id);
        const a=`data-id="${esc(p.id)}" data-size="${esc(x.size)}"`;
        return `<div class="cart-row"><img src="${esc(p.image)}" alt=""><div class="flex-grow-1"><b>${esc(p.name)}</b><small>${esc(x.size)}</small><div>${money(p.variants[x.size]*x.qty)}</div><div class="qty-ctl"><button type="button" data-act="dec" ${a} aria-label="Decrease quantity of ${esc(p.name)}">−</button><span aria-live="polite">${x.qty}</span><button type="button" data-act="inc" ${a} aria-label="Increase quantity of ${esc(p.name)}"${x.qty>=MAX_QTY?' disabled':''}>+</button><button type="button" class="remove-link" data-act="remove" ${a}>REMOVE</button></div></div></div>`;
      }).join('');
    }
    if(!el.dataset.bound){
      el.dataset.bound='1';
      el.addEventListener('click',e=>{
        const b=e.target.closest('[data-act]');if(!b)return;
        const {id,size,act}=b.dataset;
        if(act==='remove')removeFromBag(id,size);else changeQty(id,size,act==='inc'?1:-1);
      });
    }
  }
  const total=document.getElementById('cartTotal');
  if(total)total.textContent=money(bag.reduce((s,x)=>s+byId(x.id).variants[x.size]*x.qty,0));
}

/* Wishlist: saved in the browser and counted in the header on every page. */
let wish=(()=>{const raw=store.get('oruWish',[]);return Array.isArray(raw)?raw.filter(id=>byId(id)):[]})();
const isWished=id=>wish.includes(id);
function toggleWishId(id){
  if(!byId(id))return false;
  wish=isWished(id)?wish.filter(x=>x!==id):[...wish,id];
  store.set('oruWish',wish);
  syncWishCount();
  return isWished(id);
}
function syncWishCount(){const c=document.getElementById('wishCount');if(c)c.textContent=wish.length}

const NG_STATES=['Abia','Adamawa','Akwa Ibom','Anambra','Bauchi','Bayelsa','Benue','Borno','Cross River','Delta','Ebonyi','Edo','Ekiti','Enugu','Federal Capital Territory','Gombe','Imo','Jigawa','Kaduna','Kano','Katsina','Kebbi','Kogi','Kwara','Lagos','Nasarawa','Niger','Ogun','Ondo','Osun','Oyo','Plateau','Rivers','Sokoto','Taraba','Yobe','Zamfara'];

/* ===== Demo account =====
   There is no server, so nothing is verified. Passwords are never stored or checked.
   One demo profile is kept in this browser's storage. */
function getAccount(){
  const a=store.get('oruAccount',null);
  return a&&typeof a==='object'&&typeof a.email==='string'?a:null;
}
const isSignedIn=()=>!!getAccount()&&store.get('oruSignedIn',false)===true;
const saveAccount=a=>store.set('oruAccount',a);
const signIn=()=>store.set('oruSignedIn',true);
const signOut=()=>store.set('oruSignedIn',false);

/* ===== Delivery, coupon, totals and orders (sample rates and codes for the case study) ===== */
const SHIP_OPTIONS=[
  {id:'standard',label:'Standard delivery',note:'3 to 7 working days',fee:5000,freeAbove:250000},
  {id:'express',label:'Express delivery',note:'1 to 3 working days',fee:12000}
];
const COUPONS={DEMO10:{pct:10,label:'Demo code: 10% off'}};
let checkoutPrefs=(()=>{
  const r=store.get('oruCheckout',{})||{};
  return {ship:SHIP_OPTIONS.some(o=>o.id===r.ship)?r.ship:'standard',coupon:COUPONS[r.coupon]?r.coupon:''};
})();
const savePrefs=()=>store.set('oruCheckout',checkoutPrefs);
function setShip(id){if(SHIP_OPTIONS.some(o=>o.id===id)){checkoutPrefs.ship=id;savePrefs()}}
function applyCoupon(code){
  const c=String(code||'').trim().toUpperCase();
  if(!c){checkoutPrefs.coupon='';savePrefs();return{ok:true,msg:''}}
  if(!COUPONS[c])return{ok:false,msg:'That code is not valid.'};
  checkoutPrefs.coupon=c;savePrefs();
  return{ok:true,msg:COUPONS[c].label+' applied.'};
}
function calcTotals(){
  const sub=bag.reduce((s,x)=>s+byId(x.id).variants[x.size]*x.qty,0);
  const c=COUPONS[checkoutPrefs.coupon];
  const discount=c?Math.round(sub*c.pct/100):0;
  const after=sub-discount;
  const opt=SHIP_OPTIONS.find(o=>o.id===checkoutPrefs.ship)||SHIP_OPTIONS[0];
  const shipping=!bag.length?0:(opt.freeAbove&&after>opt.freeAbove?0:opt.fee);
  return{sub,discount,after,opt,shipping,total:after+shipping};
}
function shipHTML(t){
  return SHIP_OPTIONS.map(o=>{
    const free=o.freeAbove&&t.after>o.freeAbove;
    const fee=free?0:o.fee;
    return `<label class="ship-opt"><input type="radio" name="ship" value="${o.id}"${o.id===checkoutPrefs.ship?' checked':''}><span><b>${esc(o.label)}</b><small>${esc(o.note)}${o.freeAbove?' · free above '+money(o.freeAbove):''}</small></span><em>${fee?money(fee):'Free'}</em></label>`;
  }).join('');
}
function totalsRows(t,preOnly){
  const r=(l,v,c)=>`<div class="sum-row${c?' '+c:''}"><span>${l}</span><span>${v}</span></div>`;
  const pre=r('Subtotal',money(t.sub))+(t.discount?r('Discount ('+esc(checkoutPrefs.coupon)+')','−'+money(t.discount),'disc'):'');
  if(preOnly)return pre;
  return pre+r('Delivery',t.shipping?money(t.shipping):'Free')+r('Total',money(t.total),'total');
}
/* Creates the order, keeps only the latest one in this browser, and empties the bag. */
function placeOrder(customer,payment){
  if(!bag.length)return null;
  const t=calcTotals();
  const alpha='ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let rand='';
  try{const u=new Uint8Array(4);crypto.getRandomValues(u);u.forEach(n=>{rand+=alpha[n%alpha.length]})}
  catch(e){for(let i=0;i<4;i++)rand+=alpha[Math.floor(Math.random()*alpha.length)]}
  const d=new Date();
  const order={
    no:'ORU-'+String(d.getFullYear()).slice(2)+String(d.getMonth()+1).padStart(2,'0')+String(d.getDate()).padStart(2,'0')+'-'+rand,
    date:d.toISOString(),payment,customer,ship:t.opt.label,coupon:checkoutPrefs.coupon,
    totals:{sub:t.sub,discount:t.discount,shipping:t.shipping,total:t.total},
    items:bag.map(x=>{const p=byId(x.id);return{id:p.id,name:p.name,house:p.house,size:x.size,qty:x.qty,unit:p.variants[x.size]}})
  };
  store.set('oruLastOrder',order);
  bag=[];checkoutPrefs.coupon='';savePrefs();saveBag();
  return order;
}

/* Fallbacks that keep the menu, bag and modal usable if Bootstrap does not load. */
document.addEventListener('click',e=>{
  if(e.target.closest('#wishBtn')&&!document.getElementById('productGrid'))location.href='index.html?saved=1#shop';
  if(e.target.closest('[data-bs-dismiss]'))document.querySelectorAll('.fallback-visible').forEach(x=>x.classList.remove('show','fallback-visible'));
  if(e.target.closest('[data-bs-toggle="offcanvas"]')&&!window.bootstrap)document.getElementById('cartPanel')?.classList.add('show','fallback-visible');
  if(e.target.closest('[data-bs-toggle="collapse"]')&&!window.bootstrap)document.getElementById('mainNav')?.classList.toggle('show');
});
