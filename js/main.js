const fi=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');fi.unobserve(e.target)}}),{rootMargin:'50px'});
const watch=()=>document.querySelectorAll('.fi:not(.in)').forEach(e=>fi.observe(e));

// services
const S=[['3D Modeling','Graphic Design','Posters, flyers, catalogues and brochures designed for print and social media, built to be noticed.'],
['Video Editing','Video Editing','Social media videos, patient storytelling and testimonial films, and product videos cut for attention.'],
['Motion & Animation','Motion & Animation','Boot logos and animations for interactive flat panels, plus short animated promos.'],
['Photo Editing','Photo Editing','Retouching and compositing in Photoshop and Corel Draw for clean, polished visuals.'],
['Desktop Publishing','Desktop Publishing','Professional DTP with Photoshop, Corel Draw, Adobe Express, Canva, CapCut and AI video tools.']];
S[0][0]='Graphic Design';
document.getElementById('sl').innerHTML=S.map((s,i)=>`<div class="it fi" style="--d:${i*.1}s"><div class="num">0${i+1}</div><div><h3>${s[0]}</h3><p>${s[2]}</p></div></div>`).join('');

// projects
const PR=[['Cure My Knee','2025 / Graphic Designer + Video Editor',['Shot raw videos and created patient before & after surgery storytelling and testimonial videos.','Edited surgery and Ayurveda product videos for social media.','Designed posters and videos for social media.']],
['Techcart Integrated Solutions','2023-2025 / Graphic Designer + Video Editor',['Designed posters and flyers for print.','Made flyers and videos for social media.','Created catalogues and brochures for print.','Built boot logos and animations for IFP (Interactive Flat Panel).']],
['MCD Election Project','2022 / Graphic Designer',['Designed posters and flyers for social media and print.']]];
const pl=document.getElementById('pl');
pl.innerHTML=PR.map((p,i)=>`<div class="slot"><div class="card" style="top:calc(var(--t,6rem) + ${i*28}px)"><div class="top"><div class="num">0${i+1}</div><div class="meta"><small>${p[1]}</small><b>${p[0]}</b></div></div><ul class="pts">${p[2].map(t=>`<li>${t}</li>`).join('')}</ul></div></div>`).join('');
const slots=[...pl.children];
const cards=slots.map(s=>s.firstChild);

// about text, per character
const ap=document.getElementById('ap'),txt=ap.textContent;ap.textContent='';
const chars=[...txt].map(c=>{const s=document.createElement('span');s.className='ch';s.textContent=c;ap.appendChild(s);return s});

const clamp=(v,a,b)=>Math.min(b,Math.max(a,v));
function tick(){
  const vh=innerHeight;
  const r=ap.getBoundingClientRect(),p=clamp((vh*.8-r.top)/(r.height+vh*.8-vh*.2),0,1);
  chars.forEach((c,i)=>{const a=i/chars.length,o=clamp((p-a)*chars.length/6+.2,.2,1);c.style.opacity=o});
  slots.forEach((s,i)=>{const R=s.getBoundingClientRect(),q=clamp(-R.top/R.height,0,1),t=1-(PR.length-1-i)*.03;cards[i].style.transform=`scale(${1-q*(1-t)})`});
}
addEventListener('scroll',tick,{passive:true});addEventListener('resize',tick);

// tools marquee
const T=['CapCut','Vista','Canva','Photoshop','Corel Draw'];
const pills=a=>{const s=a.map(t=>`<div class="pill">${t}</div>`).join('');return s+s+s+s};
document.getElementById('t1').innerHTML=pills(T);
document.getElementById('t2').innerHTML=pills([...T].reverse());
// living cartoon: gaze, blink, head follow, pop
(()=>{
  const ch=document.getElementById('char'),$=id=>document.getElementById(id);
  const gz=[$('gzL'),$('gzR')],lid=[$('lidL'),$('lidR')],ln=[$('lnL'),$('lnR')],eyes=[[430,487],[700,485]];
  const red=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let tx=0,ty=0,gx=0,gy=0,last=performance.now(),lastIn=last,bT=0,nextB=last+2000,dbl=false,wander=0;
  addEventListener('pointermove',e=>{
    const r=ch.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height*.35;
    tx=clamp((e.clientX-cx)/(innerWidth*.35),-1,1);ty=clamp((e.clientY-cy)/(innerHeight*.35),-1,1);
    lastIn=performance.now();
    if(!red){const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;ch.style.translate=`${x*18}px ${y*12}px`;ch.style.rotate=`${x*4}deg`}
  });
  ch.addEventListener('pointerdown',()=>{ch.classList.remove('pop');void ch.offsetWidth;ch.classList.add('pop');bT=performance.now();nextB=bT+3000});
  function lidAt(i,h){
    const [cx,cy]=eyes[i],top=cy-52;lid[i].setAttribute('y',top);lid[i].setAttribute('height',h);
    const y=Math.min(top+h,cy+16);
    ln[i].setAttribute('d',h<5?'':`M${cx-66} ${y-3}Q${cx} ${y+9} ${cx+66} ${y-3}`);
  }
  function frame(t){
    requestAnimationFrame(frame);
    if(red)return;
    if(t-lastIn>3500&&t>wander){wander=t+1400+Math.random()*1800;tx=(Math.random()*2-1)*.9;ty=(Math.random()*2-1)*.5}
    gx+=(tx-gx)*.14;gy+=(ty-gy)*.14;
    for(let i=0;i<2;i++)gz[i].setAttribute('transform',`translate(${gx*13} ${gy*5})`);
    if(!bT&&t>nextB){bT=t}
    if(bT){
      const p=(t-bT)/170;
      if(p>=1){bT=0;if(!dbl&&Math.random()<.2){dbl=true;bT=t+60}else{dbl=false;nextB=t+2200+Math.random()*3200}lidAt(0,0);lidAt(1,0)}
      else if(p>=0){const k=p<.45?p/.45:1-(p-.45)/.55,h=108*Math.sin(k*Math.PI/2);lidAt(0,h);lidAt(1,h)}
    }
  }
  function clamp(v,a,b){return Math.min(b,Math.max(a,v))}
  requestAnimationFrame(frame);
})();
watch();tick();
