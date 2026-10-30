import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const projects=JSON.parse(await readFile(path.join(root,'data/projects.json'),'utf8'));
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const email='mozingoux@gmail.com';
const mail='mailto:'+email+'?subject=Website%20project%20inquiry';
const arrow='<span aria-hidden="true">↗</span>';
function header(page){return `<a class="skip-link" href="#main">Skip to content</a>
<header class="site-header"><div class="wrap header-inner">
  <a class="brand" href="/" aria-label="MozingoUX home"><span class="brand-mark" aria-hidden="true">MU</span>Mozingo<span class="brand-accent">UX</span></a>
  <button class="menu-toggle" type="button" aria-controls="site-nav" aria-expanded="false">Menu <span aria-hidden="true">☰</span></button>
  <nav id="site-nav" class="site-nav" aria-label="Main navigation">
    <a href="/work/"${page==='work'?' aria-current="page"':''}>Work</a>
    <a href="/#services">Services</a>
    <a href="/about/"${page==='about'?' aria-current="page"':''}>About</a>
    <a class="nav-contact" href="/#contact">Contact ${arrow}</a>
  </nav>
</div></header>`;}
function footer(){return `<footer class="site-footer"><div class="wrap footer-inner"><p>© ${new Date().getFullYear()} MozingoUX <span>Independent web design · Eastern North Carolina</span></p><div><a href="/work/">Work</a><a href="/about/">About</a><a href="mailto:${email}">Email Austin ${arrow}</a></div></div></footer>`;}
function layout({page='home',title,description,route='/',content,noindex=false}){
 const url='https://mozingoux.com'+route;
 const schema={'@context':'https://schema.org','@type':'ProfessionalService',name:'MozingoUX',alternateName:'Mozingo UX',url:'https://mozingoux.com/',description:'Independent web design for small businesses in Eastern North Carolina.',email,areaServed:{'@type':'Place',name:'Eastern North Carolina'},founder:{'@type':'Person',name:'Austin Mozingo'}};
 return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#174f49">
${noindex?'<meta name="robots" content="noindex,follow">':''}
<link rel="canonical" href="${url}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="alternate icon" href="/favicon.ico">
<meta property="og:type" content="website"><meta property="og:site_name" content="MozingoUX">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:url" content="${url}">
<meta property="og:image" content="https://mozingoux.com/assets/images/social-preview.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="MozingoUX — Simple websites for Eastern NC businesses">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="https://mozingoux.com/assets/images/social-preview.jpg">
<link rel="stylesheet" href="/assets/site.css"><script src="/assets/site.js" defer></script>
<script type="application/ld+json">${JSON.stringify(schema)}</script>
</head><body>${header(page)}
<main id="main">${content}</main>
${footer()}
</body></html>\n`;
}
function projectCard(p,{eager=false}={}){
 const image=`<img src="${p.image}" alt="${esc(p.imageAlt)}" width="${p.imageWidth}" height="${p.imageHeight}" loading="${eager?'eager':'lazy'}" decoding="async">`;
 const accessible=esc((p.kind==='Live project'?'Visit ':'View ')+p.name+' website (opens in a new tab)');
 const preview=p.url?`<a class="project-image" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${accessible}">${image}</a>`:`<div class="project-image">${image}</div>`;
 return `<article class="project" data-category="${p.category}">
 ${preview}
 <div class="project-meta"><span>${esc(p.industry)}</span><span class="project-kind">${esc(p.kind)}</span></div>
 <h3>${esc(p.name)}</h3><p>${esc(p.description)}</p>
 ${p.url?`<a class="text-link project-link" href="${esc(p.url)}" target="_blank" rel="noopener noreferrer" aria-label="${accessible}">${p.kind==='Live project'?'Visit website':'View demo'} ${arrow}</a>`:'<span class="unavailable">Website currently unavailable</span>'}
</article>`;
}
function contact(){return `<section id="contact" class="contact-section section"><div class="wrap">
 <div class="contact-heading"><div><p class="eyebrow">Start a project</p><h2>Let’s talk about<br>your website.</h2></div>
 <div class="contact-copy"><p>Tell me a little about your business and what you have in mind. A few sentences is plenty.</p><a class="email-link" href="${mail}">${email} ${arrow}</a></div></div>
 <details class="contact-form"><summary>Prefer a form? Send a project inquiry <span aria-hidden="true">+</span></summary>
 <form action="https://formsubmit.co/${email}" method="POST" aria-label="Project inquiry">
  <input type="hidden" name="_subject" value="New Mozingo UX project inquiry">
  <input type="hidden" name="_template" value="table"><input type="hidden" name="_captcha" value="false">
  <input type="hidden" name="_next" value="https://mozingoux.com/thanks/">
  <div class="honeypot" aria-hidden="true"><label for="company-check">Leave this field empty</label><input id="company-check" name="_honey" tabindex="-1" autocomplete="off"></div>
  <div class="form-row"><div><label for="name">Name <span>(required)</span></label><input id="name" name="name" autocomplete="name" required maxlength="100"></div><div><label for="email">Email <span>(required)</span></label><input id="email" name="email" type="email" autocomplete="email" required maxlength="254"></div></div>
  <div class="form-row"><div><label for="business">Business or current website <span>(optional)</span></label><input id="business" name="business_or_website" maxlength="300"></div><div><label for="help">What do you need?</label><select id="help" name="project_type"><option>New website</option><option>Website redesign</option><option>Setup or updates</option><option>Not sure yet</option></select></div></div>
  <div><label for="details">A little about your project <span>(required)</span></label><textarea id="details" name="message" required maxlength="5000" rows="4" placeholder="What does your business do, and what would you like your website to do?"></textarea></div>
  <div class="form-bottom"><p>This form sends your details to my email through FormSubmit. You can also email me directly.</p><button class="button button-light" type="submit">Send project inquiry ${arrow}</button></div>
 </form></details>
</div></section>`;}
const homeContent=`
<section class="hero wrap" aria-labelledby="home-title">
 <p class="eyebrow">Independent web design · Eastern North Carolina</p>
 <h1 id="home-title">Simple, professional websites<br class="desktop-break"> for <span>Eastern NC businesses.</span></h1>
 <p class="hero-copy">I help small businesses look professional online and make it easy for customers to get in touch.</p>
 <div class="actions"><a class="button button-primary" href="/work/">View my work ${arrow}</a><a class="button button-secondary" href="/#contact">Start a project ${arrow}</a></div>
 <p class="price-note"><strong>Straightforward websites start at $500.</strong> Custom and interactive projects are quoted separately.</p>
</section>
<section id="work" class="selected-work section wrap">
 <div class="section-heading"><div><p class="eyebrow">Selected work</p><h2>A clear idea.<br>A website to match.</h2></div><a class="text-link" href="/work/">View the full portfolio ${arrow}</a></div>
 <div class="project-grid home-projects">${projects.filter(p=>p.featured).map(p=>projectCard(p,{eager:true})).join('\n')}</div>
</section>
<section id="services" class="services section"><div class="wrap services-layout"><div><p class="eyebrow">Services</p><h2>The essentials,<br>done thoughtfully.</h2></div><div class="service-list">
 <article><h3>New websites</h3><p>A clear, mobile-friendly home for your services, business information, and contact details.</p></article>
 <article><h3>Website redesigns</h3><p>Keep what works. Make the rest clearer, more useful, and easier to navigate.</p></article>
 <article><h3>Launch &amp; ongoing help</h3><p>Help with domains, hosting, contact forms, updates, and the details of getting online.</p></article>
</div></div></section>
<section id="process" class="process section wrap"><div class="section-heading"><div><p class="eyebrow">A simple process</p><h2>From a conversation<br>to a working website.</h2></div></div><ol class="process-list">
 <li><span class="step-number">01</span><div><h3>Tell me about your business.</h3><p>Share what you do, who your customers are, and what you need.</p></div></li>
 <li><span class="step-number">02</span><div><h3>Agree on a plan and price.</h3><p>We’ll settle the scope and cost before the work begins.</p></div></li>
 <li><span class="step-number">03</span><div><h3>Review it. Then go live.</h3><p>I build the site, we review it together, and I help with the launch.</p></div></li>
</ol></section>
${contact()}`;
const workContent=`
<section class="page-intro wrap"><p class="eyebrow">Work</p><h1>Websites with<br><span>a clear purpose.</span></h1><p>Business websites, independent concepts, and a few projects built just for the fun of it.</p></section>
<section class="work-section wrap" aria-label="Portfolio projects"><div class="work-toolbar" hidden><div class="filters" role="group" aria-label="Filter projects"><button type="button" data-filter="all" aria-pressed="true">All work</button><button type="button" data-filter="business" aria-pressed="false">Business websites</button><button type="button" data-filter="interactive" aria-pressed="false">Interactive projects</button></div><p id="project-count" role="status" aria-live="polite">Showing ${projects.length} projects</p></div>
 <div class="project-grid portfolio-grid">${projects.map((p,i)=>projectCard(p,{eager:i<3})).join('\n')}</div>
 <p class="portfolio-note">Projects marked “Concept” are independent examples for fictional businesses, rather than client commissions. Custom and interactive work is quoted separately from straightforward websites starting at $500. The archived JKM preview shows earlier work; its website is currently unavailable.</p>
</section>
<section class="small-cta wrap"><div><p class="eyebrow">Your next step</p><h2>Have a website in mind?</h2></div><a class="button button-primary" href="/#contact">Start a project ${arrow}</a></section>`;
const aboutContent=`
<section class="about-page wrap"><div class="about-layout"><figure class="portrait"><picture><source type="image/webp" srcset="/assets/images/austin-320.webp 320w, /assets/images/austin-560.webp 560w" sizes="(max-width: 700px) 240px, 280px"><img src="/assets/images/austin-560.jpg" alt="Austin Mozingo seated at a table" width="560" height="700" fetchpriority="high"></picture><figcaption>Austin Mozingo · MozingoUX</figcaption></figure>
<div class="about-copy"><p class="eyebrow">About me</p><h1>Hi, I’m Austin.</h1>
<p>I’m an IT Manager for a mechanical contractor in Eastern North Carolina. Working inside a local business gives me a practical understanding of what small businesses need from their websites: clear information, a professional appearance, and an easy way for customers to get in touch.</p>
<p>I earned my degree in Information Technology from the University of Arizona Global Campus. Through MozingoUX, I design straightforward websites for small businesses like the one I work for.</p>
<div class="actions"><a class="text-link" href="/work/">View my work ${arrow}</a><a class="button button-primary" href="/#contact">Start a project ${arrow}</a></div>
</div></div></section>`;
const pages=[
 ['index.html',{title:'Web Design for Eastern NC Businesses | MozingoUX',description:'Simple, professional websites for Eastern North Carolina small businesses. Straightforward sites start at $500. Explore Austin Mozingo’s work and get in touch.',content:homeContent}],
 ['work/index.html',{page:'work',title:'Website Portfolio | MozingoUX · Eastern NC Web Design',description:'Explore MozingoUX business websites, independent concepts, and interactive projects, including Central Heating & Air Conditioning.',route:'/work/',content:workContent}],
 ['about/index.html',{page:'about',title:'About Austin Mozingo | MozingoUX · Eastern NC Web Design',description:'Meet Austin Mozingo, an Eastern North Carolina IT Manager and independent web designer creating straightforward websites for small businesses.',route:'/about/',content:aboutContent}],
 ['thanks/index.html',{title:'Thanks for Getting in Touch | MozingoUX',description:'Thank you for contacting MozingoUX about your website project.',route:'/thanks/',noindex:true,content:`<section class="message-page wrap"><p class="eyebrow">Project inquiry</p><h1>Thanks for your note.</h1><p>I’ll read through your project details and get back to you. If you’d like to add anything, email <a href="mailto:${email}">${email}</a>.</p><a class="button button-primary" href="/">Back to the homepage ${arrow}</a></section>`}],
 ['404.html',{title:'Page Not Found | MozingoUX',description:'Find your way back to MozingoUX.',route:'/404.html',noindex:true,content:'<section class="message-page wrap"><p class="eyebrow">Page not found</p><h1>Let’s get you<br>back on track.</h1><p>This page may have moved. You can explore my work or head back to the homepage.</p><div class="actions"><a class="button button-primary" href="/">Go home</a><a class="button button-secondary" href="/work/">View my work</a></div></section>'}]
];
for(const [file,config] of pages){const dest=path.join(root,file);await mkdir(path.dirname(dest),{recursive:true});await writeFile(dest,layout(config));}
await writeFile(path.join(root,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['/','/work/','/about/'].map(route=>`<url><loc>https://mozingoux.com${route}</loc></url>`).join('')+'</urlset>\n');
await writeFile(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: https://mozingoux.com/sitemap.xml\n');
console.log(`Built ${pages.length} static pages with ${projects.length} portfolio projects. CNAME and deployment settings left intact.`);
