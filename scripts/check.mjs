import {readFile,access} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const files=['index.html','work/index.html','about/index.html','thanks/index.html','404.html'];
const documents=new Map(await Promise.all(files.map(async file=>[file,await readFile(path.join(root,file),'utf8')])));
let internalLinks=0;
for(const [file,html] of documents){
  assert.equal((html.match(/<h1[\s>]/g)||[]).length,1,`${file}: expected one h1`);
  assert(!html.includes('<iframe'),`${file}: embedded website found`);
  assert(html.includes('<meta name="description"'),`${file}: missing description`);
  assert(html.includes('<link rel="canonical"'),`${file}: missing canonical`);
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(ids.length,new Set(ids).size,`${file}: duplicate IDs`);
  for(const match of html.matchAll(/\s(?:href|src)="([^"]+)"/g)){
    const href=match[1];
    if(/^(?:https?:|mailto:|data:)/.test(href))continue;
    const [pathname,hash]=href.split('#');
    const target=pathname?pathname.replace(/^\//,''):file;
    const resolved=target.endsWith('/')?target+'index.html':target||'index.html';
    await access(path.join(root,resolved));internalLinks++;
    if(hash){const targetHtml=documents.get(resolved)||await readFile(path.join(root,resolved),'utf8');assert(targetHtml.includes(`id="${hash}"`),`${file}: missing target ${href}`);}
  }
}
const home=documents.get('index.html'),about=documents.get('about/index.html');
assert(!home.includes('id="about"')&&!home.includes('Hi, I’m Austin'), 'Homepage contains biography');
assert(home.includes('start at $500')&&home.includes('Custom and interactive projects are quoted separately'));
assert(home.includes('action="https://formsubmit.co/mozingoux@gmail.com" method="POST"'));
assert(home.includes('mailto:mozingoux@gmail.com'));
assert(home.includes('name="_next" value="https://mozingoux.com/thanks/"'));
assert(about.includes('I earned my degree in Information Technology'));
assert(about.includes('/assets/images/austin-560.jpg')&&about.includes('srcset='));
assert.equal((await readFile(path.join(root,'CNAME'),'utf8')),'mozingoux.com','Custom domain bytes changed');
await access(path.join(root,'.nojekyll'));
const projects=JSON.parse(await readFile(path.join(root,'data/projects.json'),'utf8'));
assert(!home.includes('project-kind')&&!documents.get('work/index.html').includes('project-kind'));
assert.equal((home.match(/<article class="project"/g)||[]).length,projects.length);
assert(home.includes('id="home-projects"')&&home.includes('aria-label="Next projects"'));
assert.equal(projects[0].id,'central-hac');assert.equal(projects.length,15);
assert.equal(projects.filter(p=>p.kind==='Concept').length,10);
assert.equal(projects.filter(p=>p.kind==='Passion project').length,2);
assert.equal(projects.find(p=>p.id==='jkm-drafting').url,null);
assert.equal(projects.filter(p=>p.featured).length,3);
for(const p of projects){assert(p.name&&p.industry&&p.description&&p.image);await access(path.join(root,p.image.replace(/^\//,'')));if(p.url)assert.equal(new URL(p.url).protocol,'https:');}
console.log(`Passed: ${files.length} pages, ${projects.length} projects, ${internalLinks} internal links/assets, native email form, direct email, About portrait, SEO, and exact CNAME preservation.`);
