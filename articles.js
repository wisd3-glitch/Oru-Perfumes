/* Oru Perfumes journal. Sample editorial content for the case study. Needs no other script. */
const ARTICLES=[
{slug:'fragrance-architecture',title:'Understanding the architecture of a fragrance',cat:'Scent notes',min:5,date:'2026-11-03',
 image:'https://images.unsplash.com/photo-1615634260167-c8cdede054de?auto=format&fit=crop&w=1200&q=85',
 excerpt:'Top, heart and base: how a fragrance unfolds on the skin, and how to read a notes list.',
 products:['santal-no-04','petale-de-minuit'],
 body:[
  {p:'A fragrance is not a single smell. It is a sequence, built in layers that appear one after another as the scent warms on your skin. Perfumers call this structure the pyramid, and every product page at Oru lists it as top, heart and base.'},
  {h:'Top notes: the first impression'},
  {p:'These are the light, bright materials you smell straight after spraying, such as citrus, green notes and sparkling spice. They evaporate quickly, usually within the first few minutes to an hour, which is why a scent can seem to change so much after you put it on.'},
  {h:'Heart notes: the character'},
  {p:'As the top notes fade, the heart emerges. Florals, soft spices and fruits often sit here. This is the part of the fragrance that gives it personality, and it tends to last for a few hours.'},
  {h:'Base notes: the lasting impression'},
  {p:'The base is made of deeper, heavier materials such as woods, amber, musk and resins. They appear last and linger longest, and they are what stays on a scarf or a jacket the next day.'},
  {h:'How to read a notes list'},
  {ul:['Look at the base first if you want to know how a fragrance will feel hours later.','Notice the family (fresh, floral, woody or amber), because it tells you the overall mood.','Give a scent time. Judge it after an hour, not in the first ten seconds.']},
  {p:'Notes describe the intended character of a scent. Skin chemistry, climate and the amount you apply all change how it smells on you, so the best test is always to wear it.'}]},
{slug:'choose-signature-scent',title:'How to choose a signature scent',cat:'The edit',min:4,date:'2026-11-09',
 image:'https://images.unsplash.com/photo-1608528577891-eb055944f2e7?auto=format&fit=crop&w=1200&q=85',
 excerpt:'A simple, unhurried way to find a fragrance that feels like you.',
 products:['bois-de-sable','rose-noire'],
 body:[
  {p:'A signature scent is the fragrance people come to associate with you. There is no rule that you must have only one, but choosing a favourite is easier when you follow a few simple steps.'},
  {h:'Start with what you already like'},
  {p:'Think about the smells you are drawn to: fresh citrus, a rose garden, warm wood, vanilla. Those preferences usually point to a fragrance family, and the family is the best place to begin.'},
  {h:'Think about when you will wear it'},
  {ul:['Everyday and office: lighter, fresher scents that stay close to the skin.','Evenings and occasions: richer woods, amber and oud that project more.','Hot days: citrus and green notes feel cooler and more refreshing.']},
  {h:'Try, wait, then decide'},
  {p:'Apply a single fragrance to clean skin and live with it for a few hours. Notice how it smells at the start, in the middle and at the end of the day. If you still enjoy it at the end, it is a good sign.'},
  {h:'Do not rush'},
  {p:'Testing many scents at once confuses your nose. Try one or two at a time, take breaks, and trust the one you keep reaching for.'}]},
{slug:'keep-fragrance-at-its-best',title:'Keeping your fragrance at its best',cat:'Care guide',min:3,date:'2026-11-12',
 image:'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&w=1200&q=85',
 excerpt:'Simple storage and application habits that help a fragrance last.',
 products:['oud-velours','ambre-serein'],
 body:[
  {p:'A good fragrance is made of delicate materials, and heat, light and air can change them over time. A few simple habits help a bottle keep its character for years.'},
  {h:'Store it well'},
  {ul:['Keep bottles in a cool, dark place, such as a drawer or a wardrobe.','Avoid direct sunlight and heat, including a car dashboard.','Avoid the bathroom, where temperature and humidity change constantly.','Keep the cap on, and keep the original box if you have space.']},
  {h:'Apply it for longer wear'},
  {ul:['Apply to clean, moisturised skin, since dry skin lets scent fade faster.','Spray the wrists, neck or the back of the knees, where the skin is warm.','Dab rather than rub, so the top notes are not crushed.']},
  {h:'Know when to replace it'},
  {p:'If a fragrance smells sharply different from when you bought it, or its colour has darkened noticeably, it may have turned. Stored well, most fragrances stay pleasant for several years.'}]},
{slug:'extrait-edp-edt',title:'Extrait, Eau de Parfum or Eau de Toilette?',cat:'Scent notes',min:4,date:'2026-11-16',
 image:'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=1200&q=85',
 excerpt:'What the label really means, and how concentration changes the way a scent wears.',
 products:['bois-de-sable','verde-d-ete'],
 body:[
  {p:'Every fragrance is a blend of perfume oil and a carrier, usually alcohol. The amount of oil is the concentration, and it shapes how strong a scent feels and how long it lasts.'},
  {h:'The usual ranges'},
  {ul:['Extrait or Parfum: the most concentrated, roughly 20 to 30 per cent oil or more, and usually the longest lasting.','Eau de Parfum: roughly 15 to 20 per cent, a popular balance of strength and wear.','Eau de Toilette: roughly 5 to 15 per cent, lighter and often fresher.']},
  {p:'These ranges are guidelines. Houses and brands vary, so use them as a rough guide rather than a rule.'},
  {h:'Which should you choose?'},
  {p:'A higher concentration is not automatically better. Many people prefer an Eau de Toilette for hot weather or the office because it feels lighter, and an Extrait for evenings when they want depth and staying power.'},
  {p:'Each product page at Oru shows the concentration next to the size, so you can compare like with like.'}]},
{slug:'fragrance-layering',title:'Fragrance layering: a beginner’s guide',cat:'The edit',min:5,date:'2026-11-19',
 image:'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1200&q=85',
 excerpt:'How to combine two scents so they complement each other instead of competing.',
 products:['santal-no-04','citrus-archive'],
 body:[
  {p:'Layering means wearing two fragrances together to create something more personal. Done well, it adds depth. Done carelessly, it can turn muddy. A few principles keep it simple.'},
  {h:'Start with a simple base'},
  {p:'Choose one fragrance that is soft and not too complex, and let it be the foundation. Woody and musky scents are easy to build on.'},
  {h:'Add a complementary top layer'},
  {ul:['Pair a woody scent with a fresh or citrus one for lift.','Pair a floral with a warm amber for a rounder finish.','Keep one fragrance dominant and the other lighter, rather than two strong ones.']},
  {h:'Use less than you think'},
  {p:'Apply the base first and the second scent more lightly, on a different spot if you prefer, such as the wrists for one and the neck for the other. You can always add more.'},
  {p:'If you are unsure, test a combination on your skin and wait an hour before deciding.'}]},
{slug:'fragrance-in-warm-weather',title:'Wearing fragrance in warm weather',cat:'Care guide',min:4,date:'2026-11-21',
 image:'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=1200&q=85',
 excerpt:'Heat changes how a fragrance projects. Here is how to choose and apply for hot days.',
 products:['verde-d-ete','citrus-archive'],
 body:[
  {p:'Warm air and warm skin make fragrance project more strongly and evaporate faster. A scent that feels perfect in cool weather can feel heavy in the heat, so it helps to adjust.'},
  {h:'Choose lighter styles'},
  {p:'Citrus, green and aquatic notes tend to feel cooler and fresher on hot days. Lighter concentrations such as Eau de Toilette are often more comfortable than heavy, resinous scents.'},
  {h:'Apply with a lighter hand'},
  {ul:['Use fewer sprays, since heat amplifies the scent.','Apply after a shower, when skin is clean and slightly cool.','Reapply sparingly during the day instead of applying heavily once.']},
  {h:'Protect the bottle'},
  {p:'Never leave fragrance in a hot car or in direct sun. Keep bottles in a cool, dark place at home, and carry a small travel size if you need to refresh during the day.'}]}
];

/* Helpers used by the journal list and article pages (need esc() from shared.js). */
const JFALL="https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=900&q=80";
const fmtDate=d=>{const x=new Date(d);return isNaN(x)?'':x.toLocaleDateString('en-NG',{day:'numeric',month:'long',year:'numeric'})};
function articleCard(a){
  const link='article.html?slug='+encodeURIComponent(a.slug);
  return `<div class="col-md-6 col-lg-4"><article class="journal-card"><a href="${link}"><img onerror="this.onerror=null;this.src='${JFALL}'" src="${esc(a.image)}" alt="${esc(a.title)}"></a><div class="eyebrow">${esc(a.cat.toUpperCase())} · ${esc(a.min)} MIN READ</div><h3><a href="${link}">${esc(a.title)}</a></h3><p class="jc-ex">${esc(a.excerpt)}</p><a class="text-link" href="${link}">READ STORY ↗</a></article></div>`;
}
