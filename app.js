const grid=document.getElementById('serviceGrid');
const historyList=document.getElementById('historyList');
let count=0, currentCode='';
function makeCode(){return String(Math.floor(100000+Math.random()*900000));}
function addHistory(service,region,code){
  const empty=historyList.querySelector('.empty-history'); if(empty) empty.remove();
  const item=document.createElement('div'); item.className='history-item';
  const left=document.createElement('div'); const title=document.createElement('strong'); title.textContent=service;
  const meta=document.createElement('small'); meta.textContent=region+' · '+new Date().toLocaleString();
  left.append(title,meta); const right=document.createElement('span'); right.className='history-code'; right.textContent=code;
  item.append(left,right); historyList.prepend(item);
}
function openDemo(service,region){
  currentCode=makeCode(); count++; document.getElementById('generatedCount').textContent=String(count).padStart(2,'0');
  document.getElementById('modalTitle').textContent=service;
  document.getElementById('modalDesc').textContent=region+' · Fictional sample code for local UI testing.';
  document.getElementById('sampleCode').textContent=currentCode;
  document.getElementById('modal').hidden=false; addHistory(service,region,currentCode);
}
document.querySelectorAll('.generate').forEach(btn=>btn.addEventListener('click',()=>openDemo(btn.dataset.service,btn.dataset.region)));
document.getElementById('closeModal').addEventListener('click',()=>document.getElementById('modal').hidden=true);
document.getElementById('doneBtn').addEventListener('click',()=>document.getElementById('modal').hidden=true);
document.getElementById('modal').addEventListener('click',e=>{if(e.target.id==='modal')e.currentTarget.hidden=true;});
document.getElementById('copyCode').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(currentCode);document.getElementById('copyCode').textContent='Copied';}catch{document.getElementById('copyCode').textContent='Select code';}});
document.getElementById('clearHistory').addEventListener('click',()=>{historyList.innerHTML='<div class="empty-history">No sample codes generated yet. Choose a demo service above.</div>';});
function filterCards(){const q=document.getElementById('searchInput').value.toLowerCase();const r=document.getElementById('regionFilter').value;let shown=0;document.querySelectorAll('.service-card').forEach(card=>{const ok=card.dataset.name.toLowerCase().includes(q)&& (r==='all'||card.dataset.region===r);card.hidden=!ok;if(ok)shown++;});document.getElementById('emptyState').hidden=shown!==0;}
document.getElementById('searchInput').addEventListener('input',filterCards);
document.getElementById('regionFilter').addEventListener('change',filterCards);
document.getElementById('menuBtn').addEventListener('click',()=>document.getElementById('sidebar').classList.toggle('open'));

function randomSampleCode() {
    return Math.floor(100000 + Math.random() * 900000);
}

function updateSampleCodes() {
    document.getElementById("otpIndia").textContent =
        randomSampleCode();

    document.getElementById("otpUSA").textContent =
        randomSampleCode();

    document.getElementById("otpUK").textContent =
        randomSampleCode();
}

updateSampleCodes();
setInterval(updateSampleCodes, 5000);
