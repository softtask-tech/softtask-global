document.querySelectorAll<HTMLElement>('[data-catalogue-filter]').forEach(root=>{
  const input=root.querySelector<HTMLInputElement>('[data-filter-input]');
  if(!input)return;
  input.value=new URL(location.href).searchParams.get('q')||'';
  const update=()=>{
    const words=input.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    let count=0;
    root.querySelectorAll<HTMLElement>('[data-filter-item]').forEach(item=>{
      item.hidden=!words.every(word=>item.dataset.search?.includes(word));
      if(!item.hidden)count++;
    });
    const status=root.querySelector<HTMLElement>('[data-filter-count]');
    if(status)status.textContent=`${count} ${root.querySelector('.industry-grid')?'industry families':'opportunities'} found`;
    const empty=root.querySelector<HTMLElement>('[data-filter-empty]');if(empty)empty.hidden=count!==0;
    const url=new URL(location.href);if(input.value)url.searchParams.set('q',input.value);else url.searchParams.delete('q');history.replaceState(null,'',url);
  };
  input.addEventListener('input',update);update();
});

document.querySelectorAll<HTMLElement>('[data-scenarios]').forEach(root=>{
  const links=Array.from(root.querySelectorAll<HTMLAnchorElement>('[data-scenario-target]'));
  const select=(id:string)=>{
    if(!links.some(a=>a.dataset.scenarioTarget===id))return;
    root.classList.add('is-enhanced');
    links.forEach(a=>a.setAttribute('aria-current',String(a.dataset.scenarioTarget===id)));
    root.querySelectorAll<HTMLElement>('[data-scenario-panel]').forEach(p=>p.hidden=p.dataset.scenarioPanel!==id);
  };
  links.forEach(a=>a.addEventListener('click',()=>select(a.dataset.scenarioTarget!)));
  addEventListener('hashchange',()=>select(location.hash.slice(1)));
  select(links.some(a=>a.dataset.scenarioTarget===location.hash.slice(1))?location.hash.slice(1):links[0]?.dataset.scenarioTarget||'');
});

document.querySelectorAll<HTMLElement>('[data-guardrail]').forEach(root=>{
  const select=(id:string)=>{
    root.querySelectorAll<HTMLButtonElement>('[data-guard-target]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.guardTarget===id)));
    root.querySelectorAll<HTMLElement>('[data-guard-panel]').forEach(p=>p.hidden=p.dataset.guardPanel!==id);
  };
  root.querySelectorAll<HTMLButtonElement>('[data-guard-target]').forEach(b=>b.addEventListener('click',()=>select(b.dataset.guardTarget!)));
  select('evidence');
});

const industry=document.querySelector<HTMLSelectElement>('select[name=industry]');
const scenario=document.querySelector<HTMLSelectElement>('select[name=scenario]');
if(industry&&scenario){
  const query=new URL(location.href).searchParams;
  const valid=(select:HTMLSelectElement,value:string|null)=>value&&Array.from(select.options).some(o=>o.value===value);
  if(valid(industry,query.get('industry')))industry.value=query.get('industry')!;
  if(valid(scenario,query.get('scenario')))scenario.value=query.get('scenario')!;
  const update=()=>{
    Array.from(scenario.options).forEach(o=>{if(o.value){o.hidden=o.dataset.industry!==industry.value;o.disabled=o.hidden;}});
    if(scenario.selectedOptions[0]?.disabled)scenario.value='';
    const message=document.querySelector<HTMLElement>('[data-enquiry-context]');
    if(message){message.hidden=!industry.value;message.textContent=`Your enquiry context: ${industry.selectedOptions[0]?.textContent}${scenario.value?` — ${scenario.selectedOptions[0]?.textContent}`:''}. You can change these choices before sending.`;}
  };
  industry.addEventListener('change',update);scenario.addEventListener('change',update);
  industry.form?.addEventListener('reset',()=>setTimeout(update,0));update();
}

document.querySelectorAll<HTMLDetailsElement>('.mega').forEach(detail=>{
  detail.querySelector('summary')?.addEventListener('click',()=>{
    if(!detail.open)document.querySelectorAll<HTMLDetailsElement>('.mega').forEach(other=>{if(other!==detail)other.open=false;});
  });
});
