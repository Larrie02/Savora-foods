const D=[
{n:'Jollof Rice & Chicken',d:'Smoky party jollof with grilled chicken.',p:3500,img:'images/jollof.jpg'},
{n:'Beef Suya Platter',d:'Yaji-spiced skewers with onion and tomato.',p:3000,img:'images/suya.jpg'},
{n:'Egusi & Pounded Yam',d:'Melon-seed soup with a soft swallow.',p:4000,img:'images/egusi.jpg'},
{n:'Dodo & Fried Eggs',d:'Sweet fried plantain with a savory omelette.',p:2000,img:'images/dodo.jpg'},
{n:'Catfish Pepper Soup',d:'Hot, aromatic broth with fresh catfish.',p:4500,img:'images/catfish.jpg'},
{n:'Moi Moi & Akara',d:'Steamed bean pudding with crispy bean cakes.',p:1800,img:'images/moimoi-akara.jpg'}
];
const g=document.getElementById('grid'),cart={};
const N=n=>'₦'+n.toLocaleString('en-NG');
D.forEach((x,i)=>{g.insertAdjacentHTML('beforeend',`<article class="card"><img src="${x.img}" alt="${x.n}" loading="lazy"><div class="b"><h3>${x.n}</h3><p>${x.d}</p><div class="row"><span class="price">${N(x.p)}</span><button class="add" onclick="add(${i})">Add to order</button></div></div></article>`)});
function add(i){cart[i]=(cart[i]||0)+1;draw();openCart()}
function chg(i,v){cart[i]+=v;if(cart[i]<1)delete cart[i];draw()}
function draw(){
  const ks=Object.keys(cart);let s=0,c=0;
  document.getElementById('items').innerHTML=ks.length?ks.map(k=>{const x=D[k],q=cart[k];s+=x.p*q;c+=q;return `<div class="line"><span>${x.n}</span><span class="q"><button onclick="chg(${k},-1)" aria-label="Remove one">-</button> ${q} <button onclick="chg(${k},1)" aria-label="Add one">+</button></span><b>${N(x.p*q)}</b></div>`}).join(''):'<p style="color:var(--mute)">Your order is empty. Add a dish from the menu.</p>';
  const d=Math.round(s*.05);
  document.getElementById('sub').textContent=N(s);document.getElementById('dis').textContent='-'+N(d);document.getElementById('tot').textContent=N(s-d);
  document.getElementById('cnt').textContent=c?'('+c+')':'';
}
function openCart(){document.getElementById('drawer').classList.add('open');document.getElementById('shade').classList.add('open')}
function closeCart(){document.getElementById('drawer').classList.remove('open');document.getElementById('shade').classList.remove('open')}
function checkout(){
  const ks=Object.keys(cart);if(!ks.length){alert('Add at least one dish first.');return}
  const a=document.getElementById('oa').value.trim();if(!a){alert('Enter your delivery address.');document.getElementById('oa').focus();return}
  let s=0;const l=ks.map(k=>{s+=D[k].p*cart[k];return cart[k]+' x '+D[k].n}).join('%0A');
  const t=s-Math.round(s*.05);
  window.open('https://wa.me/2348000000000?text='+'Savora Foods order%0A'+l+'%0ATotal (5%25 off): '+encodeURIComponent(N(t))+'%0ADeliver to: '+encodeURIComponent(a),'_blank');
}
function sendMsg(){
  const n=document.getElementById('cn').value.trim(),m=document.getElementById('cm').value.trim(),o=document.getElementById('cmsg');
  if(!n||!m){o.textContent='Enter your name and a message.';return}
  window.open('https://wa.me/2348000000000?text='+encodeURIComponent('Hi Savora Foods, I am '+n+'. '+m),'_blank');
  o.textContent='Thanks '+n+', your message is ready to send on WhatsApp.';
}
draw();