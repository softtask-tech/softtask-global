import json,re
from pathlib import Path
p=Path('.')
coverage=json.loads((p/'planning/INDUSTRY-CAPABILITY-COVERAGE.json').read_text(encoding='utf-8'))
base='''software-engineering|Software development|Build & connect|Applications that fit the way your business works.|/services/software-engineering/
blockchain-engineering|Blockchain & digital assets|Build & connect|Wallets, tokens and exchange workflows with clear operating responsibilities.|/services/blockchain-engineering/
cybersecurity|Cybersecurity|Platforms & operations|Protect applications, identities and critical systems with Soft Task cybersecurity and STRID investigation services.|/services/cybersecurity/
ai-automation|AI & automation|Intelligence & data|Use approved information to assist decisions and reduce repetitive work.|/services/ai-automation/
cloud-infrastructure|Cloud & DevOps|Platforms & operations|Build, migrate and operate the platforms your services depend on.|/services/cloud-infrastructure/
data-centres|Data centres & critical infrastructure|Platforms & operations|Connect capacity, availability, networks, power and cooling requirements.|/services/data-centres/
data-engineering|Data & analytics|Intelligence & data|Turn disconnected records into information people can use and trust.|/services/data-engineering/
enterprise-systems|Enterprise systems|Build & connect|Connect finance, customers, people and operations around a shared workflow.|/services/enterprise-systems/
regtech|Compliance technology|Specialist products|AML and KYC product workflows through Regulix One, with integrations scoped separately.|/products/regulix-one/
digital-experience|Digital & experience|Specialist products|Marketing intelligence through Tubblor; product interfaces through our software team.|/products/tubblor/
managed-technology|Managed IT & engineering teams|Platforms & operations|Agree the people, support responsibilities and operational handover your service needs.|/services/managed-technology/
payments-fintech|Payments & fintech engineering|Build & connect|Connect payment devices, providers and settlement records into reliable workflows.|/services/payments-fintech/
quality-engineering|Quality assurance & testing|Build & connect|Test the behaviour, performance and integration risks that matter before release.|/services/quality-engineering/
connected-devices|IoT & embedded systems|Platforms & operations|Connect devices and sensor information to useful operational actions.|/services/connected-devices/
systems-integration|Systems integration & APIs|Build & connect|Make existing applications exchange information without losing ownership or context.|/services/systems-integration/'''
scope={8:['Map business ownership and approval steps before selecting an ERP or CRM approach.','Connect master data and define how conflicting records are resolved.','Migrate and reconcile records in stages with acceptance checks.'],11:['Define support hours, ownership and the escalation route in the agreement.','Provide a documented handover with access, runbooks and change responsibilities.','Review capacity, service risks and support demand at agreed intervals.'],12:['Integrate authorised payment providers and device interfaces.','Reconcile transaction, refund, fee and settlement records.','Define failure handling and review exceptions before financial adjustments.'],13:['Translate critical workflows into measurable acceptance criteria.','Exercise integration failures, recovery and representative workload conditions.','Report release risks with reproducible evidence and a correction path.'],14:['Map device identity, connectivity, telemetry and data quality.','Plan firmware updates, offline behaviour and authorised device actions.','Validate sensor readings before using them to influence operational decisions.'],15:['Establish source-of-truth ownership and approved field mappings.','Handle retries, duplicate events, failures and reconciliation explicitly.','Document interfaces, permissions and the team responsible for each boundary.']}
sourcepillars=list(dict.fromkeys(r['pillar'] for r in coverage['capabilities']))
pillars=[]
for n,line in enumerate(base.splitlines(),1):
 id,title,group,description,url=line.split('|')
 rows=[r for r in coverage['capabilities'] if r['pillar']==sourcepillars[n-1]]
 categories=list(dict.fromkeys(r['subcategory'] for r in rows))
 # These are service topics, not unverified claims or an automatic copy of all offerings.
 categories=[c for c in categories if c not in ['Compliance & Certification Support','Fintech Corporate & Governance Support']]
 pillars.append(dict(id=id,title=title,group=group,description=description,url=url,categories=categories,scope=scope.get(n,[]),sourcePillar=n))
