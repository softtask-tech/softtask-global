import catalogue from './catalogue.json';
export const pillarSearch: Record<string, [string, string]> = {
  'software-engineering': ['Custom software development & application modernisation', 'Custom web, mobile and enterprise software development from Soft Task. Connect business workflows, modernise legacy applications and plan a testable first release.'],
  'ai-automation': ['Enterprise AI development & workflow automation', 'Develop AI assistants, document workflows and business automation with Soft Task. Plan data access, human review, evaluations and operational safeguards.'],
  'data-engineering': ['Data engineering, analytics & business intelligence', 'Connect business data with pipelines, analytics and reporting. Soft Task helps define data quality, ownership and the decisions each data product supports.'],
  'cloud-infrastructure': ['Cloud migration, infrastructure & DevOps services', 'Plan cloud migration, infrastructure automation and DevOps with Soft Task. Review dependencies, identity, recovery, deployment and ongoing operating costs.'],
  'data-centres': ['Data centre design & infrastructure engineering', 'Scope data centre infrastructure, capacity, power, cooling and recovery with Soft Task. Connect engineering decisions to workload and operating requirements.'],
  'blockchain-engineering': ['Blockchain, Web3 & crypto platform development', 'Build blockchain applications, digital wallets, tokens and exchange platforms with Soft Task. Define security, integration and operating responsibilities.'],
  'enterprise-systems': ['ERP, CRM & enterprise systems integration', 'Connect enterprise systems and business workflows with Soft Task. Scope ERP and CRM integration, data migration, access controls and operational handover.'],
  'managed-technology': ['Managed IT services & dedicated engineering teams', 'Explore managed technology support and engineering teams with Soft Task. Agree responsibilities, coverage, escalation paths and measurable service expectations.'],
  'payments-fintech': ['Payment systems & fintech software development', 'Develop payment and fintech software with Soft Task. Connect provider integrations, transaction workflows, reconciliation and controlled exception handling.'],
  'quality-engineering': ['Software testing & quality assurance services', 'Build a practical software quality strategy with Soft Task. Cover functional testing, automation, critical workflows, failure handling and release acceptance.'],
  'connected-devices': ['IoT software & embedded systems development', 'Connect devices, telemetry and operational workflows with Soft Task. Scope IoT applications, embedded integration, data quality and device lifecycle needs.'],
  'systems-integration': ['API development & systems integration services', 'Connect applications and data through APIs with Soft Task. Plan interface contracts, authentication, event handling, retries and integration monitoring.'],
  'cybersecurity': ['Cybersecurity services, penetration testing & incident response', 'Protect applications, cloud platforms and critical systems with Soft Task. Explore penetration testing, detection, incident response, zero-trust architecture and STRID investigation.'],
  'regtech': ['Regulix One: AML, KYC & compliance workflows', 'Explore Regulix One by Soft Task for AML, KYC and compliance workflows. Discuss evidence, integrations and the responsibilities that remain with your organisation.'],
  'digital-experience': ['Tubblor: marketing intelligence & digital experience', 'Explore Tubblor by Soft Task for marketing intelligence and digital experience. Connect marketing information with clearer planning and operational workflows.'],
};
export const industrySearch: Record<string, string> = {
  'agriculture-food':'Agriculture software, farm data & food traceability',
  'energy-utilities':'Energy & utilities software, AI and asset workflows',
  'manufacturing':'Manufacturing software, traceability & AI solutions',
  'construction-property':'Construction & property management technology',
  'financial-services':'Banking, insurance & fintech technology solutions',
  'healthcare-life-sciences':'Healthcare software & clinical workflow integration',
  'retail-distribution':'Retail software, inventory & distribution analytics',
  'transport-logistics':'Logistics software, document automation & tracking',
  'hospitality-travel':'Hospitality software & hotel operations technology',
  'media-entertainment':'Media technology, rights & event workflow solutions',
  'education-training':'Education software, scheduling & learning workflows',
  'government-public-services':'Public sector software & service workflow automation',
  'professional-services':'Professional services automation & knowledge systems',
  'community-nonprofits':'Nonprofit software, grant records & volunteer workflows',
  'data-centres-infrastructure':'Data centre operations, capacity & recovery technology',
  'software-telecommunications':'SaaS & telecom software, AI operations and reliability',
};
const solutionNames = [
  ['harvest-delivery-planning','Harvest delivery planning & produce logistics'],
  ['farm-sensor-validation','Farm sensor validation & irrigation decision support'],
  ['maintenance-root-cause','Maintenance root-cause analysis & asset history'],
  ['waste-chain-of-custody','Waste tracking & digital chain of custody'],
  ['engineering-change-control','Engineering change control & procurement integration'],
  ['batch-recall-traceability','Batch traceability & product recall analysis'],
  ['construction-handover-evidence','Construction handover & completion evidence'],
  ['property-service-requests','Property service requests & tenant issue routing'],
  ['payment-reconciliation','Payment reconciliation & settlement exceptions'],
  ['insurance-claim-evidence','Insurance claim documents & evidence workflows'],
  ['patient-referral-tracking','Patient referral tracking & appointment handoffs'],
  ['medicine-handling-traceability','Medicine handling records & supply traceability'],
  ['sellable-inventory','Sellable inventory visibility & stock reconciliation'],
  ['promotion-demand-planning','Promotion demand planning & replenishment'],
  ['shipment-document-readiness','Shipment document automation & release readiness'],
  ['cold-chain-evidence','Cold-chain monitoring & shipment evidence'],
  ['hotel-room-readiness','Hotel room readiness & maintenance coordination'],
  ['menu-ingredient-records','Menu ingredient records & change management'],
  ['media-rights-tracking','Media rights tracking & licensed asset workflows'],
  ['live-event-coordination','Live event coordination & operational updates'],
  ['education-timetabling','Education timetabling & resource scheduling'],
  ['training-competency-evidence','Training competency records & assessment evidence'],
  ['public-service-routing','Public service request routing & case ownership'],
  ['policy-knowledge-assistant','Policy knowledge assistants with source controls'],
  ['confidential-knowledge-search','Confidential enterprise knowledge search'],
  ['contract-obligation-tracking','Contract obligation tracking & delivery handover'],
  ['restricted-fund-reporting','Restricted fund tracking & nonprofit reporting'],
  ['volunteer-handover','Volunteer scheduling & service handovers'],
  ['data-centre-capacity-planning','Data centre capacity planning & constraint mapping'],
  ['recovery-dependency-mapping','Disaster recovery dependencies & asset mapping'],
  ['ai-feature-cost-control','AI feature cost monitoring & usage controls'],
  ['customer-incident-impact','Customer incident impact & service dependency mapping'],
];
export const solutions = catalogue.scenarios.map((scenario,index)=>({ ...scenario, slug:solutionNames[index][0], searchTitle:solutionNames[index][1], url:`/solutions/${solutionNames[index][0]}/` }));
export type Answer = { question:string; answer:string };
export function answersForPath(path:string):Answer[] {
  const pillar=catalogue.pillars.find(p=>p.url===path);
  if(pillar)return [
    {question:`What does Soft Task cover in ${pillar.title.toLowerCase()}?`,answer:`The capability includes ${pillar.categories.slice(0,5).join(', ').toLowerCase()}. We begin with the business workflow, current technology and delivery constraints, then agree the implementation scope and acceptance criteria. ${pillar.id==='cybersecurity'?'Soft Task delivers cybersecurity and STRID investigation services directly. Kytheos is a separate product in beta.':''}`},
    {question:'Can you work with our existing systems?',answer:`Discovery identifies the interfaces, licences, data quality and access permissions required for ${pillar.title.toLowerCase()}. We plan a bounded integration or migration, test recovery and exceptions, and agree who owns the resulting system. Replacing every system is not a prerequisite.`},
    {question:'How do international projects start?',answer:'Soft Task is headquartered in Singapore and serves clients in 33+ countries. Start with your market, business objective and existing systems. We agree working hours, contracting arrangements, data location, local requirements and support coverage before committing to delivery.'},
  ];
  const industry=catalogue.industries.find(i=>path===`/industries/${i.id}/`);
  if(industry){const examples=solutions.filter(s=>s.industry===industry.id);return [
    {question:`How can technology help ${industry.title.toLowerCase()}?`,answer:`Start with a measurable operational problem. Examples we can explore include ${examples.map(s=>s.searchTitle.toLowerCase()).join(' and ')}. Soft Task connects the relevant software, data, integration and infrastructure capabilities around that workflow.`},
    {question:'What can AI do, and what remains with people?',answer:`For example: ${examples[0].ai} ${examples[0].boundary} We define allowed inputs, evidence requirements, access controls and evaluation criteria before a pilot.`},
    {question:'How do we turn an opportunity into a delivery plan?',answer:'We map your current process, establish a baseline and review the available data. Together we define the delivery scope, acceptance measures and a first release that your team can evaluate.'},
  ];}
  const solution=solutions.find(s=>s.url===path);
  if(solution)return [
    {question:'What would the first pilot test?',answer:`${solution.measure} The pilot should use agreed sample records and a baseline of the current process. Review incorrect results and handling time alongside useful outputs before deciding whether to expand.`},
    {question:'Can AI make the final decision?',answer:solution.boundary},
    {question:'What should we share in an initial enquiry?',answer:'Describe the workflow, the systems involved, the market and the operational impact. Do not send confidential records through the website form. We agree a suitable sharing method and permissions before reviewing project data.'},
  ];
  return [];
}
