function openConsultModal(){document.getElementById('consultModal')?.classList.add('open')}
function closeConsultModal(){document.getElementById('consultModal')?.classList.remove('open')}
async function buy(productKey){const r=await fetch('/api/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productKey})});const d=await r.json();if(d.url)location.href=d.url;else alert(d.error||'Checkout unavailable');}
async function submitConsult(e){
  e.preventDefault();
  const form=e.target;
  const name=form.querySelector('[name="name"]')?.value?.trim();
  const email=form.querySelector('[name="email"]')?.value?.trim();
  const notes=form.querySelector('[name="notes"]')?.value?.trim();

  const r=await fetch('/api/consult-request',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({name,email,notes,page:window.location.pathname})
  });
  const d=await r.json();
  if(!r.ok){alert(d.error||'Unable to submit request');return;}

  alert('Thanks — consultation request received. We will follow up shortly.');
  form.reset();
  closeConsultModal();
}
