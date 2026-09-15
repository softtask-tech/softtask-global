export const flows: Record<string, { name: string; detail: string }[]> = {
  software: [
    {
      name: 'User task',
      detail: 'Begin with the job a person needs to complete and the permissions it requires.',
    },
    {
      name: 'Application',
      detail: 'Connect the interface, business rules and exception handling around that task.',
    },
    {
      name: 'Integration',
      detail:
        'Exchange information with existing systems using documented contracts and failure behaviour.',
    },
    {
      name: 'Operations',
      detail: 'Prepare release instructions, monitoring and the ownership needed after handover.',
    },
  ],
  ai: [
    {
      name: 'Permitted input',
      detail: 'Use representative data that the organisation is permitted to process.',
    },
    {
      name: 'Model & retrieval',
      detail:
        'Combine the chosen model with approved sources and the context required for the task.',
    },
    {
      name: 'Evaluation',
      detail:
        'Test quality and error costs against representative, ambiguous and out-of-scope examples.',
    },
    {
      name: 'Human review',
      detail: 'Route uncertainty and consequential actions to an accountable person.',
    },
  ],
  data: [
    {
      name: 'Source systems',
      detail: 'Identify the source of truth, data owners and permitted access.',
    },
    {
      name: 'Validation',
      detail: 'Check completeness, duplicates, definitions and expected update intervals.',
    },
    {
      name: 'Data platform',
      detail: 'Organise transformations and document how each dataset was produced.',
    },
    {
      name: 'Business decision',
      detail: 'Present information with definitions, freshness and a route for correcting errors.',
    },
  ],
  cloud: [
    {
      name: 'Users & access',
      detail: 'Map identity, access paths and connectivity before changing a workload.',
    },
    {
      name: 'Workloads',
      detail:
        'Group applications with their dependent services rather than treating servers in isolation.',
    },
    {
      name: 'Data & storage',
      detail: 'Plan data movement, consistency, capacity and the effect of a failed dependency.',
    },
    {
      name: 'Recovery',
      detail:
        'Validate restore procedures and rollback criteria against agreed business objectives.',
    },
  ],
  facility: [
    {
      name: 'Workload demand',
      detail: 'Establish measured demand and separate it from forecasts.',
    },
    { name: 'IT capacity', detail: 'Plan compute, storage and connectivity around the workload.' },
    {
      name: 'Facility limits',
      detail:
        'Coordinate power, cooling and maintenance requirements with qualified facility specialists.',
    },
    {
      name: 'Commissioning',
      detail: 'Agree evidence, operating limits and acceptance ownership before deployment.',
    },
  ],
  web3: [
    {
      name: 'Wallet & identity',
      detail: 'Define who controls signing, permissions and account recovery.',
    },
    {
      name: 'Application',
      detail: 'Connect user journeys, balances and off-chain systems to the ledger workflow.',
    },
    {
      name: 'Contracts & network',
      detail:
        'Specify contract behaviour, governance, transaction handling and upgrade responsibilities.',
    },
    {
      name: 'Reconciliation',
      detail:
        'Track confirmations, exceptions and the relationship between on-chain and off-chain records.',
    },
  ],
  aml: [
    {
      name: 'Customer intake',
      detail: 'Collect customer information and documents through the onboarding workflow.',
    },
    {
      name: 'Screening',
      detail:
        'Review sanctions, politically exposed person and other screening signals in context.',
    },
    {
      name: 'Analyst decision',
      detail:
        'Potential matches and higher-risk cases need accountable review. Software supports the decision; it does not confer compliance.',
    },
    {
      name: 'Decision record',
      detail: 'Keep the relevant information, review actions and reporting material together.',
    },
  ],
  security: [
    {
      name: 'Signals',
      detail: 'An architecture can bring endpoint, network and cloud evidence into a common view.',
    },
    {
      name: 'Correlation',
      detail: 'Relate events to their source and time before assessing their significance.',
    },
    {
      name: 'Triage',
      detail: 'Assign review and escalation based on available evidence and the operating policy.',
    },
    {
      name: 'Tracked response',
      detail:
        'Record approved actions and ownership through to closure. This workflow outlines the developing Kytheos architecture.',
    },
  ],
};
