(function(){
var d=document;
// menu mobilne
var b=d.querySelector('.burger'),n=d.getElementById('nav');
if(b){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o);d.body.style.overflow=o?'hidden':''});}
// karuzela: przeciąganie myszą + strzałki
d.querySelectorAll('.rail').forEach(function(r){
  var down=false,x0=0,s0=0,moved=0;
  r.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=0;x0=e.clientX;s0=r.scrollLeft;});
  window.addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-x0;moved=Math.max(moved,Math.abs(dx));if(moved>5)r.classList.add('drag');r.scrollLeft=s0-dx;});
  window.addEventListener('pointerup',function(){if(!down)return;down=false;setTimeout(function(){r.classList.remove('drag')},0);});
  r.addEventListener('click',function(e){if(moved>5){e.preventDefault();e.stopPropagation();moved=0;}},true);
  var sec=r.closest('section'),p=sec&&sec.querySelector('.prev'),nx=sec&&sec.querySelector('.next');
  function step(k){var c=r.querySelector('.card');r.scrollBy({left:k*(c?c.offsetWidth+18:300),behavior:'smooth'});}
  if(p)p.addEventListener('click',function(){step(-1)});
  if(nx)nx.addEventListener('click',function(){step(1)});
});
// galeria (lightbox) z przesuwaniem palcem
var lb=d.querySelector('.lb');
if(lb){
  var im=lb.querySelector('img'),cap=lb.querySelector('figcaption'),set=[],i=0,title='';
  function show(){var s=set[i];im.src=s[0];im.width=s[1];im.height=s[2];im.alt=(s[3]||title);cap.textContent=(s[3]||title)+'  '+(i+1)+' / '+set.length;}
  function open(arr,k,t){set=arr;i=k||0;title=t||'';show();lb.classList.add('on');d.body.style.overflow='hidden';lb.querySelector('.x').focus();}
  function close(){lb.classList.remove('on');d.body.style.overflow='';}
  function go(k){i=(i+k+set.length)%set.length;show();}
  lb.querySelector('.x').onclick=close;lb.querySelector('.pv').onclick=function(){go(-1)};lb.querySelector('.nx').onclick=function(){go(1)};
  lb.addEventListener('click',function(e){if(e.target===lb)close();});
  d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')go(-1);if(e.key==='ArrowRight')go(1);});
  var tx=null;lb.addEventListener('pointerdown',function(e){tx=e.clientX});lb.addEventListener('pointerup',function(e){if(tx===null)return;var dx=e.clientX-tx;tx=null;if(Math.abs(dx)>50)go(dx<0?1:-1);});
  d.querySelectorAll('[data-g]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();open(JSON.parse(a.getAttribute('data-g')),0,a.getAttribute('data-t'));});});
  d.querySelectorAll('.gal').forEach(function(g){var arr=JSON.parse(g.getAttribute('data-set'));g.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();open(arr,+a.getAttribute('data-i'));});});});
}
// formularz pokazowy
var f=d.getElementById('f');if(f)f.addEventListener('submit',function(e){e.preventDefault();f.querySelector('.ok').style.display='block';});
// mapa Google dopiero przy przewinięciu
var m=d.querySelector('.map[data-src]');
if(m&&'IntersectionObserver' in window){var io=new IntersectionObserver(function(es){if(es[0].isIntersecting){io.disconnect();var fr=d.createElement('iframe');fr.src=m.getAttribute('data-src');fr.title='Mapa dojazdu do Holzbau';fr.loading='lazy';fr.referrerPolicy='no-referrer-when-downgrade';m.insertBefore(fr,m.firstChild);}},{rootMargin:'300px'});io.observe(m);}
})();
