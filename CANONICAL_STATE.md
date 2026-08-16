# Canonical implementation state — Home Service Ready Request

Last synchronized: 2026-08-16

## Identity
- TRACE validation case: Test #03 — conversion / consumer workflow
- Implementation repository: `Faadil1/home-service-ready-request`
- Build branch: `build/blue-carbon-margin-tabs`
- PR: #1 — open, draft, not merged
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

## Frozen user-visible product identity
- Validated product/source HEAD: `8d81a9e3396de5823c64cf7d5c3df41840240c3e`
- JS: `/assets/index-DsBP0ZMz.js`
- CSS: `/assets/index-dI3W3B_H.css`

Commits after `8d81a9e...` add QA, evidence, documentation, dependency locking and promotion controls. Gate 7 compare confirms **no `src/` drift**.

## Gate 6 — PASS
- CI run: `31939110878`
- Rendered QA artifact: `9261523786`
- Digest: `sha256:16b0eb57728617524796441e0e11779c74a3b17c370f6a2dec00d7fc9dcb16c7`
- Security audit: PASS — 0 vulnerabilities
- Hazard exit, Review Edit preservation, desktop/mobile and reduced motion: PASS

## Gate 6.5 — PASS
- Canonical URL: `https://home-service-ready-request.vercel.app`
- Vercel deployment: `dpl_3Twe4RDNYuPZcg65RFgwM4fjNqfo`
- Fresh Gate 7 Vercel project ID for that deployment: `prj_vmPGyKXbyXRWHJyy5JpmoednTnHk`
- Deployment state: READY
- Deployment method: manual Vercel connector upload from the exact validated product source; Git-linked auto-deploy is not assumed.
- Live evaluator run: `31939929008` — PASS
- Evidence artifact: `9261739069`
- Digest: `sha256:aa62e7bf9f8d83c0e6e240ccd431975acd5babe708f89f56790e596a113f3397`

The Vercel project ID previously recorded at Gate 6.5 is superseded by the fresh deployment lookup performed at Gate 7. Deployment ID, canonical URL and bundle identity remain unchanged.

## Gate 6.75 — PASS
- Narrative: `docs/DEMO_NARRATIVE_001.md`
- Audit: `docs/DEMO_AUDIT_001.md`
- Final evidence run: `31950856489` — PASS
- Workflow source head: `49c307d79473d5eb88c0f396516873c2f27ff408`
- Evidence artifact: `9264610424`
- Digest: `sha256:ae2d054377206f4aa454024d2a66681fff05a6e95f0e6bf45ed6db6b27cfd5af`
- Final film duration: **56.88 seconds**
- Claim audit: PASS

## Gate 7 — FREEZE PASS

Audit: `docs/FREEZE_AUDIT_001.md`

### Reproducibility
- `package-lock.json` committed.
- lockfileVersion: `3`.
- CI uses `npm ci`.
- Node line: Node 22.
- one-time lock generator removed after use.

### Security
A first Gate 7 hardening pass exposed one high-severity finding introduced only after installing Playwright `1.55.0`. That pass is superseded and is not the freeze candidate.

Final Gate 7 QA runtime: Playwright `1.60.0`.
Final CI audits both the locked project graph and the graph after QA runtime installation.

Final freeze CI:
- source HEAD: `b27178867153e500629ea88498494412b428ade8`
- run: `31952506570` — **PASS**
- locked-project audit: **0 vulnerabilities**
- post-QA-runtime audit: **0 vulnerabilities**
- build: PASS
- rendered QA: PASS
- artifact: `9265051471`
- digest: `sha256:6701a059bf490b61eac8392e9bffcb36541eab7fa8ea621000d61352693250f3`

The `npm ci` build reproduces the frozen product bundles exactly:
- `/assets/index-DsBP0ZMz.js`
- `/assets/index-dI3W3B_H.css`

### No-product-drift audit
Git compare `8d81a9e... → b271788...` contains only workflows, QA/evidence files, documentation and `package-lock.json`. No `src/`, `index.html`, `package.json`, tsconfig or Vite config changes are present.

### Live recheck
- Vercel deployment `dpl_3Twe4RDNYuPZcg65RFgwM4fjNqfo`: READY
- production target: yes
- canonical alias: `home-service-ready-request.vercel.app`
- HTTP status: 200
- live JS/CSS bundle identity matches the reproducible Gate 7 build exactly

## Current TRACE position
- Gates 0 → 4.25: PASS / frozen before implementation.
- Gate 6: PASS.
- Gate 6.5: PASS.
- Gate 6.75: PASS.
- Gate 7: **FREEZE_PASS — READY FOR PROMOTION DECISION**.

## Promotion rule
PR #1 remains **draft and unmerged** until an explicit decision is made.

Next action must be one of:
- **PROMOTE** → mark PR #1 ready, re-read the frozen PR head, merge with expected-head protection, run post-merge CI, recheck live identity, then proceed to Gate 8 postmortem.
- **HOLD** → keep PR #1 draft/unmerged and preserve the frozen state.

No Test #03 learning is promoted into the TRACE Kernel before Gate 8 postmortem and generalizability review.
