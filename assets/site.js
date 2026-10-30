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
