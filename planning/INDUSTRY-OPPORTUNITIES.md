# Additional industry opportunities

32 illustrative solution opportunities for the proposed website, grouped into the 16 navigation families. These are new design proposals, not completed Soft Task case studies or claims about every business in the industry. Each requires discovery, available data and a pilot. The measurements are evaluation targets, not promised improvements.

## Agriculture and food production

### 1. A harvest has a buyer, but the delivery window is already at risk
- **Problem to explore:** Harvest planning, vehicle availability and buyer acceptance windows are handled separately, leaving a usable crop waiting between stages.
- **Build:** A harvest-to-dispatch board connecting field availability, packing capacity, bookings and agreed delivery windows.
- **Technology / AI:** Rules expose missed dependencies; forecasting estimates readiness ranges from historical field and packing data.
- **Boundary:** A farm manager confirms harvest changes. Weather and weak sensor data widen the estimate rather than produce a false exact time.
- **Pilot measure:** Waiting time between harvest and dispatch, rejected deliveries and forecast error.
- **Visual:** A field-to-buyer timeline with a highlighted missed handoff.

### 2. One sensor sends the farm in the wrong direction
- **Problem to explore:** A drifting moisture sensor can look like a genuine irrigation need.
- **Build:** Sensor-health checks alongside irrigation recommendations, maintenance records and manual observations.
- **Technology / AI:** Compare neighbouring readings and historical behaviour to flag questionable data. Apply deterministic operating limits.
- **Boundary:** AI cannot override irrigation safety limits; uncertain readings trigger inspection. Agronomic decisions remain with the responsible team.
- **Pilot measure:** False alerts, faulty-sensor detection and unnecessary interventions.
- **Visual:** Two paths from the same reading: inspect the sensor or review irrigation.

## Energy, utilities and natural resources

### 3. Repeated maintenance closes tickets without removing the cause
- **Problem to explore:** Similar failures recur under different descriptions across sites and shifts.
- **Build:** A maintenance-history workspace linking asset identity, work orders, replaced parts and inspection evidence.
- **Technology / AI:** Cluster similar reports and retrieve relevant previous fixes with source links.
- **Boundary:** Engineers confirm the cause; suggested similarity is not a diagnosis. No autonomous changes to industrial controls.
- **Pilot measure:** Repeat work orders, search time and proportion of suggestions accepted after review.
- **Visual:** A recurring fault thread crossing several closed work orders.

### 4. A waste load changes hands but the evidence does not
- **Problem to explore:** Collection, weighbridge and treatment records disagree, making it difficult to explain where a load went.
- **Build:** A digital handover trail with unique load IDs and reconciled source documents.
- **Technology / AI:** Rules compare quantities and timestamps; document extraction assists with legacy weighbridge tickets.
- **Boundary:** Unknown destinations stay unresolved. A digital record cannot certify lawful treatment without external evidence.
- **Pilot measure:** Unmatched handovers, missing-document age and correction effort.
- **Visual:** Chain-of-custody links with one incomplete handover.

## Manufacturing

### 5. Engineering changes reach purchasing after parts are ordered
- **Problem to explore:** An approved design revision does not propagate to bills of materials, purchase orders and work instructions.
- **Build:** A change-impact workspace linking approved revisions to affected material and production records.
- **Technology / AI:** Deterministic revision rules identify conflicts; document comparison summarises differences for engineers.
- **Boundary:** AI never approves a replacement part or releases a revised instruction. Changes require the authorised reviewer.
- **Pilot measure:** Obsolete-version usage, review time and missed affected orders.
- **Visual:** One drawing revision illuminating its downstream dependencies.

### 6. A quality issue triggers too wide—or too narrow—a recall review
- **Problem to explore:** Teams cannot quickly identify which assemblies used a questionable batch.
- **Build:** Component genealogy and containment-review tooling linking receipts, batches, assemblies and shipments.
- **Technology / AI:** Graph queries find known relationships; extraction helps recover missing legacy records for review.
- **Boundary:** Quality staff decide quarantine, release or recall. Missing traceability is displayed, not filled with an invented relationship.
- **Pilot measure:** Trace completeness, time to identify affected stock and erroneous associations.
- **Visual:** A selected batch spreading through a product lineage diagram.

