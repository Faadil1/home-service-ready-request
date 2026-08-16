# TRACE Gate 8 — Home Service Ready Request Post-mortem 001

Date: 2026-08-16

## Outcome

Home Service Ready Request shipped as a promoted, evaluator-verified consumer conversion workflow for a non-emergency residential plumbing scenario.

Promotion evidence:

- PR #1 promoted to `main`.
- Frozen PR head: `dc1259c1c7e53830c1a2f4dce700f7f14546b7d6`.
- Merge commit: `8c45563451f3e9a671bf937d9c6a587cde417feb`.
- Post-merge CI run: `31952950839` — **PASS**.
- Post-promotion documentation head before Gate 8: `ee840d6fff5ef762da2cb16c1f84e799e8e76b02` with CI `31953058343` — **PASS**.
- Production alias: `https://home-service-ready-request.vercel.app` — HTTP 200 after promotion.
- Production deployment: `dpl_3Twe4RDNYuPZcg65RFgwM4fjNqfo` — **READY**.
- Production assets remained the previously validated user-visible product artifact:
  - JS: `/assets/index-DsBP0ZMz.js`
  - CSS: `/assets/index-dI3W3B_H.css`
- Product behavior validated at commit `8d81a9e3396de5823c64cf7d5c3df41840240c3e`.
- Gate 6 rendered QA: **PASS**.
- Gate 6.5 live evaluator capture: **PASS**.
- Gate 6.75 evidence film: **PASS**, final duration **56.88 seconds**.
- Gate 7 Freeze Audit: **FREEZE_PASS**.
- Dependency resolution is frozen with `package-lock.json` lockfileVersion 3; CI uses `npm ci`.

The shipped product preserves its Truth contract: `Request received` is not a booking confirmation; Access Window is a preference rather than provider inventory; the flow does not diagnose the plumbing issue, produce a binding quote, dispatch emergency service, assign a technician automatically, or guarantee a response time; immediate hazards exit the ordinary flow.

## Why this validation case mattered

Cargo Risk Window was an operational defensive dashboard. Test #03 deliberately changed the product type, primary user, interaction model and visual grammar:

- consumer rather than operational analyst;
- mobile-first rather than dashboard-first;
- conversion/intake workflow rather than ranked decision support;
- service handoff rather than security review;
- no contractor dashboard required for the primary promise;
- Blue Carbon / Margin Tabs rather than Intermodal Ledger.

This made Test #03 a direct test of whether TRACE rules promoted after Cargo were genuinely generalizable or merely Cargo-specific.

## What improved quality

### 1. Proof Contract constrained conversion pressure

A consumer conversion flow creates pressure to imply certainty — booked appointment, available technician, diagnosis, price or response time. Gate 0 made those boundaries explicit before the interface was designed. As a result, the product could optimize momentum without fabricating operational certainty.

### 2. Domain metaphor transferred beyond dashboards

The domain vocabulary — Service Call Sheet, Site Context, Access Window and Handoff Mark — shaped the IA and visual behavior before effects were selected. This produced Margin Tabs and the Handoff Imprint without relying on generic SaaS progress steppers or literal plumbing imagery.

This confirms that Gate 1.5 is useful outside analytical dashboards. No Kernel change is required because its current purpose already covers terminology, layout, materiality and motion.

### 3. Visual Prototype prevented a back-office form from becoming the product

Blue Carbon had a real risk of becoming a scanned form, ERP screen or field-service back office. Comparing Carbon Balance, Duplicate Handoff and Margin Tabs before implementation made the consumer-facing composition explicit. Margin Tabs retained the service-call-sheet lineage while preserving mobile readability and progressive disclosure.

### 4. Rendered QA proved behavioral boundaries, not only layout

The rendered QA suite verified hazard exit, answer-preserving Edit behavior, desktop/mobile composition, reduced motion and the distinction between request and booking. It also caught test-code defects without forcing unnecessary product changes.

### 5. Gate 6.5 artifact identity transferred cleanly from Cargo

The live evaluator gate required the exact validated build to be deployed and identified. The production JS/CSS asset names matched the Gate 6 build before live acceptance.

This is the materially different validation case requested by the Cargo post-mortem. The evaluated-artifact-identity rule remained useful without depending on dashboard-specific behavior.

### 6. Gate 6.75 claim audit transferred cleanly from Cargo

