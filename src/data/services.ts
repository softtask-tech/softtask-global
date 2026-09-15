export const services = [
  {
    slug: 'software-engineering',
    name: 'Software engineering',
    short: 'Make the systems fit the business.',
    intro:
      'Build the applications your teams need, connect the systems they already use, and modernise the software that holds them back.',
    image: 'software',
    alt: 'Software developer working at a screen',
    scope: [
      'Custom web and enterprise applications',
      'Application modernisation and re-platforming',
      'ERP, CRM and business-system integrations',
      'API design and workflow automation',
    ],
    deliverables: [
      'Requirements and dependency map',
      'Application and integration design',
      'Tested software and release documentation',
      'Operational handover and maintenance scope',
    ],
    question: 'Where does work slow down today?',
    body: 'A disconnected workflow rarely ends at one application. Begin with the people using it, the information they need and the systems that must exchange it. That makes it possible to separate a software problem from a process or data problem.',
    detail:
      'For an existing application, assess its interfaces, data model, test coverage and operational dependencies before deciding what to replace. A phased migration can preserve a working business process while moving individual capabilities into a more maintainable architecture.',
    inputs:
      'Existing application access, representative workflows, integration documentation, data owners and acceptance criteria.',
    boundary:
      'Third-party licence costs, ongoing support hours and ownership of source code should be explicitly agreed in the scope.',
  },
  {
    slug: 'ai-automation',
    name: 'AI & automation',
    short: 'Put intelligence to useful work.',
    intro:
      'Move from an interesting AI demonstration to a defined business workflow—with the data, evaluation and human oversight it needs.',
    image: 'automation',
    alt: 'Engineer testing an automated physical system',
    scope: [
      'Document extraction and intelligent workflows',
      'Enterprise assistants and knowledge retrieval',
      'Machine-learning integration and evaluation',
      'Process automation and human review',
    ],
    deliverables: [
      'Use-case and feasibility assessment',
      'Data and model evaluation plan',
      'Integrated workflow with review controls',
      'Performance, cost and handover documentation',
    ],
    question: 'What should a better decision look like?',
    body: 'An AI project needs a specific job. Classifying incoming documents, retrieving an approved answer and flagging an unusual pattern have different error costs. Define those costs with the people accountable for the workflow before selecting a model.',
    detail:
      'A useful pilot measures quality against representative examples, including ambiguous and incomplete inputs. Retrieval, access control, source attribution and a clear human escalation route belong in the implementation—not as afterthoughts once a demonstration succeeds.',
    inputs:
      'Representative permitted data, a workflow owner, examples of acceptable and unacceptable results, and a defined review process.',
    boundary:
      'Model outputs are probabilistic. No system should be presented as error-free or as a substitute for required professional review.',
  },
  {
    slug: 'data-engineering',
    name: 'Data & analytics',
    short: 'Turn fragmented data into a working asset.',
    intro:
      'Connect sources, establish dependable pipelines and give teams a clearer view of the information behind their decisions.',
    image: 'data',
    alt: 'Abstract arrangement of data connections',
    scope: [
      'Data platforms, warehouses and pipelines',
      'Source-system and API integrations',
      'Data quality, lineage and access design',
      'Business intelligence and reporting',
    ],
    deliverables: [
      'Source inventory and data ownership map',
      'Pipeline and platform architecture',
      'Validation rules and monitoring',
      'Documented datasets and reporting models',
    ],
    question: 'Which numbers can your teams rely on?',
    body: 'When different teams report different answers to the same question, the problem often begins before the dashboard. Definitions, update cycles and source ownership need to be understood alongside the pipeline technology.',
    detail:
      'Design around the decisions the business needs to make. Agree how data is validated, how late or missing records are handled and which team owns a correction. That provides a practical foundation for analytics and subsequent AI workloads.',
    inputs:
      'Source access, sample data, reporting definitions, expected freshness and responsible data owners.',
    boundary:
      'A pipeline does not automatically improve source accuracy. Business definitions and source corrections require accountable owners.',
  },
  {
    slug: 'cloud-infrastructure',
    name: 'Cloud & infrastructure',
    short: 'Build the foundations for what comes next.',
    intro:
      'Bring cloud, networks, compute and recovery planning together around the workloads your organisation depends on.',
    image: 'network',
    alt: 'Network and compute equipment in a server rack',
    scope: [
      'Infrastructure assessment and architecture',
      'Cloud and workload migration',
      'Enterprise networks, compute and storage',
      'Backup, recovery and operational handover',
    ],
    deliverables: [
      'Current-state and dependency assessment',
      'Target architecture and capacity assumptions',
      'Migration runbook and rollback criteria',
      'Recovery test plan and operations documentation',
    ],
    question: 'What needs to keep working while you change?',
    body: 'Infrastructure decisions become clearer when they begin with a workload. Understand its users, dependencies, recovery needs and operating constraints before choosing where it should run. A cloud move, network upgrade or storage change can affect systems well beyond its immediate scope.',
    detail:
      'Map dependencies, establish a baseline and define acceptance criteria before migration. Build a runbook that names owners, sequencing, validation checks and rollback conditions. Recovery plans need exercises with realistic dependencies—not simply a statement that backups exist.',
    inputs:
      'Workload inventory, network diagrams, capacity trends, dependency owners, maintenance windows and recovery requirements.',
    boundary:
      'Availability targets, support coverage, data location and recovery commitments must be agreed for the specific engagement; they are not universal guarantees.',
  },
  {
    slug: 'data-centres',
    name: 'Data centre engineering',
    short: 'Connect the facility to the workload.',
    intro:
      'Plan the relationship between compute demand, physical infrastructure and the practical realities of running a data centre.',
    image: 'facility',
    alt: 'AI-generated illustration of a data centre server aisle',
    scope: [
      'Requirements and capacity planning',
      'Compute, storage and network architecture',
      'Power, cooling and facility coordination',
      'Deployment planning and lifecycle assessment',
    ],
    deliverables: [
      'Requirements and constraints register',
      'Capacity and architecture options',
      'Implementation dependencies and phasing',
      'Commissioning and handover criteria',
    ],
    question: 'What limits the next stage of capacity?',
    body: 'Space alone does not determine usable capacity. Compute density, power availability, cooling, connectivity and maintainability must be considered together. Establish workload assumptions before turning an expansion idea into an equipment list.',
    detail:
      'Coordinate the IT architecture with qualified facility specialists and equipment suppliers. Compare initial needs with expansion scenarios, make dependencies visible and define how commissioned systems will be accepted and maintained.',
    inputs:
      'Site information, workload growth assumptions, available utility capacity, equipment constraints and facility specialists.',
    boundary:
      'Facility construction, statutory approvals, specialist certification and equipment warranties require clearly assigned responsibility. No tier certification is implied.',
  },
  {
    slug: 'blockchain-engineering',
    name: 'Blockchain & Web3 engineering',
    short: 'Build the application around the ledger.',
    intro:
      'Develop Web3 applications, crypto platforms, wallets, smart contracts and exchange technology around a clear operating model.',
    image: 'chip',
    alt: 'Processor connections illustrating digital infrastructure',
    scope: [
      'Web3 and decentralised application development',
      'Crypto and token development',
      'Centralised and decentralised exchange development',
      'Wallet, custody and enterprise integrations',
    ],
    deliverables: [
      'Platform and governance architecture',
      'Contract, wallet and integration specifications',
      'Test scenarios and deployment plan',
      'Operational controls and ownership documentation',
    ],
    question: 'What needs to work beyond the transaction?',
    body: 'A Web3 product connects users, signing, contracts, network behaviour and off-chain operations. Begin with the business model, participating parties and governance before choosing a chain or an application architecture.',
    detail:
      'Crypto and exchange platforms also need clear handling of balances, confirmations, fees, reconciliation and exceptions. Define key ownership, access controls, review responsibilities and the operating requirements appropriate to the intended market.',
    inputs:
      'Product scope, target markets, participating parties, governance rules, custody model, transaction requirements and integration owners.',
    boundary:
      'Engineering scope is distinct from platform operation, licensing and financial services. Independent security review, custody responsibilities and market-specific requirements should be assigned explicitly. Soft Task delivers STRID crypto investigation and recovery enquiries through its cybersecurity team.',
  },
];
export const products = [
  {
    name: 'Tubblor',
    path: '/products/tubblor/',
    label: 'Marketing intelligence',
    url: 'https://www.tubblor.com/',
    description:
      'Bring digital presence, marketing analysis and growth priorities into a clearer view.',
    color: 'orange',
    monogram: 't',
  },
  {
    name: 'Regulix One',
    path: '/products/regulix-one/',
    label: 'AML & KYC workflows',
    url: 'https://regulixone.com/',
    description: 'Support customer due diligence, screening and the record of compliance work.',
    color: 'blue',
    monogram: 'r',
  },
  {
    name: 'Kytheos',
    path: '/products/kytheos/',
    label: 'Security product · Public beta',
    url: 'https://kytheos.com/',
    description: 'Explore Guardian in public beta and the developing Kytheos security product portfolio.',
    color: 'green',
    monogram: 'k',
  },
];
