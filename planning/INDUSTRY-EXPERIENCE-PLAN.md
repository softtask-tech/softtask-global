# Soft Task: industry and capability website plan

Prepared 15 September 2026. This is an implementation and editorial plan, not a claim that the proposed solutions have already been delivered. The current website has not been changed by this planning pass.

## Direction

Give visitors two equally clear entrances: **Find your industry** and **Solve a business problem**. The visitor should recognise their working day before encountering the technology behind it.

The core explanation is:

**What goes wrong → what information is missing → what Soft Task can build → where AI helps → what a person decides → how improvement is measured.**

Keep the approved homepage composition, green identity and typography. Add one concise Industries link to the navigation and one industry entry point near the capabilities section. Do not turn the homepage into a catalogue of 72 sectors or 293 offerings.

## What I read and what needs correcting

Read all five worksheets across both supplied workbooks, including their overview and reference tabs:

- Capability Matrix: 293 offering rows, 15 pillars and 97 distinct pillar/subcategory combinations, plus 22 industry references in Industries Served.
- Industry Solutions Matrix: 72 industry rows in 14 groups.

The coverage is broad and useful as a discovery catalogue. It is not yet publication-ready. Several descriptions turn possible outcomes into guarantees, mix prospective concepts with existing products, or include internal customer/pitch references. Those must not pass directly into the website.

| Source issue | Website treatment |
| --- | --- |
| “Detects before failure”, “immediately”, “days to minutes” | Describe an intended benefit, the necessary input data and the test used to establish whether it works. No unsupported timing or percentage. |
| AI credit scoring, recruitment screening and public-service risk scores | Prefer completeness checks and decision support. Require a defined lawful purpose, meaningful human review, testing for harmful bias and a route to challenge consequential decisions. |
| Diagnosis, triage and safety-critical monitoring | Lead with operational workflows. Clinical or safety-critical AI is a separate specialist scope with appropriate validation and approvals. Do not imply replacement of professionals or safety systems. |
| Blockchain proves authenticity | Explain that a tamper-evident record does not prove the truth of the original physical-world entry. Include source verification and chain-of-custody responsibilities. |
| “AI reduces bias” | Say what is measured and reviewed; do not promise bias-free decisions. |
| Names of pitches, NDA work and internal concepts | Omit from public examples. A workbook note is not publication permission or evidence of a live product. |
| ISO/readiness references | Do not reintroduce ISO certification claims. Any future readiness service needs its own confirmed scope. |
| Financial licensing / regulatory advisory | Separate engineering from regulated advice and authorisations. Technical delivery does not grant a licence. |
| “Autonomous SOC”, 24/7 service and unconfirmed products | Preserve the previously agreed Kytheos availability boundaries. Do not infer staffing, service levels or live modules from this matrix. |

The full source-to-destination coverage map accompanies this plan. It preserves all 293 offerings and 72 industries without copying private notes into public copy.

## Site structure

| Route | Visitor's question | Treatment |
| --- | --- | --- |
| `/industries/` | Can you help a business like mine? | Searchable sector directory and problem selector. |
| `/industries/{sector}/` | Do you understand our operations? | Sector-specific working diagram, problem scenarios, proposed systems, measurable pilot and direct enquiry. |
| `/solutions/` | Who can solve this recurring problem? | Cross-industry problem library: delays, disconnected information, waste, exceptions, visibility and manual administration. |
| `/solutions/{problem}/` | How would the solution actually work? | A concrete operating scenario with inputs, rules, AI assistance, reviewer and outcome measures. Publish only when it has genuinely distinct depth. |
| `/services/` and existing capability pages | What can your engineers build? | Keep technical depth here. Add missing capability families and explain specialist terms. |
| `/services/ai-automation/responsible-ai/` | How do you keep the AI within its intended role? | Clear control model, examples of blocked actions, evaluation approach and client-specific responsibilities. |

Do not make 293 offering pages. Create an offering page only when it answers a distinct buyer need with enough specific material. The catalogue should drive navigation and cross-links, not automatically generate thin pages.

### Industry families

Retain coverage of all 14 source groups under simpler names. Add two missing families because they are important to the existing Soft Task positioning:

1. Agriculture and food production
2. Energy, utilities and natural resources
3. Manufacturing
4. Construction, property and facilities
5. Banking, insurance and payments
6. Healthcare and life sciences
7. Retail and distribution
8. Transport and logistics
9. Hospitality, travel and leisure
10. Media, gaming and entertainment
11. Education and training
12. Government and public services
13. Professional and business services
14. Nonprofits and community organisations
15. **Data centres and digital infrastructure** — additional family
16. **Software platforms and telecommunications** — additional family

