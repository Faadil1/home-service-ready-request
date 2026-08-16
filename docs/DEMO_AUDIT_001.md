# Gate 6.75 Demo Audit

Verdict: **PASS — LIVE EVIDENCE SEQUENCE VERIFIED**

## Evaluated artifact

- Production URL: https://home-service-ready-request.vercel.app
- Validated product source: `8d81a9e3396de5823c64cf7d5c3df41840240c3e`
- Expected/live JS: `/assets/index-DsBP0ZMz.js`
- Expected/live CSS: `/assets/index-dI3W3B_H.css`
- Identity verdict: PASS

## Final evidence

- Workflow run: `31950856489` — PASS
- Workflow source head: `49c307d79473d5eb88c0f396516873c2f27ff408`
- Artifact: `9264610424`
- Digest: `sha256:ae2d054377206f4aa454024d2a66681fff05a6e95f0e6bf45ed6db6b27cfd5af`
- Film: `home-service-ready-request-evidence-film.webm`
- Duration: **56.88 s**

Captured proof moments:
1. missed-contact entry;
2. Site Context;
3. Access Window preference;
4. Review;
5. Request Received;
6. service-ready brief.

## Claim audit

- live asset identity — PASS
- request received is not booking — PASS
- Access Window is preference, not reserved inventory — PASS
- `STILL TO CONFIRM` remains visible — PASS
- no booking/appointment confirmation claim — PASS
- no technician assignment claim — PASS
- no guaranteed response claim — PASS
- presentation title cards do not strengthen product claims — PASS

## Superseded capture

Run `31950646318` was technically and semantically valid but produced a 63.00 s film. It is superseded by final run `31950856489` solely to satisfy the 55–60 s evidence-film target. No product code changed between these evidence runs.

## Exit decision

Gate 6.75 closes **PASS**. The product may proceed to Gate 7 Freeze / Promotion preparation. Gate 7 still requires reproducibility hardening before promotion, including a committed dependency lock and `npm ci`-based CI. PR #1 remains draft and unmerged until Gate 7 reaches an explicit promotion decision.