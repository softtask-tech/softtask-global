export const exercises: Record<
  string,
  { title: string; intro: string; rows: [string, string][]; service: string; label: string }
> = {
  'before-you-move-a-workload': {
    title: 'A working brief for your migration discussion',
    intro:
      'Use these prompts to turn an initial inventory into a conversation with the people who own the service. Unknown answers are useful: they show where discovery is needed.',
    rows: [
      ['Business service', 'What user task must work after the migration, and who can confirm it?'],
      [
        'Dependencies',
        'Which identity services, data stores, scheduled jobs and external connections must remain available?',
      ],
      [
        'Change window',
        'When can the service change, and who needs to be available to validate it?',
      ],
      [
        'Recovery objectives',
        'What interruption and loss of recent data can the business tolerate?',
      ],
      [
        'Rollback',
        'What triggers the decision to return, and how will changed data be reconciled?',
      ],
      [
        'Operational owner',
        'Who will receive alerts, investigate faults and maintain the migrated service?',
      ],
    ],
    service: 'cloud-infrastructure',
    label: 'Cloud & infrastructure',
  },
  'ai-pilot-to-production': {
    title: 'Write the acceptance brief before the next demo',
    intro:
      'A simple evaluation brief helps separate an impressive example from a useful business workflow. Use permitted data and record the reasoning behind the acceptance decision.',
    rows: [
      ['Task', 'Describe one observable job, its input and the expected output.'],
      ['Examples', 'Include normal, incomplete, ambiguous and out-of-scope inputs.'],
      ['Quality', 'Define which errors matter most and how a reviewer will judge the result.'],
      ['Human review', 'Identify the cases that need escalation and the person responsible.'],
      ['Access', 'Record which source documents and actions each user may access.'],
      ['Change', 'Decide which model, prompt or source changes require re-evaluation.'],
    ],
    service: 'ai-automation',
    label: 'AI & automation',
  },
  'capacity-is-more-than-compute': {
    title: 'Bring these assumptions to the capacity review',
    intro:
      'Use a consistent set of questions for the current workload, an expected growth scenario and a stress scenario. Facility specialists should validate site limits rather than treating forecasts as equipment specifications.',
    rows: [
      ['Demand', 'Which measurements support the forecast, and who owns it?'],
      ['Compute and storage', 'What resource limits appear under representative load?'],
      [
        'Power and cooling',
        'What can the site support, including maintenance and failure conditions?',
      ],
      ['Connectivity', 'Which network paths and external services constrain the workload?'],
      [
        'Expansion',
        'Which changes can be phased, and which require work before new equipment arrives?',
      ],
      [
        'Acceptance',
        'What evidence will demonstrate readiness, and who signs off each discipline?',
      ],
    ],
    service: 'data-centres',
    label: 'Data centre engineering',
  },
};