Show the 72 source sectors as searchable sub-sectors within these families. Defence and space remain restrained descriptions of authorised logistics, engineering records and research infrastructure. Do not publish command-system diagrams, sensitive customer information or claims of military-grade validation.

### Capability navigation

The existing six capabilities are too narrow to expose this matrix clearly. Evolve the service directory into ten understandable global families while preserving useful existing URLs:

| Public family | Source coverage |
| --- | --- |
| Software and digital products | Web, mobile, portals, commerce, custom applications, interface design and application modernisation. |
| Enterprise systems | ERP, CRM, finance, workforce and supply-chain systems. |
| AI and workflow automation | Document processing, retrieval, forecasting, computer vision, bounded agents and evaluation. |
| Data and analytics | Data pipelines, reporting, quality, governance and master data. |
| Cloud and platform engineering | Migration, DevOps, reliability and cost management. |
| Data centres and infrastructure | Compute, networks, storage, availability, capacity, power and cooling integration. |
| Blockchain and digital assets | Wallets, tokens, smart contracts and exchange engineering. |
| Payments and fintech engineering | POS, payment integration, settlement and reconciliation systems. |
| Connected devices and IoT | Sensor platforms, firmware, gateways, remote device operations and industrial integration. |
| Managed technology and engineering teams | Agreed support, dedicated engineering teams and build-operate-transfer engagements. |

Quality assurance and systems integration appear as visible cross-cutting disciplines with their own detailed pages, rather than being buried. Cybersecurity services route to **Kytheos**, including STRID. Digital marketing routes to **Tubblor**; product interface design remains within Soft Task engineering. RegTech product enquiries route to **Regulix One**, with bespoke integrations scoped separately. Do not add the other product names in the workbook to the public portfolio without confirmation.

## The visual experience

### Industry hub: start with recognition

Suggested opening: **“Find the technology that fits the way your industry works.”**

Two controls: “Choose your industry” and “What is getting in the way?” Plain-language problem chips include “Too much manual work”, “We find problems too late”, “Our systems do not connect”, “We lose track of stock or assets”, “Customers wait too long” and “We need trustworthy information”.

The results show industry names and concrete problems, not an anonymous field of icons. Filters work in combination, include a clear reset and preserve a useful URL so a sales colleague can share the view. A result should say “Prevent missing documents from holding up shipments”, not “Digital transformation for logistics”.

Use a restrained illustrated view of connected operations in the hero. It should explain that software connects people, decisions and physical work. It should not be a spinning globe or a glowing AI brain.

### Sector page: a working scene

The first screen has a sector-specific headline and one meaningful diagram. Selecting a scenario changes the highlighted bottleneck, the proposed solution and the review step. It does not replace the whole page with an animation.

Examples of distinct visual structures:

| Sector | Main visual | Interaction |
| --- | --- | --- |
| Logistics | Port-to-warehouse journey | Select an overdue document; highlight the release dependency and responsible team. |
| Manufacturing | Batch and component lineage | Select a rejected part; trace related batches and review containment options. |
| Retail | Stock moving between shops | Select a near-expiry item; compare transfer, markdown and no-action scenarios. |
| Construction | Drawing revision and work-package dependencies | Select a design change; reveal affected purchases, work and sign-offs. |
| Healthcare | Referral-to-appointment handoff | Select a missing referral item; route it for staff review without inferring a diagnosis. |
| Energy | Asset and work-order map | Select a questionable reading; distinguish an equipment issue from a faulty sensor. |
| Financial services | Payment-to-ledger exception queue | Select an unmatched settlement; show source evidence and a proposed match awaiting approval. |
| Professional services | Source-linked knowledge trail | Select a question; reveal approved documents, conflicting versions and an abstention example. |
| Education | Timetable and resource allocation board | Change a room constraint; show clashes and choices for an administrator. |
| Hospitality | Arrival, housekeeping and room-readiness board | Select a late room; identify the next operational action and guest communication owner. |
| Community organisations | Donation-to-approved-purpose flow | Select a restricted donation; show allocation rules and an exception requiring trustee review. |
| Data centres | Rack capacity and resilience envelope | Select a planned workload; show power, cooling and redundancy constraints. No live control of a facility. |

Below the working scene:

1. Three to five recognisable problems, expressed in the customer's language.
2. A selected scenario: current process, proposed system, where AI helps and where it must stop.
3. The software components Soft Task could deliver, with links to capabilities.
4. Data and integration prerequisites, expressed as “What we would connect”.
5. Guardrails and the named business role that approves consequential action.
6. A pilot plan with baseline, evaluation measures and conditions for rollout.
7. A specific invitation: “Discuss your shipment exception process” rather than “Transform your business”.

Keep shared navigation and headings predictable. Vary the operating diagram and information layout according to the subject; variety should make the explanation clearer, not force visitors to relearn the site.

### Vector and motion specification