The evidence film was captured against production and constrained to real product truths. `This is not a booking`, `Preference only · not reserved`, and `STILL TO CONFIRM` remained visible. The presentation did not strengthen the product's claims.

The first successful cut was 63.00 seconds and was superseded only to meet the 55–60 second narrative target. No product behavior changed between cuts.

### 7. Gate 7 reproducibility transferred cleanly — and exposed a new blind spot

The project added a lockfile, switched CI to `npm ci`, verified no product-source drift after the validated product commit, reproduced the exact production bundle names, merged under expected-head protection, ran post-merge CI, and rechecked the live artifact.

During this hardening, the first dependency audit passed with zero vulnerabilities. Then Playwright `1.55.0` was installed ephemerally for rendered QA and introduced one high-severity finding. Because the initial audit had already run, a pipeline that stopped there would have reported security evidence for a different dependency graph than the one actually used by QA.

The final pipeline pinned the QA runtime to Playwright `1.60.0` and ran a second audit after the QA runtime installation. Both the locked-project audit and the effective post-QA-runtime audit passed with zero vulnerabilities.

This is the strongest new learning from Test #03.

## What created unnecessary iteration

### 1. Security audit initially covered the wrong dependency graph

The first Gate 7 hardening sequence audited the locked graph before installing the ephemeral QA runtime. That evidence was incomplete once `node_modules` was mutated later in the job.

Lesson: when security audit is part of freeze evidence, it must cover the effective dependency graph actually used by the relevant QA/evidence stage.

### 2. QA assertion defects briefly looked like product defects

Two rendered-QA failures came from the test implementation rather than the product: one assertion expected a visible text form that was actually exposed through an accessible label, and another attempted to use a nonexistent Playwright API. Both were corrected without changing the product.

Lesson: failing evaluator automation is evidence that must be investigated, not automatically interpreted as a product regression. This is implementation practice, not a new TRACE Gate.

### 3. Manual deployment metadata required fresh lookup

The Vercel deployment remained stable, but a previously recorded project ID was superseded by a fresh deployment lookup. The deployment ID, canonical URL and bundle identity remained consistent.

Lesson: provider-specific project identifiers are weaker evidence than the deployed artifact identity that the evaluator actually receives. This is already covered by the evaluated-artifact-identity rule and does not justify a new Kernel concept.

### 4. Evidence-film duration required one timing-only rerun

The first valid evidence film was 63.00 seconds, outside the selected 55–60 second presentation target. Reducing capture waits produced a final 56.88-second film without changing product behavior.

The exact duration target is project-specific and should not be promoted.

## Cross-domain validation of Cargo-promoted Kernel rules

### Gate 6.5 — Evaluated artifact identity and critical-promise experienceability

**Result: CONFIRMED ACROSS MATERIAL PRODUCT TYPES.**

Cargo used this rule for an operational risk-review dashboard. Test #03 used it for a mobile consumer intake/handoff flow. In both cases, the rule prevented evaluator evidence from drifting away from the validated product.

Action: **retain the existing Kernel rule unchanged; increase validation confidence rather than add more criteria.**

### Gate 6.75 — Validated-product evidence and claim audit

**Result: CONFIRMED ACROSS MATERIAL PRODUCT TYPES.**

Both projects benefited from treating the demo as evidence instead of marketing.

Action: **retain the existing Kernel rule unchanged; increase validation confidence.**

### Gate 7 — Reproducibility, promotion and post-promotion verification

**Result: CONFIRMED ACROSS MATERIAL PRODUCT TYPES.**

The rule remained useful on the consumer workflow and did not depend on Cargo's dashboard architecture.

Action: **retain the existing Gate 7 structure. Add only the conditional effective-dependency-graph security-evidence refinement described below.**

## Learning candidates

### Candidate A — Effective dependency graph for security evidence

1. Did it solve a real problem? **Yes.** The initial audit reported zero vulnerabilities before an ephemeral QA runtime introduced a high-severity finding.
2. Was the improvement observable? **Yes.** A second audit after QA-runtime installation detected the difference; the final pinned runtime produced zero vulnerabilities.
3. Useful beyond this project? **Yes, conditionally.** Any code pipeline can install QA/evidence tools after an earlier audit.
4. Cross-project support? **Yes.** Cargo's CI also installs Playwright for QA only after the base dependency installation, showing that the pattern is not unique to Test #03.
5. Does it require all TRACE projects to run a package audit? **No.** The rule applies only when dependency/security audit is being used as acceptance or freeze evidence.
6. Destination: **Kernel decision-rule refinement + Tool Registry guidance.**

