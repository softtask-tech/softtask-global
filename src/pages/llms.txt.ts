import catalogue from '../data/catalogue.json';
import {solutions} from '../data/discovery';
import {presence} from '../data/presence';
export const prerender = true;
export function GET() {
  const link=(name:string,path:string)=>`- [${name}](https://softtask.co${path})`;
  const text=[
    '# Soft Task',
    '> Technology for innovators. Software, AI, data, cloud, infrastructure and specialist products.',
    'Soft Task is headquartered in Singapore and serves clients in 33+ countries. This directory connects our public capabilities, industries and solution briefs.',
    'The solution briefs describe business problems, engineering approaches, AI guardrails and pilot measures. Product pages explain availability. Singapore is the headquarters; the locations page lists confirmed contact addresses. Saudi presence is planned.',
    '## Company and contact',
    link('Company','/company/'),link('Confirmed presence','/company/locations/'),link('Global delivery','/company/global-delivery/'),link('How we work','/company/how-we-work/'),link('Contact','/contact/'),link('Governance','/governance/'),
    'Project enquiries: contact@softtask.co',
    ...presence.map(p=>link(`Soft Task ${p.name}`,p.url)),
    '## Capabilities',...catalogue.pillars.map(p=>link(p.title,p.url)),
    '## Industries',...catalogue.industries.map(i=>link(i.title,`/industries/${i.id}/`)),
    '## Solution briefs',...solutions.map(s=>link(s.searchTitle,s.url)),
    '## Responsible AI',link('AI guardrails, evidence and human oversight','/services/ai-automation/responsible-ai/'),
    '## Sitemap',link('XML sitemap','/sitemap-index.xml'),
  ].join('\n\n');
  return new Response(text,{headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
