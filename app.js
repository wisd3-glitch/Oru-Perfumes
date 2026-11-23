/* Oru Perfumes home page: shop grid, filters, quick view, journal carousel. Needs shared.js first. */
const state={family:'*',q:'',wishOnly:false};
let iso=null;

function showProduct(i){
  const p=products[i];if(!p)return;
  const img=document.getElementById('modalImage');
  img.src=p.image;img.alt=p.name;
  document.getElementById('modalHouse').textContent=p.house;
  document.getElementById('modalName').textContent=p.name;
  document.getElementById('modalDesc').textContent=p.desc;
  document.getElementById('modalPrice').textContent=money(p.price);
  document.getElementById('modalSize').textContent=p.size;
  document.getElementById('modalConcentration').textContent=p.concentration;
  document.getElementById('modalAdd').onclick=()=>addToBag(i);
  const more=document.getElementById('modalMore');if(more)more.href='product.html?id='+encodeURIComponent(p.id);
  const m=document.getElementById('productModal');
  window.bootstrap?bootstrap.Modal.getOrCreateInstance(m).show():m.classList.add('show','fallback-visible');
}

function syncWish(){
  document.querySelectorAll('.product-item').forEach(el=>{
    const b=el.querySelector('.product-meta button');if(!b)return;
    const on=isWished(el.dataset.id);
    b.classList.toggle('wished',on);
    b.textContent=on?'♥':'♡';
    b.setAttribute('aria-pressed',String(on));
    b.setAttribute('aria-label',on?'Remove from wishlist':'Add to wishlist');
  });
  syncWishCount();
  const wb=document.getElementById('wishBtn');if(wb)wb.classList.toggle('is-on',state.wishOnly);
}
function toggleWish(btn){
  const el=btn.closest('.product-item');
  if(!el||!el.dataset.id)return;
  toggleWishId(el.dataset.id);
  syncWish();
  if(state.wishOnly)applyFilters();
}

/* Filtering: family, search text and saved-only work together. */
function matches(el){
  if(state.family!=='*'&&!el.matches(state.family))return false;
  if(state.wishOnly&&!isWished(el.dataset.id))return false;
  if(state.q){
    const p=byId(el.dataset.id);
    return fold(p.name+' '+p.house).includes(state.q);
  }
  return true;
}
function applyFilters(){
  const items=[...document.querySelectorAll('.product-item')];
  let shown;
  if(iso){iso.arrange({filter:matches});shown=iso.filteredItems.length}
  else{shown=0;items.forEach(el=>{const ok=matches(el);el.style.display=ok?'':'none';if(ok)shown++})}
  const msg=document.getElementById('noResults');
  if(msg){
    msg.hidden=shown>0;
    msg.textContent=state.wishOnly&&!wish.length?'Nothing saved yet. Tap the heart on a fragrance to save it.':'No fragrances match your search.';
  }
  syncWish();
}

document.addEventListener('DOMContentLoaded',()=>{
  const grid=document.getElementById('productGrid');
  /* Link each card to its product by id, so nothing depends on list position. */
  grid.querySelectorAll('.product-item').forEach((el,k)=>{
    const p=products[k];if(!p)return;
    el.dataset.id=p.id;el.dataset.order=k;
    const h=el.querySelector('h3');
    if(h)h.innerHTML=`<a href="product.html?id=${encodeURIComponent(p.id)}">${esc(p.name)}</a>`;
  });
  const msg=document.createElement('p');
  msg.id='noResults';msg.className='empty-cart';msg.hidden=true;msg.setAttribute('role','status');
  grid.insertAdjacentElement('afterend',msg);

  renderBag();

  if(window.Swiper)new Swiper('.oru-journal-swiper',{slidesPerView:1.15,spaceBetween:18,breakpoints:{640:{slidesPerView:2,spaceBetween:22},992:{slidesPerView:3,spaceBetween:28}},pagination:{el:'.oru-journal-swiper .swiper-pagination',clickable:true}});
  if(window.Isotope)iso=new Isotope('#productGrid',{itemSelector:'.product-item',layoutMode:'fitRows',getSortData:{price:el=>Number(el.dataset.price),order:el=>Number(el.dataset.order)}});

  document.querySelectorAll('#filters button').forEach(b=>b.addEventListener('click',()=>{
    document.querySelector('#filters .is-checked')?.classList.remove('is-checked');
    b.classList.add('is-checked');
    state.family=b.dataset.filter;
    state.wishOnly=false;
    applyFilters();
  }));

  document.getElementById('sortSelect').addEventListener('change',e=>{
    const v=e.target.value;
    if(iso){iso.arrange({sortBy:v==='original-order'?'order':'price',sortAscending:v!=='price-high'})}
    else{
      [...grid.querySelectorAll('.product-item')]
        .sort((a,b)=>v==='price-low'?+a.dataset.price-+b.dataset.price:v==='price-high'?+b.dataset.price-+a.dataset.price:+a.dataset.order-+b.dataset.order)
        .forEach(el=>grid.appendChild(el));
    }
  });

  document.getElementById('shopSearch').addEventListener('input',e=>{
    state.q=fold(e.target.value.trim());
    applyFilters();
  });

  const wb=document.getElementById('wishBtn');
  if(wb)wb.addEventListener('click',()=>{
    state.wishOnly=!state.wishOnly;
    applyFilters();
    document.getElementById('shop').scrollIntoView({behavior:'smooth'});
  });

  /* Arriving from another page's heart icon: show saved fragrances. */
  if(new URLSearchParams(location.search).get('saved')==='1'){state.wishOnly=true;applyFilters()}
  else syncWish();

  document.getElementById('newsletterForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('formMessage').textContent='Thank you — this demo form is not connected to an email platform.';e.target.reset()});
  document.getElementById('contactForm').addEventListener('submit',e=>{e.preventDefault();document.getElementById('contactMessage').textContent='Thank you — this demo enquiry has not been sent to a mailbox.';e.target.reset()});
});
