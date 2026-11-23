/* Oru Perfumes contact page. Needs shared.js first. Demo only: nothing is sent anywhere. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  const form=document.getElementById('contactPageForm');
  const status=document.getElementById('contactStatus');
  const val=id=>form.elements[id].value.trim();
  form.addEventListener('submit',ev=>{
    ev.preventDefault();
    const e={};
    if(!val('name'))e.name='Enter your name.';
    if(!/^\S+@\S+\.\S+$/.test(val('email')))e.email='Enter a valid email address.';
    if(val('phone')&&val('phone').replace(/\D/g,'').length<10)e.phone='Enter at least 10 digits, or leave this blank.';
    if(!val('topic'))e.topic='Choose a topic.';
    if(val('message').length<10)e.message='Tell us a little more (at least 10 characters).';
    ['name','email','phone','topic','message'].forEach(id=>{
      document.getElementById('err-'+id).textContent=e[id]||'';
      form.elements[id].setAttribute('aria-invalid',e[id]?'true':'false');
    });
    const keys=Object.keys(e);
    if(keys.length){status.textContent='Please check the highlighted fields.';status.className='form-alert';status.hidden=false;form.elements[keys[0]].focus();return}
    status.textContent='Thank you. This is a demo form, so your message has not been sent to anyone.';
    status.className='form-ok';status.hidden=false;
    form.reset();
  });
});
