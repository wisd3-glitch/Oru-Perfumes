/* Oru Perfumes login and sign-up. Needs shared.js first.
   DEMO ONLY: nothing is verified, passwords are never stored or checked, and one demo profile is kept in this browser. */
document.addEventListener('DOMContentLoaded',()=>{
  renderBag();syncWishCount();
  if(isSignedIn()){location.replace('account.html');return}
  const EMAIL=/^\S+@\S+\.\S+$/;
  function wire(formId,statusId,fields,rules,onOk){
    const form=document.getElementById(formId),status=document.getElementById(statusId);
    form.addEventListener('submit',ev=>{
      ev.preventDefault();
      const v=k=>form.elements[k].value.trim();
      const errs=rules(v);
      fields.forEach(k=>{
        document.getElementById(formId+'-err-'+k).textContent=errs[k]||'';
        form.elements[k].setAttribute('aria-invalid',errs[k]?'true':'false');
      });
      const keys=Object.keys(errs);
      if(keys.length){status.hidden=false;status.className='form-alert';status.textContent=errs._form||'Please check the highlighted fields.';if(form.elements[keys[0]])form.elements[keys[0]].focus();return}
      status.hidden=true;
      onOk(v,form,status);
    });
  }
  wire('loginForm','loginStatus',['email','password'],v=>{
    const e={};
    if(!EMAIL.test(v('email')))e.email='Enter a valid email address.';
    if(!v('password'))e.password='Enter your password.';
    if(!Object.keys(e).length){
      const a=getAccount();
      if(!a||a.email.toLowerCase()!==v('email').toLowerCase()){e.email='No demo account found for that email in this browser.';e._form='No demo account found for that email in this browser. Create one on the right.'}
    }
    return e;
  },()=>{signIn();location.href='account.html'});
  wire('signupForm','signupStatus',['name','email','password'],v=>{
    const e={};
    if(v('name').length<2)e.name='Enter your name.';
    if(!EMAIL.test(v('email')))e.email='Enter a valid email address.';
    if(v('password').length<8)e.password='Use at least 8 characters.';
    return e;
  },v=>{
    saveAccount({name:v('name'),email:v('email'),phone:'',address:null,createdAt:new Date().toISOString()});
    signIn();location.href='account.html';
  });
});