### Candidate B — Playwright as an explicit TRACE QA/evidence tool

1. Did it solve real jobs? **Yes.** Rendered interaction QA, live evaluator capture and evidence-film capture.
2. Useful beyond this project? **Yes.** Cargo and Test #03 both used browser automation for evaluator proof.
3. Stable job definition? **Yes.** The tool is useful by gate/job, while exact selectors and versions remain implementation-specific.
4. Destination: **Tool Registry.**

Promote the jobs and freeze policy, not Playwright `1.60.0` as a permanent version.

### Candidate C — One-question-per-screen consumer flow

It improved this intake flow, but it is a product/UX pattern rather than a universal TRACE rule. Other product types may require dense comparison or simultaneous context.

Destination: **Project Adapter / pattern reference, not Kernel.**

### Candidate D — Blue Carbon / Margin Tabs / Handoff Imprint

These created a distinctive product identity and successfully translated the Service Call Sheet metaphor.

Destination: **Project-local.** Do not promote visual vocabulary, palette, typography or signatures to TRACE Kernel.

### Candidate E — Hazard exit wording and plumbing flow fields

The exact emergency language, issue taxonomy, site-context fields and service-ready brief content are vertical-specific.

Destination: **Project-local / Adapter.**

### Candidate F — Manual Vercel deployment procedure

Useful for this implementation, but provider/project IDs, connector upload procedure and exact alias behavior are deployment mechanics.

Destination: **Project example; not Kernel.**

## Promotions

### Kernel — one conditional refinement

When dependency/security audit is used as QA, evaluation or Freeze evidence for a code-based product, acceptance must reflect the **effective dependency graph used by the relevant stage**. If ephemeral QA/evidence tooling mutates that graph after an earlier audit, the evidence must be refreshed after the mutation before the stage can be accepted.

This does **not** make `npm audit` mandatory for every TRACE project and does not create a new Gate.

### Existing Kernel rules — cross-domain validated, no structural change

The Cargo-promoted Gate 6.5, Gate 6.75 and Gate 7 rules are now supported by two materially different code product types:

- operational freight-risk decision support;
- consumer mobile service-request conversion/handoff.

Record the increased validation confidence, but do not add duplicate criteria.

### Tool Registry

Add Playwright as a Gate 6 / 6.5 / 6.75 / 7 tool for:

- rendered interaction QA;
- live evaluator capture;
- evidence capture;
- deterministic browser assertions.

Guidance:

- pin the QA runtime for Freeze evidence;
- if it is installed ephemerally and mutates the dependency graph after a prior security audit, refresh the audit on the effective graph;
- exact selectors, browser binaries and package versions remain implementation choices.

### Project-local / Adapter

Keep local:

- Blue Carbon;
- Margin Tabs;
- Handoff Imprint;
- `#123E67` palette anchor;
- Source Sans 3 + Roboto Mono;
- plumbing issue taxonomy and hazard wording;
- Access Window copy;
- service-ready brief fields;
- 55–60 second evidence-film target.

## App / MCP productization decision

TRACE's existing `appification_threshold` requires the Kernel to survive at least two materially different external project types before a monolithic app/plugin should be considered.

That minimum evidence threshold is now met by Cargo Risk Window and Home Service Ready Request. Test #03 therefore changes the framework state from **DEFERRED_UNTIL_KERNEL_VALIDATION** to **ELIGIBLE_FOR_PRODUCTIZATION_REASSESSMENT**.

This is not an automatic decision to build the app/MCP layer. The next step should be a dedicated productization assessment: identify which TRACE Kernel operations benefit from executable orchestration, which should remain project adapters, and what value a ChatGPT App/MCP layer adds beyond the existing skill/state/repository workflow.

The ongoing STO Test #02 can continue independently and may still refine orientation/governance behavior, but it is no longer required merely to satisfy the two-materially-different-project minimum threshold.

## Final Gate 8 verdict

**COMPLETE — TEST #03 LEARNING REVIEWED, SUPPORTED PROMOTIONS IDENTIFIED.**

Promote the conditional effective-dependency-graph rule and Playwright Tool Registry guidance; record Gate 6.5 / 6.75 / 7 as cross-domain validated; keep all consumer/plumbing/visual mechanics local; move App/MCP from deferred to reassessment-eligible rather than immediately building it.