## Construction, property and facilities

### 7. A completed job cannot be handed over because evidence is missing
- **Problem to explore:** Installed assets lack approved test results, warranties or as-built documents at handover.
- **Build:** An asset-level completion dossier with required-document checklists and subcontractor follow-up.
- **Technology / AI:** Extract document references and flag missing or inconsistent fields; rules check the approved handover requirements.
- **Boundary:** The responsible engineer signs off compliance and acceptance. AI cannot certify a test it has not witnessed.
- **Pilot measure:** Missing evidence at handover, rework requests and closeout age.
- **Visual:** A building asset opening into its document dossier.

### 8. A tenant complaint crosses teams without a clear owner
- **Problem to explore:** A recurring issue is split between property management, contractors and building operations.
- **Build:** An issue timeline connecting work orders, access appointments, equipment and tenant updates.
- **Technology / AI:** Summarise the history and suggest related tickets; rules assign responsibility and escalation.
- **Boundary:** Staff confirm fault attribution; the system does not rank tenants or infer sensitive personal characteristics.
- **Pilot measure:** Reopened complaints, unowned time and missed appointments.
- **Visual:** A swimlane showing where responsibility stalled.

## Banking, insurance and payments

### 9. Small settlement mismatches accumulate unnoticed
- **Problem to explore:** Provider fees, refunds and settlement timing create differences that are difficult to reconcile across payment rails.
- **Build:** A reconciliation workbench with source records, verified fee rules and a visible exception queue.
- **Technology / AI:** Deterministic matching handles normal entries; AI proposes explanations for unresolved descriptions.
- **Boundary:** A finance user approves adjustments. No model-generated journal entry posts without validation and authorisation.
- **Pilot measure:** Unmatched value and count, exception age, reviewer effort and incorrect proposed matches.
- **Visual:** Transaction, settlement and ledger lanes converging at an exception.

### 10. A claim is delayed by missing evidence, not a difficult decision
- **Problem to explore:** Customers repeatedly supply documents because requirements and case status are unclear.
- **Build:** A claims-evidence checklist and staff review workspace connected to approved policy requirements.
- **Technology / AI:** Extract fields and flag missing documents. Rules manage completion and follow-up.
- **Boundary:** No automatic denial, underwriting decision or fraud accusation. Claim decisions remain with authorised staff and existing appeal processes.
- **Pilot measure:** Repeat document requests, completeness at first review and false missing-document flags.
- **Visual:** A case progressing through evidence readiness to human assessment.

## Healthcare and life sciences

### 11. A referral leaves one clinic but never becomes an appointment
- **Problem to explore:** Referral receipt, document completeness and booking responsibility are not visible across teams.
- **Build:** Closed-loop referral tracking with an acknowledgement, missing-information queue and scheduling status.
- **Technology / AI:** Extract permitted administrative fields and summarise correspondence; deterministic rules track unresolved handoffs.
- **Boundary:** Clinical urgency and suitability remain with clinicians. No inference that an unbooked referral is medically safe to wait.
- **Pilot measure:** Unacknowledged referrals, administrative turnaround and extraction errors.
- **Visual:** A referral moving between sender, receiving team and booking, with a visible return path.

### 12. Medicine stock exists, but no one can verify its handling history
- **Problem to explore:** Temperature records, batch identifiers and supplier documents are disconnected when a product needs review.
- **Build:** A batch evidence workspace joining inventory and available cold-chain records.
- **Technology / AI:** Rules identify missing intervals and threshold excursions; document extraction links candidate records.
- **Boundary:** Pharmacists or quality personnel decide quarantine and release. AI cannot establish medicine safety or recommend substitution.
- **Pilot measure:** Missing-record rate, review time and false batch matches.
- **Visual:** A batch timeline with an explicitly unknown temperature interval.

## Retail and distribution