meta='''agriculture-food|Agriculture & food production|Keep the harvest moving.|Connect field work, stock and delivery decisions before a missed handoff becomes waste.|connected-devices,data-engineering,ai-automation,software-engineering|field|Field signals,Packing plan,Dispatch decision,Buyer handoff
energy-utilities|Energy & utilities|See the issue behind the alarm.|Bring asset records, sensor quality and maintenance history into the same operational view.|connected-devices,data-engineering,systems-integration,managed-technology|asset|Asset readings,Evidence check,Engineer review,Work order
manufacturing|Manufacturing|Keep every change connected.|Connect designs, parts, production and quality records so teams can see what a change affects.|enterprise-systems,connected-devices,quality-engineering,systems-integration|lineage|Design revision,Parts and orders,Production review,Quality record
construction-property|Construction, property & facilities|Finish the work. Close the loop.|Connect project changes, asset evidence and responsible teams from construction through operation.|software-engineering,enterprise-systems,systems-integration,connected-devices|building|Site evidence,Asset dossier,Engineer sign-off,Operational handover
financial-services|Banking, insurance & payments|Make exceptions explainable.|Connect transactions, documents and decisions without losing the evidence behind them.|payments-fintech,regtech,data-engineering,blockchain-engineering|ledger|Source records,Reconciliation,Authorised review,Recorded decision
healthcare-life-sciences|Healthcare & life sciences|Keep the next step visible.|Connect administrative handoffs and information needed by care and quality teams.|software-engineering,systems-integration,data-engineering,quality-engineering|handoff|Referral or batch,Evidence check,Professional review,Confirmed handoff
retail-distribution|Retail & distribution|Know what can actually be sold.|Bring stock condition, replenishment and planned demand into one decision process.|enterprise-systems,data-engineering,ai-automation,digital-experience|stock|Stock position,Demand signal,Merchandising review,Store action
transport-logistics|Transport & logistics|The shipment arrived. What happens next?|Connect movement, paperwork and ownership so a missing handoff is visible to the right team.|systems-integration,software-engineering,data-engineering,ai-automation|journey|Shipment event,Document check,Operator approval,Delivery handoff
hospitality-travel|Hospitality, travel & leisure|Deliver the experience behind the booking.|Connect availability, operating tasks and approved information before they reach a guest.|software-engineering,enterprise-systems,systems-integration,digital-experience|rooms|Booking or change,Readiness check,Staff approval,Guest experience
media-entertainment|Media, gaming & entertainment|Keep the release in sync.|Connect rights, assets and approved changes across teams and publishing channels.|software-engineering,systems-integration,digital-experience,data-engineering|broadcast|Approved asset,Rights and versions,Publishing approval,Audience channels
education-training|Education & training|Turn plans into usable learning operations.|Connect timetables, practical requirements and assessment evidence with accountable decisions.|software-engineering,enterprise-systems,data-engineering,ai-automation|schedule|Course requirements,Resources and evidence,Educator review,Learning activity
government-public-services|Government & public services|Make the route through a service clearer.|Connect requests, current guidance and accountable staff without automating decisions that require judgement.|software-engineering,systems-integration,ai-automation,cloud-infrastructure|routes|Service request,Approved guidance,Staff assessment,Next action
professional-services|Professional & business services|Make knowledge useful without losing control.|Connect approved sources, permissions and obligations to the work your team needs to complete.|ai-automation,systems-integration,enterprise-systems,data-engineering|evidence|Authorised sources,Evidence retrieval,Professional review,Client work
community-nonprofits|Nonprofits & community organisations|Connect resources to their intended purpose.|Bring funds, people and service commitments into a clear record of responsibility.|software-engineering,enterprise-systems,data-engineering,quality-engineering|allocation|Funds or availability,Purpose and role rules,Coordinator approval,Service delivery
data-centres-infrastructure|Data centres & infrastructure|Space is only one part of capacity.|Connect physical capacity, dependencies and recovery evidence before changing a live environment.|data-centres,cloud-infrastructure,connected-devices,managed-technology|racks|Workload need,Capacity constraints,Engineer approval,Validated change
software-telecommunications|Software platforms & telecoms|Connect service health to customer impact.|See dependencies, useful outcomes and operating costs at the level where your team can act.|software-engineering,cloud-infrastructure,data-engineering,quality-engineering|network|Service signals,Cost and dependencies,Engineer review,Customer update'''
industries=[]
for i,line in enumerate(meta.splitlines()):
 id,title,headline,description,related,visual,steps=line.split('|')
 sectors=[r['industry'] for r in coverage['industries'] if r['proposed_parent']=='/industries/'+id+'/']
 if i==14:sectors=['Data centres','Colocation operators','Critical digital infrastructure']
 if i==15:sectors=['Software platforms','SaaS businesses','Telecommunications operations']
 industries.append(dict(id=id,title=title,headline=headline,description=description,pillars=related.split(','),visual=visual,steps=steps.split(','),sectors=sectors))
for industry in industries:
 if industry['id'] in ['financial-services','government-public-services','software-telecommunications','energy-utilities','manufacturing','data-centres-infrastructure','healthcare-life-sciences']:
  industry['pillars'].append('cybersecurity')
text=(p/'planning/INDUSTRY-OPPORTUNITIES.md').read_text(encoding='utf-8')
blocks=re.findall(r'^### (\d+)\. ([^\n]+)\n(.*?)(?=^### |^## |\Z)',text,re.M|re.S)
scenarios=[]
for num,title,body in blocks:
 fields=dict(re.findall(r'^- \*\*(.+?):\*\* (.+)$',body,re.M))
 scenarios.append(dict(id='case-'+num,industry=industries[(int(num)-1)//2]['id'],title=title,problem=fields['Problem to explore'],build=fields['Build'],ai=fields['Technology / AI'],boundary=fields['Boundary'],measure=fields['Pilot measure'],visual=fields['Visual']))
assert len(scenarios)==32 and len(pillars)==15 and sum(len(i['sectors']) for i in industries[:14])==72
(p/'src/data/catalogue.json').write_text(json.dumps(dict(pillars=pillars,industries=industries,scenarios=scenarios),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
for pillar in pillars:
 if pillar['scope']:
  (p/'src/pages/services'/(pillar['id']+'.astro')).write_text('---\nimport PillarPage from "../../components/PillarPage.astro";\n---\n<PillarPage id="'+pillar['id']+'" />\n',encoding='utf-8')
print('Shared catalogue ready: 15 pillars, 16 families, 72 source sub-sectors, 32 scenarios.')