- Build diagrams as accessible SVG plus real HTML labels, buttons and text. They remain crisp on phones and can be updated with the content. Use no raster images of unreadable architecture charts.
- Retain forest #14382d, paper #f5f6ef, pale green #e4ecdf and ink #183c30. Use the existing orange sparingly to mark an exception, never as the only indicator. Use shape and text as well as colour.
- Keep Manrope for explanation and controls. Retain the existing Newsreader accent only where it fits the approved site, not for diagram labels.
- Animate only the relationship the visitor selected: a path traces, a document moves to review, or a status changes. Typical feedback should be brief; longer sequences have play/pause/restart controls.
- No essential information requires hover, dragging or animation. Keyboard and touch provide equivalent controls. Reduced-motion mode shows the final state immediately.
- On mobile, convert a wide diagram into an ordered vertical process. Keep the same explanation in normal HTML beneath the graphic. Never shrink a desktop diagram until its text becomes unreadable.
- Use one relevant image where it adds a sense of place. Avoid a stock image for every scenario. Never label illustrative assets as Soft Task's actual client or facility.
- Explain all example data as illustrative. Do not animate synthetic charts as if they are measured client results.

## The content model

Every scenario should have the following fields. A scenario without data needs, control boundaries and a measurement plan is not ready for the website.

| Field | Example: a container is ready but cannot be released |
| --- | --- |
| Audience | Freight forwarder or importer operations manager |
| Pain | People discover missing release documents after storage charges begin accumulating. |
| Proposed build | Document checklist, event integrations, exception board and assigned follow-up. |
| Software work | Track deadlines, apply verified tariff rules and route tasks. |
| AI work | Extract dates and references from messages/documents and suggest the likely missing item. |
| Inputs | Release documents, milestone events, booking references and validated charge rules. |
| Human boundary | An authorised operator verifies the document match and approves external instructions. |
| Failure handling | Conflicting dates or unknown document versions stay unresolved and visible. |
| Measure | Late-document incidents, exception age, false alerts and charges attributable to avoidable delays. |
| Pilot | One trade lane or customer workflow, compared with the current process. |
| Commercial status | Illustrative solution opportunity; discovery required. |
| Evidence | Source workbook row or researched problem reference; never imply a delivered case study. |

Keep three content types distinct: **capability**, **illustrative use case**, and **verified case study**. Only the third uses actual customer results and requires publication permission.

## AI guardrails: the public explanation

Recommended headline: **“Useful AI, with clear limits and accountable decisions.”**

Suggested copy:

> We design AI around a defined business task, approved information and clear limits on what it can access or change. Depending on the project, controls include role-based access, source-linked answers, input and output validation, approval before consequential actions, and monitoring after release. We test the system against realistic mistakes and misuse before expanding its role. AI can still make errors, so the controls, evidence and human responsibilities are agreed for each deployment.

Do not write “our AI is completely safe”, “zero hallucinations”, “fully unbiased” or “all guardrails are already implemented”. The following controls are a proposed delivery standard and must be implemented and evidenced in each relevant project.

| Layer | What the visitor understands | Engineering acceptance evidence |
| --- | --- | --- |
| Authorised information | It can use only information the user is allowed to access. | Permission checks at retrieval and action time; tests for cross-customer and cross-role leakage. |
| Input boundary | An uploaded document cannot secretly change the system's job. | Injection tests, treatment of documents as untrusted data, restricted tools and no privilege granted by model text. |
| Grounded answers | Important answers point back to approved sources; missing evidence is visible. | Source-version tests, answer verification, conflicting-source tests and abstention behaviour. Citations alone do not prove correctness. |
| Bounded action | It cannot make an unapproved payment or change a critical record. | Allowlisted actions, business-rule validation, scoped credentials, approval enforcement outside the model and idempotent execution. |
| Human decision | The responsible person sees evidence and can disagree. | Review screens, override records and a route to correct or contest consequential decisions. |
| Privacy | Only necessary data enters the workflow. | Data classification, minimisation, provider settings, retention and access review; no blanket residency or training-use promise. |
| Evaluation | The pilot is tested for the errors that matter in this setting. | Representative test set, domain review, subgroup checks where relevant, false-positive/negative measures and documented release thresholds. |
| Operation | The system can be stopped, investigated and improved. | Version records, proportionate logs, monitoring, rollback, incident owner and defined fallback. |

A model's self-reported confidence score is not a reliable approval mechanism. For retrieval, check coverage and evidence; for predictive models, evaluate calibration and threshold behaviour on representative data. For safety-critical or rights-affecting decisions, use stronger domain-specific assessment rather than treating a general chatbot filter as sufficient.

### Guardrail interaction