### 13. Inventory is technically available but cannot be sold
- **Problem to explore:** Returned goods, incomplete bundles and damaged stock inflate the available-to-promise count.
- **Build:** A stock-status workflow separating saleable, awaiting inspection, incomplete and quarantined items.
- **Technology / AI:** Rules calculate sellable stock; image/document assistance can prepare inspection suggestions.
- **Boundary:** A reviewer approves condition and resale eligibility. AI does not silently mark an item safe or authentic.
- **Pilot measure:** Orders cancelled after purchase, inventory-status errors and inspection queue age.
- **Visual:** One inventory total unfolding into distinct usable and blocked quantities.

### 14. A promotion creates demand the replenishment process cannot meet
- **Problem to explore:** Marketing campaigns, lead times and store-level inventory are planned independently.
- **Build:** A promotion-readiness workspace connecting planned campaigns, stock, supplier lead times and distribution capacity.
- **Technology / AI:** Forecast demand ranges and compare them with rules-based supply constraints.
- **Boundary:** Merchandising approves orders and campaign changes. Forecasts show uncertainty; they are not purchase commitments.
- **Pilot measure:** Promotion stockouts, excess stock after campaigns and forecast error against a baseline.
- **Visual:** A demand range meeting a replenishment timeline. Link marketing work to Tubblor.

## Transport and logistics

### 15. A container is ready, but missing paperwork keeps it in port
- **Problem to explore:** Documents and release milestones are checked only after avoidable delay has started.
- **Build:** A shipment document checklist, event integrations and an assigned exception queue.
- **Technology / AI:** Extract dates and references; deterministic rules calculate deadlines from validated terms.
- **Boundary:** An operator verifies matches and approves external instructions. Unknown release conditions stay visible.
- **Pilot measure:** Late-document incidents, exception age and charges attributable to avoidable delays.
- **Visual:** Port-to-warehouse path interrupted by a specific missing document.

### 16. A cold-chain dispute has data, but no shared timeline
- **Problem to explore:** Carrier scans, sensor logs and handover records use different identifiers and clocks.
- **Build:** A time-normalised shipment evidence view with data-quality markers.
- **Technology / AI:** Rules align verified identifiers and time zones; AI suggests candidate document associations.
- **Boundary:** The system flags evidence gaps, not legal liability. Operators verify associations before sharing an evidence pack.
- **Pilot measure:** Time to assemble the record, unresolved clock conflicts and wrong associations.
- **Visual:** Parallel carrier and sensor timelines aligning at handovers.

## Hospitality, travel and leisure

### 17. A room appears available while maintenance blocks its use
- **Problem to explore:** Booking inventory and maintenance/housekeeping status do not update each other reliably.
- **Build:** A room-readiness board linking confirmed maintenance holds, inspections and arrival priorities.
- **Technology / AI:** Rules prevent conflicting availability; forecasting estimates readiness ranges from historical tasks.
- **Boundary:** Staff release rooms after checks. AI cannot override a safety-related hold.
- **Pilot measure:** Arrival-time room conflicts, overdue holds and readiness estimate error.
- **Visual:** An arrival board showing the task that blocks room release.

### 18. A menu change leaves old ingredient information in circulation
- **Problem to explore:** Supplier substitutions and recipe updates do not propagate to menu and staff reference systems.
- **Build:** A versioned ingredient and approval workflow connected to approved menu data.
- **Technology / AI:** Extract supplier changes for review; deterministic rules require authorised updates and sign-off.
- **Boundary:** Never let a generative model decide that food is allergen-free. Qualified staff approve the authoritative ingredient record.
- **Pilot measure:** Unreviewed substitutions, outdated versions and time to distribute an approved correction.
- **Visual:** One ingredient change reaching recipes, menus and staff references.

## Media, gaming and entertainment

### 19. A licensed asset is reused outside its allowed territory or period
- **Problem to explore:** Rights information lives in contracts separate from publishing workflows.
- **Build:** An asset-rights register with territory, channel and expiry checks linked to publishing approvals.
- **Technology / AI:** Extract candidate clauses for legal review; approved rules flag proposed reuse conflicts.
- **Boundary:** Legal or rights staff interpret ambiguous terms. AI cannot clear a licence.
- **Pilot measure:** Assets lacking rights metadata, review time and incorrect conflict flags.
- **Visual:** A publishing route crossing a rights checkpoint.

