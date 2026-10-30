document.documentElement.classList.add('js');
const menu=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.site-nav');
function closeMenu(restoreFocus=false){menu?.setAttribute('aria-expanded','false');navigation?.classList.remove('is-open');if(restoreFocus)menu?.focus();}
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>closeMenu()));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu?.getAttribute('aria-expanded')==='true')closeMenu(true);});
document.addEventListener('click',event=>{if(!event.target.closest('.site-header'))closeMenu();});
window.matchMedia('(min-width:701px)').addEventListener('change',event=>{if(event.matches)closeMenu();});
const toolbar=document.querySelector('.work-toolbar');
if(toolbar){
  toolbar.hidden=false;
  const cards=[...document.querySelectorAll('.portfolio-grid .project')];
  const buttons=[...toolbar.querySelectorAll('[data-filter]')];
  buttons.forEach(button=>button.addEventListener('click',()=>{
    buttons.forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
    let count=0;
    cards.forEach(card=>{card.hidden=button.dataset.filter!=='all'&&card.dataset.category!==button.dataset.filter;if(!card.hidden)count++;});
    document.querySelector('#project-count').textContent=`Showing ${count} ${count===1?'project':'projects'}`;
  }));
}
// Preserve old homepage About links without keeping a biography on the homepage.
if(['/','/index.html'].includes(location.pathname)&&location.hash==='#about')location.replace('/about/');

const portfolio=document.querySelector('#home-projects');
if(portfolio){
  const controls=document.querySelector('.portfolio-arrows');
  const arrows=[...controls.querySelectorAll('[data-scroll]')];
  controls.hidden=false;
  const updateArrows=()=>{
    arrows[0].setAttribute('aria-disabled',String(portfolio.scrollLeft<2));
    arrows[1].setAttribute('aria-disabled',String(portfolio.scrollLeft+portfolio.clientWidth>=portfolio.scrollWidth-2));
  };
  const move=direction=>{
    const card=portfolio.querySelector('.project');
    const step=card.getBoundingClientRect().width+parseFloat(getComputedStyle(portfolio).columnGap);
    portfolio.scrollBy({left:direction*step,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  };
  arrows.forEach(button=>button.addEventListener('click',()=>{if(button.getAttribute('aria-disabled')!=='true')move(Number(button.dataset.scroll));}));
  portfolio.addEventListener('keydown',event=>{
    if(event.target!==portfolio)return;
    if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){
      event.preventDefault();
      if(event.key==='Home'||event.key==='End')portfolio.scrollTo({left:event.key==='Home'?0:portfolio.scrollWidth,behavior:'instant'});
      else move(event.key==='ArrowLeft'?-1:1);
    }
  });
  portfolio.addEventListener('scroll',updateArrows,{passive:true});
  new ResizeObserver(updateArrows).observe(portfolio);
  updateArrows();
}
