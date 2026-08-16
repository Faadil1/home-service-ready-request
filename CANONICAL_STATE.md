# Canonical implementation state — Home Service Ready Request

Last synchronized: 2026-08-16

## Identity
- TRACE validation case: Test #03 — conversion / consumer workflow
- Implementation repository: `Faadil1/home-service-ready-request`
- Build branch: `build/blue-carbon-margin-tabs`
- Draft PR: #1
- Main: not merged
- Live product: `https://home-service-ready-request.vercel.app`

## Frozen design contract
- Visual direction: **Blue Carbon**
- Composition: **Margin Tabs**
- Primary carbon blue: `#123E67`
- Typography: Source Sans 3 + Roboto Mono
- Primary signature: Margin Tab Transfer
- Narrative signature: Handoff Imprint
- Motion runtime: Motion for React + CSS only
- Primary viewport: 390×844
- Desktop rule: centered consumer sheet, never dashboard expansion

## Protected product truths
- `Request received` is **not** booking confirmation.
- Access Window is a preference, not provider inventory.
- No diagnosis, binding quote, emergency dispatch, automatic technician assignment, or guaranteed response time.
- Immediate hazards exit the ordinary request flow.
- The primary promise is experienceable without a contractor dashboard.

## Evaluator path
`missed contact → issue → Site Context → Access Window → contact → review → Request received → service-ready brief`

The brief exposes what is still to confirm: exact scope, provider availability, appointment timing, and price/quote where applicable.

## Gate 6 — PASS
- Validated product/source HEAD: `8d81a9e3396de5823c64cf7d5c3df41840240c3e`
- CI run: `31939110878` — PASS
- Rendered QA artifact: `9261523786`
- Digest: `sha256:16b0eb57728617524796441e0e11779c74a3b17c370f6a2dec00d7fc9dcb16c7`
- Security audit: PASS — 0 vulnerabilities
- Vite: `8.2.0`
- Hazard exit, Review Edit preservation, desktop/mobile and reduced motion: PASS

## Gate 6.5 — PASS

### Live artifact identity
- Canonical URL: `https://home-service-ready-request.vercel.app`
- Vercel project: `prj_KyhYn470J5RZo8ENLPKxyhWpBfdF`
- Vercel deployment: `dpl_3Twe4RDNYuPZcg65RFgwM4fjNqfo`
- Deployment state: READY
- Deployment method: manual Vercel connector upload from exact validated source HEAD `8d81a9e3396de5823c64cf7d5c3df41840240c3e`; Git-linked auto-deploy is not assumed.
- Expected/live JS: `/assets/index-DsBP0ZMz.js`
- Expected/live CSS: `/assets/index-dI3W3B_H.css`
- Identity verdict: PASS

### Live evaluator proof
- Workflow run: `31939929008` — PASS
- Evidence artifact: `9261739069`
- Digest: `sha256:aa62e7bf9f8d83c0e6e240ccd431975acd5babe708f89f56790e596a113f3397`
- Full evaluator path, request-not-booking, preference-not-inventory, hazard boundary, `STILL TO CONFIRM`, mobile and reduced motion: PASS

## Gate 6.75 — PASS

### Demo narrative
- Narrative: `docs/DEMO_NARRATIVE_001.md`
- Audit: `docs/DEMO_AUDIT_001.md`
- Proof rule: validated live product for product moments; presentation cards may frame but may not strengthen claims.

### Final live evidence film
- Workflow: `Gate 6.75 Demo Evidence Film`
- Final run: `31950856489` — PASS
- Workflow source head: `49c307d79473d5eb88c0f396516873c2f27ff408`
- Evidence artifact: `9264610424`
- Digest: `sha256:ae2d054377206f4aa454024d2a66681fff05a6e95f0e6bf45ed6db6b27cfd5af`
- Film: `home-service-ready-request-evidence-film.webm`
- Duration: **56.88 seconds**
- Live asset identity: PASS
- Claim audit: PASS
- `This is not a booking`: visible
- Access Window `Preference only · not reserved`: visible
- `STILL TO CONFIRM`: visible
- prohibited positive claims: absent
- presentation strengthened claims: no

The earlier successful evidence run `31950646318` produced a 63.00-second film. It is superseded only because it exceeded the 55–60 second target. The final run changed capture timing only; the validated product source remained unchanged.

## Product identity versus evidence/documentation HEAD

The frozen user-visible product identity remains `8d81a9e3396de5823c64cf7d5c3df41840240c3e`. Commits after that point add QA, live-evidence automation, narrative/audit documents and canonical state; they do not imply a new product artifact.

## Current TRACE position
- Gates 0 → 4.25: PASS / frozen before implementation.
- Gate 6: PASS.
- Gate 6.5: PASS.
- Gate 6.75: PASS.
- Current: **Gate 7 — Freeze / Promotion preparation**.
- PR #1 remains draft and unmerged.

## Gate 7 prerequisites still open
- Commit a reproducible dependency lock.
- Convert CI dependency installation to `npm ci`.
- Re-run CI on the reproducible dependency graph.
- Verify no product-source drift from `8d81a9e...`.
- Recheck the canonical live URL before promotion decision.
- Only after Freeze PASS: explicit PROMOTE or HOLD decision.

## Next required work
Execute Gate 7 reproducibility hardening and freeze audit. Do not merge PR #1 before Gate 7 reaches `FREEZE_PASS_AWAITING_PROMOTION`.