/* Oru Perfumes journal list page. Needs shared.js and articles.js first. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  const cats=['All',...new Set(ARTICLES.map(a=>a.cat))];
  const bar=document.getElementById('jFilters'),grid=document.getElementById('jGrid');
  let cat='All';
  function render(){
    bar.innerHTML=cats.map(c=>`<button type="button" class="chip${c===cat?' is-on':''}" data-cat="${esc(c)}" aria-pressed="${c===cat}">${esc(c)}</button>`).join('');
    grid.innerHTML=ARTICLES.filter(a=>cat==='All'||a.cat===cat).map(articleCard).join('');
  }
  bar.addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;cat=b.dataset.cat;render()});
  render();
});
