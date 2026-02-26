function openConsultModal(){document.getElementById('consultModal')?.classList.add('open')}
function closeConsultModal(){document.getElementById('consultModal')?.classList.remove('open')}
async function buy(productKey){const r=await fetch('/api/create-checkout-session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({productKey})});const d=await r.json();if(d.url)location.href=d.url;else alert(d.error||'Checkout unavailable');}
async function submitConsult(e){e.preventDefault();alert('Thanks — consultation request received. We will follow up shortly.');closeConsultModal();}
