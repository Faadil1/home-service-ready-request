# Gate 7 — Freeze / Promotion Audit

Verdict: **FREEZE_PASS — READY FOR PROMOTION DECISION**

Date: 2026-08-16

## Frozen identities

- User-visible validated product source: `8d81a9e3396de5823c64cf7d5c3df41840240c3e`
- Gate 7 reproducibility candidate HEAD before this audit document: `b27178867153e500629ea88498494412b428ade8`
- Implementation branch: `build/blue-carbon-margin-tabs`
- PR: #1 — open, draft, not merged at freeze time
- Canonical live URL: `https://home-service-ready-request.vercel.app`

The product identity and promotion branch identity are intentionally separate. Commits after the validated product source add evidence, QA automation, documentation, dependency locking and freeze controls; they do not change `src/`.

## Product-source drift audit — PASS

Git compare from validated product `8d81a9e...` to Gate 7 candidate `b271788...` reports only:
- `.github/workflows/ci.yml`
- `.github/workflows/demo-evidence-film.yml`
- `.github/workflows/live-evaluation.yml`
- `CANONICAL_STATE.md`
- `docs/DEMO_AUDIT_001.md`
- `docs/DEMO_NARRATIVE_001.md`
- `package-lock.json`
- `qa/live-evaluation.mjs`
- `qa/live-evidence-film.mjs`

No `src/`, `index.html`, `package.json`, TypeScript config or Vite config drift is present.

## Reproducibility — PASS

- `package-lock.json` committed.
- lockfileVersion: `3`.
- package versions remain pinned in `package.json`.
- CI dependency install changed from `npm install` to `npm ci`.
- Node CI line remains Node 22.
- one-time lock-generation workflow was removed after use so no unnecessary `contents: write` workflow remains.

## Security hardening — PASS

The first Gate 7 CI hardening pass exposed a real QA-tooling gap: Playwright `1.55.0` introduced one high-severity audit finding after the initial project audit. That pass is not the freeze candidate.

The final candidate uses Playwright `1.60.0` for the temporary QA runtime and audits twice:
1. locked project dependency graph after `npm ci`;
2. dependency graph again after QA runtime installation.

Final Gate 7 CI run `31952506570`:
- locked-project audit: **0 vulnerabilities**
- post-QA-runtime audit: **0 vulnerabilities**
- build: **PASS**
- rendered QA: **PASS**

## Reproducible build identity — PASS

The `npm ci` build on Gate 7 candidate HEAD `b271788...` produced:
- JS: `/assets/index-DsBP0ZMz.js`
- CSS: `/assets/index-dI3W3B_H.css`

Those are the same bundle identities validated at Gate 6 and currently served by production.

Rendered QA artifact from final Gate 7 CI:
- run: `31952506570`
- artifact: `9265051471`
- digest: `sha256:6701a059bf490b61eac8392e9bffcb36541eab7fa8ea621000d61352693250f3`

## Live identity recheck — PASS

Fresh Vercel inspection at Gate 7 confirms:
- deployment: `dpl_3Twe4RDNYuPZcg65RFgwM4fjNqfo`
- deployment state: `READY`
- deployment target: production
- canonical alias includes `home-service-ready-request.vercel.app`
- current Vercel project ID reported for this deployment: `prj_vmPGyKXbyXRWHJyy5JpmoednTnHk`
- live HTTP status: `200`
- live JS: `/assets/index-DsBP0ZMz.js`
- live CSS: `/assets/index-dI3W3B_H.css`

The earlier project ID recorded during Gate 6.5 is superseded by this fresh Vercel deployment lookup. Deployment ID, canonical URL and asset identity remain unchanged.

## Evidence continuity — PASS

- Gate 6 QA: PASS
- Gate 6.5 live evaluator proof: PASS
- Gate 6.75 final Evidence Film: PASS
- final film duration: 56.88 s
- final claim audit: PASS
- live truth boundaries remain visible and unchanged.

## Freeze decision

All Gate 7 prerequisites are satisfied:
- known-good product identity preserved;
- no product-source drift;
- reproducible dependency graph committed;
- `npm ci` verification passes;
- both security audits pass;
- rendered QA passes;
- reproducible build outputs match the live product;
- production deployment is READY and live identity is preserved.

**Gate 7 verdict: FREEZE_PASS — READY FOR PROMOTION DECISION.**

Do not merge PR #1 automatically. The next action is an explicit **PROMOTE** or **HOLD** decision. If PROMOTE is chosen, mark PR #1 ready for review, merge with the expected frozen PR head, run post-merge CI, and recheck the canonical live identity after promotion.