### 20. Live event changes do not reach all operational teams
- **Problem to explore:** A venue or programme change leaves ticketing, staff briefings and access information inconsistent.
- **Build:** A controlled change register with affected channels and acknowledgement tracking.
- **Technology / AI:** Draft channel-specific notices from approved changes; rules track who must review and publish.
- **Boundary:** A responsible person approves public announcements. Safety instructions come from authorised staff, not generated guesses.
- **Pilot measure:** Conflicting published information, unacknowledged changes and correction time.
- **Visual:** A change branching to channels with explicit approval status.

## Education and training

### 21. A timetable is valid on paper but fails in practice
- **Problem to explore:** Room equipment, accessibility needs and travel time are missing from timetable constraints.
- **Build:** A constraint-based planning board joining courses, rooms, equipment and approved availability.
- **Technology / AI:** Optimisation compares valid schedules; explanations show which constraints cause conflicts.
- **Boundary:** Administrators approve changes. Minimise sensitive student information and avoid automated opportunity allocation based on inferred traits.
- **Pilot measure:** Unresolved clashes, manual rescheduling and unmet documented requirements.
- **Visual:** A room assignment revealing an equipment or accessibility conflict.

### 22. Training completion is confused with demonstrated competence
- **Problem to explore:** Attendance records are treated as evidence that a learner can perform a practical task.
- **Build:** A skills-evidence portfolio connecting practical assessments, assessor notes and required competencies.
- **Technology / AI:** Retrieve relevant evidence and flag missing assessment records.
- **Boundary:** An authorised assessor decides competence. AI does not grant credentials or reject a learner.
- **Pilot measure:** Missing evidence at review, assessor search time and incorrect evidence associations.
- **Visual:** A certificate requirement opening into verified evidence items.

## Government and public services

### 23. A request is sent to the wrong department repeatedly
- **Problem to explore:** Citizens use everyday language that does not match internal service categories.
- **Build:** A service-intake and handoff system using approved service descriptions and routing rules.
- **Technology / AI:** Suggest categories, translate permitted text and summarise the request for staff.
- **Boundary:** Ambiguous cases go to review. No automatic benefit denial or determination of eligibility from the text classifier.
- **Pilot measure:** Misrouting, repeat handoffs and accessibility/language performance.
- **Visual:** A request choosing between clear service routes, with an uncertainty branch.

### 24. Guidance changes, but front-line answers use an older version
- **Problem to explore:** Public-service staff search across circulars and instructions with conflicting effective dates.
- **Build:** A versioned, source-linked guidance library with validity dates and ownership.
- **Technology / AI:** Retrieve current authorised passages and draft an answer; flag unresolved contradictions.
- **Boundary:** No invented rule or legal determination. Conflicting guidance triggers review by its owner.
- **Pilot measure:** Outdated-source retrieval, unsupported statements and time to locate authoritative guidance.
- **Visual:** Competing document versions resolving to an approved source—or no answer.

## Professional and business services

### 25. Reusable knowledge accidentally carries confidential client detail
- **Problem to explore:** Teams want to reuse previous work without crossing client confidentiality boundaries.
- **Build:** A permission-aware knowledge library with approved reusable material and client-specific collections.
- **Technology / AI:** Retrieve and summarise only authorised records, with source links and access checks.
- **Boundary:** Enforce access outside the model, test cross-client leakage and require review before external reuse.
- **Pilot measure:** Retrieval relevance, unsupported answers and attempted access-boundary violations.
- **Visual:** A knowledge request reaching permitted sources while another collection remains inaccessible.

### 26. A signed contract commitment never becomes an operational task
- **Problem to explore:** Renewal, reporting and notice obligations are missed because they remain in documents.
- **Build:** A reviewed obligations register linking clauses to owners, dates and evidence of completion.
- **Technology / AI:** Extract candidate obligations; rules schedule reminders after human validation.
- **Boundary:** Legal or contract staff approve interpretation. AI does not issue a legal notice or amend a contract.
- **Pilot measure:** Unassigned obligations, missed deadlines and extraction accuracy after review.
- **Visual:** A clause becoming a reviewed task with an owner and due date.

## Nonprofits and community organisations

