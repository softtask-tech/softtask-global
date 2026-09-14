export const articles = [
  {
    slug: 'before-you-move-a-workload',
    title: 'Before you move a workload, map what moves with it.',
    category: 'Infrastructure',
    minutes: 4,
    image: 'server',
    summary:
      'A practical starting point for understanding dependencies, recovery and ownership before a cloud migration.',
    sections: [
      {
        heading: 'Start with a service, not a server',
        text: 'A server inventory tells you what exists. A service map tells you what the business depends on. A single application may use an identity service, a database, scheduled integrations, shared storage and an external API. Moving its compute instance without understanding those relationships can leave the application technically online but unusable.',
        points: [
          'Name the business process and its owner.',
          'List upstream and downstream dependencies, including scheduled jobs.',
          'Record who can validate that the whole service works.',
        ],
      },
      {
        heading: 'Make the operating constraints visible',
        text: 'Migration planning should include maintenance windows, permitted data locations, licensing constraints, connectivity and the people available during a cutover. These inputs influence architecture and sequencing. A dependency that cannot move may require a transitional connection, with its own latency and failure behaviour.',
      },
      {
        heading: 'Define recovery in business terms',
        text: 'Ask how much interruption the process can tolerate and how much recent data it can afford to lose. These are different questions. Recovery time and recovery point objectives should be agreed with the responsible business team, then tested against the design. A successful backup job is evidence that a copy was made; a recovery exercise is evidence that the service can be restored.',
      },
      {
        heading: 'Write the rollback decision before the cutover',
        text: 'A rollback plan needs more than a previous machine image. Identify the last reversible step, how changes made during migration will be reconciled, who makes the decision and how users will be informed. If writes occur in the new system, returning to the old one may create a data reconciliation problem.',
        points: [
          'Agree acceptance checks and an observation period.',
          'Set a time limit and explicit rollback triggers.',
          'Test the recovery path with representative dependencies.',
        ],
      },
      {
        heading: 'Leave an operating record',
        text: 'The final deliverable is not just an application running in a new location. Preserve the architecture, configuration ownership, monitoring expectations and recovery instructions. An operations team should be able to identify a failing dependency and understand the next action without reconstructing the migration project.',
      },
    ],
    sources: [
      {
        label: 'AWS Well-Architected: Reliability pillar',
        url: 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html',
      },
      {
        label: 'Microsoft Cloud Adoption Framework: migration',
        url: 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/migrate/',
      },
    ],
  },
  {
    slug: 'ai-pilot-to-production',
    title: 'The distance between an AI pilot and a useful workflow.',
    category: 'AI & data',
    minutes: 3,
    image: 'engineering',
    summary: 'Define the job, test the difficult cases and decide where human judgement belongs.',
    sections: [
      {
        heading: 'Choose an observable job',
        text: '“Use AI” is not an acceptance criterion. Extracting specified fields from an invoice, finding a passage in approved documentation or routing an incoming request are jobs that can be described and assessed. Define what enters the workflow, what should leave it and who is responsible when the result is wrong.',
      },
      {
        heading: 'Evaluate the cases that break the demonstration',
        text: 'Build an evaluation set from representative, permitted examples. Include incomplete documents, ambiguous questions, unusual formatting and requests outside the intended scope. Record the expected response and the cost of a mistake. A useful evaluation measures the workflow rather than only the model in isolation.',
      },
      {
        heading: 'Give uncertainty a route',
        text: 'An assistant needs a defined response when sources disagree, evidence is absent or the requested action is beyond its permissions. Source references, review queues and escalation paths make uncertainty visible. The appropriate level of human review depends on the consequences of an error.',
      },
      {
        heading: 'Plan for change after launch',
        text: 'Models, input data and business processes can change. Keep a record of the model version, prompt or configuration, evaluation results and release decisions. Monitor quality, latency and cost against the requirements of the workflow. Re-evaluate material changes before expanding access.',
      },
    ],
    sources: [
      {
        label: 'NIST AI Risk Management Framework',
        url: 'https://www.nist.gov/itl/ai-risk-management-framework',
      },
    ],
  },
  {
    slug: 'capacity-is-more-than-compute',
    title: 'Capacity planning starts beyond the equipment list.',
    category: 'Data centres',
    minutes: 3,
    image: 'chip',
    summary:
      'Look at workload growth, power, cooling and operating constraints as one connected decision.',
    sections: [
      {
        heading: 'State the workload assumptions',
        text: 'Capacity is a relationship between demand and the resources available to meet it. Record expected users, transaction volumes, dataset growth and workload patterns. Separate observed demand from forecasts. A forecast without an owner and a review date can turn into a permanent design assumption.',
      },
      {
        heading: 'Find the limiting dependency',
        text: 'Additional compute depends on more than rack space. Review power, cooling, network connectivity, storage throughput and operational access with the appropriate specialists. An upgrade in one area can move the bottleneck elsewhere. The planning process should reveal those dependencies before procurement.',
      },
      {
        heading: 'Compare useful scenarios',
        text: 'Develop a small set of scenarios with explicit assumptions: current demand, expected growth and a stress case. Compare deployment timing, maintainability and expansion options alongside initial equipment cost. Reserve capacity has value only when it can be put into service within the required timeframe.',
      },
      {
        heading: 'Make commissioning measurable',
        text: 'Define how the installation will be checked and who accepts the result. Coordinate facility tests with IT validation and record operating limits. A handover should include the information needed to operate and maintain the installation, with responsibilities for warranties and specialist support clearly assigned.',
      },
    ],
    sources: [
      {
        label: 'Uptime Institute: data centre tier overview',
        url: 'https://uptimeinstitute.com/tiers',
      },
    ],
  },
];
