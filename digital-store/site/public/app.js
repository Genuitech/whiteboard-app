const CALENDLY_URL='https://calendly.com/cromine-rhw/30-min-zoom';
function openConsultModal(){window.location.href=CALENDLY_URL}
function closeConsultModal(){document.getElementById('consultModal')?.classList.remove('open')}
async function buy(productKey){const r=await fetch('/api/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productKey})});const d=await r.json();if(d.url)location.href=d.url;else alert(d.error||'Checkout unavailable');}
async function submitConsult(e){
  e.preventDefault();
  window.location.href=CALENDLY_URL;
}