### 27. Restricted donations are difficult to reconcile with spending
- **Problem to explore:** Donor restrictions and project expenses sit in separate records.
- **Build:** A fund-allocation ledger with approved purpose rules, receipts and exception review.
- **Technology / AI:** Extract receipt fields and suggest categories; deterministic controls check approved allocations.
- **Boundary:** Trustees or finance staff approve expenditure. AI cannot redirect funds or decide religious eligibility.
- **Pilot measure:** Unmatched spending, review backlog and incorrect category suggestions.
- **Visual:** Donation-to-project flow with an out-of-purpose allocation stopped for review.

### 28. A volunteer handover leaves a service uncovered
- **Problem to explore:** Availability, role requirements and completed checks are tracked separately from shift assignments.
- **Build:** A rota and handover system showing authorised role eligibility and coverage gaps.
- **Technology / AI:** Constraint-based scheduling suggests coverage; summaries support handover of permitted operational details.
- **Boundary:** Coordinators approve assignments. No facial recognition, inferred suitability score or automated safeguarding judgement.
- **Pilot measure:** Unfilled shifts, missing handovers and assignments needing correction.
- **Visual:** A service roster with an uncovered role and valid alternatives.

## Data centres and digital infrastructure

### 29. There is rack space, but not enough usable resilient capacity
- **Problem to explore:** A workload placement fits physical space while exceeding a power, cooling or redundancy constraint.
- **Build:** A capacity-planning model joining racks, circuits, cooling zones and agreed resilience assumptions.
- **Technology / AI:** Deterministic constraint checks and scenario modelling; optional forecasting of demand ranges.
- **Boundary:** Qualified engineers approve placement. A website animation is not a thermal, electrical or safety validation.
- **Pilot measure:** Planning-data completeness, conflicts detected before installation and forecast error.
- **Visual:** A workload entering a rack while its limiting resource becomes visible.

### 30. Recovery plans depend on an asset record that is no longer correct
- **Problem to explore:** Configuration inventories, dependencies and recovery runbooks drift apart after changes.
- **Build:** A dependency register with change reconciliation and recovery-test evidence.
- **Technology / AI:** Compare available records and retrieve relevant runbook sections; rules flag unresolved discrepancies.
- **Boundary:** Engineers validate dependencies and execute authorised tests. AI does not autonomously trigger production failover.
- **Pilot measure:** Stale dependencies, recovery-test exceptions and time to assemble an accurate runbook.
- **Visual:** A failover path exposing an unverified dependency.

## Software platforms and telecommunications

### 31. An AI feature succeeds with users but loses money on each transaction
- **Problem to explore:** Model calls, retries and shared infrastructure costs are not allocated to useful completed tasks.
- **Build:** A tenant-aware cost and outcome dashboard with budgets and request tracing.
- **Technology / AI:** Rules calculate actual unit cost; anomaly detection highlights unusual usage or repeated failed attempts.
- **Boundary:** Do not expose another tenant's data. Cost controls must preserve an explicit user-facing failure or fallback path.
- **Pilot measure:** Cost per completed task, unsuccessful retries and attribution coverage.
- **Visual:** One task unfolding into its model calls, retries and measurable cost.

### 32. An incident is visible, but the affected customers are not
- **Problem to explore:** Service alarms cannot be reliably mapped to customer-facing features and dependencies.
- **Build:** A service-impact map joining dependency records, deployments and permitted account information.
- **Technology / AI:** Summarise incident evidence and suggest affected components; rules manage verified status updates.
- **Boundary:** Engineers confirm impact and approve customer communications. Unknown impact remains explicitly unknown.
- **Pilot measure:** Time to identify affected services, incorrect impact claims and update consistency.
- **Visual:** A dependency failure highlighting the services that may be affected, separately from confirmed impact.

## How to use this catalogue

Choose examples based on actual delivery capability, available domain expertise and buyer relevance. Combine them with the source matrix; do not publish all at once. Each published example needs data prerequisites, a defined pilot and the wording “illustrative use case” until a verified customer engagement supports a case study.

The companion implementation plan records the primary research supporting the general approach. These 32 specific workflows are solution-design proposals to validate in discovery, not third-party-endorsed products or statistically established claims.
