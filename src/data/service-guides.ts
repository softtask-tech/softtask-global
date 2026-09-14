export const guides: Record<
  string,
  { example: string; scenario: string; checks: string[]; faqs: [string, string][]; related: string }
> = {
  'software-engineering': {
    example: 'Connect an approval workflow to the systems behind it.',
    scenario:
      'A team handles requests in email, checks customer details in a CRM and re-enters approved information into an ERP. A useful application brings those steps together while retaining the source system for each record. Begin with one workflow and its exceptions before widening the scope.',
    checks: [
      'Identity and roles: who can view, approve and change a record?',
      'Integration behaviour: what happens when an external system is unavailable?',
      'Acceptance: can representative users complete normal and exceptional tasks?',
      'Maintainability: can the operating team understand, release and diagnose the application?',
    ],
    faqs: [
      [
        'Should we rebuild our existing application?',
        'First assess the code, dependencies, workflows and cost of maintaining the current system. An integration, targeted improvement or phased replacement may address the requirement. A complete rebuild needs a clear justification and a migration plan.',
      ],
      [
        'What should an integration specification include?',
        'Record the source of truth, exchanged fields, authentication, permissions, expected volumes and update frequency. Include retries, duplicate handling and reconciliation so the workflow remains understandable when a connection fails.',
      ],
      [
        'What is included at handover?',
        'Agree the source-code arrangements, deployment instructions, environment ownership, technical documentation and outstanding issues in the scope. Ongoing maintenance and third-party licences also need explicit ownership.',
      ],
    ],
    related: 'ai-pilot-to-production',
  },
  'ai-automation': {
    example: 'Turn document intake into a reviewable workflow.',
    scenario:
      'Incoming documents may need classification, field extraction and validation before entering a business system. Define which fields matter, how ambiguous inputs reach a reviewer and how a corrected result is recorded. Test the entire workflow with permitted examples before expanding access.',
    checks: [
      'Input quality: include incomplete, unusual and out-of-scope examples.',
      'Evaluation: measure accuracy for the task and the cost of different errors.',
      'Access: respect the permissions attached to source documents.',
      'Operations: track quality, response time and cost when configurations change.',
    ],
    faqs: [
      [
        'How do we select a useful first AI project?',
        'Choose a specific, recurring task with available data, a responsible owner and an observable result. Establish the current process and define what improvement would justify the operating cost and review effort.',
      ],
      [
        'Can an assistant use internal company documents?',
        'A retrieval workflow can be designed around approved sources. Access rules, document freshness, source references and the handling of missing evidence should be part of the design. Confirm the permitted processing environment before sharing data.',
      ],
      [
        'When should a person review the result?',
        'Use the consequence of an error to decide. Ambiguous inputs, weak evidence and actions outside the approved scope need a defined escalation route. The review policy should be evaluated with the workflow rather than assumed from a model score.',
      ],
    ],
    related: 'ai-pilot-to-production',
  },
  'data-engineering': {
    example: 'Give operational reporting a consistent foundation.',
    scenario:
      'Sales, finance and operations may use different definitions for the same metric. A reporting project begins by resolving those definitions and identifying the responsible source. Pipelines then bring the required data together, with checks that make missing or delayed records visible.',
    checks: [
      'Definitions: agree how each business metric is calculated.',
      'Freshness: choose a refresh interval appropriate to the decision.',
      'Quality: distinguish a missing record from a valid zero value.',
      'Ownership: assign responsibility for source corrections and reporting changes.',
    ],
    faqs: [
      [
        'Do we need real-time data?',
        'Start with how quickly a decision needs to change. Scheduled updates may suit a daily report, while an operational workflow may require lower latency. Compare the additional complexity and cost with the value of faster information.',
      ],
      [
        'Can we begin with one department?',
        'Yes, a bounded reporting use case can establish definitions, source access and validation practices. Design shared identifiers and ownership carefully so additional departments can connect without creating competing versions of the same metric.',
      ],
      [
        'How do data quality issues become visible?',
        'Define validation rules for completeness, acceptable values, duplicates and reconciliation. Decide how failures are reported, whether downstream processing pauses and who owns the correction. Preserve enough lineage to trace a reported value to its source.',
      ],
    ],
    related: 'ai-pilot-to-production',
  },
  'cloud-infrastructure': {
    example: 'Move a business application without losing its dependencies.',
    scenario:
      'An application may rely on a local identity service, shared storage, scheduled jobs and an external API. A migration plan maps those relationships before choosing a destination. Rehearsal, cutover checks and rollback criteria should cover the complete business service.',
    checks: [
      'Baseline: record current performance, usage and operating constraints.',
      'Connectivity: test the path between every retained and migrated dependency.',
      'Recovery: distinguish acceptable downtime from acceptable data loss.',
      'Cost: include storage, transfer, licences and ongoing operations.',
    ],
    faqs: [
      [
        'Should every workload move to the cloud?',
        'Assess the workload individually. Dependencies, latency, data location, existing investments and operating capability may support a cloud, on-premises or hybrid design. The destination should follow the requirement.',
      ],
      [
        'What is the difference between backup and recovery?',
        'A backup preserves a copy of data. Recovery restores the business service, including its applications, identity, network and other dependencies. A recovery exercise tests whether the agreed objectives can be met.',
      ],
      [
        'How is migration risk managed?',
        'Create a dependency map, test representative scenarios and agree the cutover sequence. Name the decision owner, acceptance checks and rollback triggers. Where data changes during migration, plan how those changes will be reconciled.',
      ],
    ],
    related: 'before-you-move-a-workload',
  },
  'data-centres': {
    example: 'Plan capacity around the constraint that matters.',
    scenario:
      'A proposed expansion may appear to need more servers, while the actual constraint is power, cooling or network capacity. Connect workload forecasts with the facility’s limits and maintenance requirements before turning a requirement into procurement quantities.',
    checks: [
      'Demand: separate measured workloads from growth assumptions.',
      'Facility: review power, cooling and access with qualified specialists.',
      'Resilience: consider the effect of a component outage or maintenance event.',
      'Commissioning: define evidence, acceptance owners and operating limits.',
    ],
    faqs: [
      [
        'What information is needed for an initial assessment?',
        'Bring workload requirements, equipment inventory, available site drawings, capacity trends and planned growth. Facility specialists should validate utility capacity, cooling and applicable site constraints.',
      ],
      [
        'Does this service imply a certified data centre?',
        'No. A design discussion or deployment does not itself establish a tier or other certification. Any assessment, approval or certification requires its own scope and the appropriate authorised organisation.',
      ],
      [
        'How should future expansion be considered?',
        'Compare current demand, expected growth and a stress scenario. Review how each would affect power, cooling, cabling, equipment placement and maintenance access. Record assumptions and identify when they should be revisited.',
      ],
    ],
    related: 'capacity-is-more-than-compute',
  },
  'blockchain-engineering': {
    example: 'Assess a record shared between multiple organisations.',
    scenario:
      'Several parties may need a traceable history of a record without giving one participant complete control over changes. Before choosing a ledger, establish who can write, who can read and how incorrect inputs or disagreements will be resolved. Compare the same workflow with a conventional database.',
    checks: [
      'Governance: identify participants, permissions and decision rules.',
      'Data: decide what belongs on the ledger and what stays outside it.',
      'Integration: define the trust placed in external systems and inputs.',
      'Lifecycle: plan upgrades, key ownership and exception handling.',
    ],
    faqs: [
      [
        'When is a distributed ledger appropriate?',
        'It may be useful when multiple parties need a shared record and its governance justifies distributed operation. If one organisation controls the workflow, a conventional database may provide a simpler solution.',
      ],
      [
        'Does an immutable record prove the input was correct?',
        'No. A record can preserve what was submitted without proving that the original information was accurate. Source validation, identity and exception handling remain necessary design considerations.',
      ],
      [
        'Where do crypto investigation enquiries go?',
        'Kytheos is the specialist home for cybersecurity and STRID crypto investigation and recovery enquiries. This capability page concerns engineering. Investigation outcomes and asset recovery cannot be guaranteed.',
      ],
    ],
    related: 'before-you-move-a-workload',
  },
};