Use a transparent example with three selectable inputs: **valid request**, **missing evidence**, **unauthorised action**. Show the same workflow ending in **answer with sources**, **ask for clarification**, or **blocked and routed to review**. Label it a conceptual demonstration, not a live security test or proof of deployed controls.

## Content and brand boundaries

- Softtask.co explains global engineering and industry use cases. Country sites later add their own operating context, source-checked local requirements and appropriate local contacts; do not clone global copy and swap flags.
- Kytheos owns cybersecurity services, threat/investigation product detail and STRID. Global industry pages may explain a relevant security dependency and link to Kytheos without inventing its product availability.
- Tubblor owns digital marketing and marketing-intelligence detail. Soft Task can still describe the software and data integrations supporting the workflow.
- Regulix One owns its product narrative. Regulated activities and national availability need verified, product-specific wording.
- Do not publish the extra workbook project names, customer names or opportunity notes in diagrams, image alt text, structured data or page source.

## Implementation sequence

### First: normalise the content

Use the accompanying coverage map to allocate every offering and industry. Add status fields: source, proposed wording, public owner, evidence status, risks, inputs and related capabilities. Remove duplicates across capability and industry copy. Keep private opportunity notes outside the public repository.

### Second: build one reusable explanation system

Create an IndustryDirectory, ProblemSelector, ScenarioExplorer, ProcessDiagram, DataRequirements, GuardrailPanel and PilotScorecard. Use Astro-rendered HTML and small client-side enhancements. Use native SVG for the process diagrams; add a motion library only if the existing one cannot do the required interaction.

Use a static, structured use-case dataset, not a live chatbot generating marketing claims. All core text must be in the initial HTML. The existing site search should include industry and problem language, not only service labels.

### Third: publish six deeply developed families

Recommended first wave, based on clarity and reuse of the current service portfolio rather than claimed commercial priority: manufacturing; construction/property/facilities; transport/logistics; retail/distribution; professional services; data centres/infrastructure. Each gets at least three distinct scenarios, one diagram, explicit data requirements and a realistic pilot.

Financial services and healthcare can follow with carefully scoped operational examples and specialist review for consequential decisions. Expand the remaining families as their specific content meets the same quality threshold. All 72 source sectors remain mapped; do not publish placeholder pages simply to reach the count.

### Fourth: connect capabilities and conversion

Add industry links to relevant service pages. Carry the selected industry and scenario into the contact form using validated, allowlisted values. Display the chosen context to the visitor and include it in the enquiry notification. Keep consent specific to their enquiry and do not add marketing consent silently. Use contact@softtask.co until country sales routes are confirmed for that workflow.

### Fifth: verify and release

Check keyboard use, focus, screen-reader descriptions, reduced motion, touch, empty results and URL-state behaviour. Verify the static experience with JavaScript disabled. Test 320, 390, 768, 1024 and 1440 widths. Confirm SVG IDs do not collide when several diagrams appear on a page.

Verify metadata, canonical URLs, breadcrumbs, sitemap and internal links. Use ordinary WebPage, Service and breadcrumb semantics where appropriate; no fabricated reviews or case-study schema for imagined results. Keep real copy indexable at launch and do not promise AI-search rankings.

Do not load all 72 animated scenes upfront. Render one selected scene with an HTML explanation; defer secondary images and keep interaction code small. Add no session replay or analytics without the appropriate configured privacy controls.

## Definition of ready

- A non-technical reader can identify the problem, deliverable and human decision without expanding an acronym.
- Every published industry has specific scenarios rather than swapped industry names.
- Every AI scenario names required inputs, a failure mode, a control and an evaluation measure.
- Every claimed result is either a verified outcome with permission or explicitly a target to test.
- No new product, certification, client relationship, licence or staffed service is inferred from a spreadsheet.
- Every source industry and offering has a destination or a documented publication hold.

## Research basis

The workbooks provide the source catalogue. Added opportunities in the accompanying catalogue are Soft Task solution-design proposals, not findings that every organisation in that sector has the same problem.

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework) and its [Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf) support risk-based evaluation and the need to address unreliable outputs and other AI risks. They do not certify the proposed guardrails.
- [UNEP Food Waste Index 2024](https://www.unep.org/resources/publication/food-waste-index-report-2024) supports using measured baselines when addressing retail and food-service waste. The proposed software workflows are our inference, not UNEP recommendations.
- [FDA drug-shortage FAQ](https://www.fda.gov/drugs/drug-shortages/frequently-asked-questions-about-drug-shortages) identifies quality, production and supply issues among causes of shortages. The proposed evidence workflow supports visibility; it cannot guarantee supply or medicine safety.
- [World Bank container port performance work](https://www.worldbank.org/en/topic/transport/publication/cppi) demonstrates the relevance of time in port to logistics performance. The document-release scenario is a proposed operational use case, not a result established by that index.
