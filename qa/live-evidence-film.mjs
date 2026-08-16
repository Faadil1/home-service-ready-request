import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const baseURL = process.env.QA_URL || 'https://home-service-ready-request.vercel.app'
const out = 'gate-6-75-evidence'
const expectedAssets = {
  js: '/assets/index-DsBP0ZMz.js',
  css: '/assets/index-dI3W3B_H.css',
}
const prohibitedClaims = [
  'Booking confirmed',
  'Appointment confirmed',
  'Technician assigned',
  'Guaranteed response time',
  'Reserved appointment',
]

await fs.mkdir(out, { recursive: true })

function assert(condition, message) {
  if (!condition) throw new Error(message)
}

async function hold(page, ms) {
  await page.waitForTimeout(ms)
}

async function titleCard(page, kicker, title, subtitle, ms) {
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>
    *{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;font-family:Arial,Helvetica,sans-serif;background:#f5f3ed;color:#123E67}
    body{display:flex;align-items:center;justify-content:center;padding:72px}
    main{width:min(980px,100%);border-top:8px solid #123E67;padding-top:30px}
    .k{font-size:18px;letter-spacing:.16em;text-transform:uppercase;font-weight:700;margin-bottom:22px}
    h1{font-size:58px;line-height:1.02;letter-spacing:-.035em;margin:0 0 24px;max-width:920px}
    p{font-size:26px;line-height:1.35;margin:0;max-width:840px;color:#345b7d}
    .trace{margin-top:40px;font:700 16px/1.2 monospace;letter-spacing:.08em;color:#123E67}
  </style></head><body><main><div class="k">${kicker}</div><h1>${title}</h1><p>${subtitle}</p><div class="trace">TRACE · GATE 6.75 · LIVE EVIDENCE</div></main></body></html>`)
  await hold(page, ms)
}

async function assertLiveIdentity(page) {
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  const observed = await page.evaluate(() => ({
    title: document.title,
    script: document.querySelector('script[type="module"]')?.getAttribute('src') ?? '',
    stylesheet: document.querySelector('link[rel="stylesheet"]')?.getAttribute('href') ?? '',
  }))
  assert(observed.title === 'Service-Ready Request', `Unexpected live title: ${observed.title}`)
  assert(observed.script === expectedAssets.js, `Live JS asset mismatch: ${observed.script}`)
  assert(observed.stylesheet === expectedAssets.css, `Live CSS asset mismatch: ${observed.stylesheet}`)
  return observed
}

async function assertNoProhibitedClaims(page, label) {
  const text = await page.locator('body').innerText()
  for (const claim of prohibitedClaims) {
    assert(!text.includes(claim), `${label}: prohibited claim appeared: ${claim}`)
  }
}

const browser = await chromium.launch({ headless: true })
let videoPath
let observedIdentity

try {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    recordVideo: { dir: `${out}/video`, size: { width: 1280, height: 720 } },
  })
  const page = await context.newPage()
  const video = page.video()

  await titleCard(
    page,
    'Missed contact → structured handoff',
    'Turn service context into a service-ready request.',
    'Without pretending an appointment has already been booked.',
    4000,
  )

  observedIdentity = await assertLiveIdentity(page)
  await page.getByText('This does not book an appointment.').waitFor()
  await page.screenshot({ path: `${out}/01-entry.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'entry')
  await hold(page, 5500)

  await page.getByRole('button', { name: 'Start service request' }).click()
  await page.getByRole('button', { name: 'Leaking fixture or pipe' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByRole('button', { name: 'Kitchen' }).click()
  await page.getByRole('button', { name: '+ Add demo photo' }).click()
  await page.getByPlaceholder('Example: Slow drip under the kitchen sink, noticed this morning.').fill('Slow drip under the kitchen sink, noticed this morning.')
  await page.getByPlaceholder('Example: Weekday mornings are easiest.').fill('Weekday mornings are easiest.')
  await page.screenshot({ path: `${out}/02-site-context.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'site context')
  await hold(page, 8500)

  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByText('This is not live availability and does not reserve a time.').waitFor()
  await page.getByRole('button', { name: /This week/ }).click()
  await page.getByPlaceholder('Example: Before noon is best.').fill('Before noon is best.')
  await page.getByText('Preference only · not reserved').first().waitFor()
  await page.screenshot({ path: `${out}/03-access-window.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'access window')
  await hold(page, 7000)

  await page.getByRole('button', { name: 'Continue' }).click()
  await page.getByPlaceholder('Jamie Lee').fill('Jamie Lee')
  await page.getByPlaceholder('(415) 555-0198').fill('(415) 555-0198')
  await page.getByRole('button', { name: 'Review request' }).click()
  await page.getByText('Sending this creates a request, not an appointment.').waitFor()
  await page.getByText('Preferred · not reserved').waitFor()
  await page.screenshot({ path: `${out}/04-review.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'review')
  await hold(page, 8000)

  await page.getByRole('button', { name: 'Confirm & send request' }).click()
  await page.getByText('REQUEST RECEIVED').first().waitFor()
  await page.getByText('This is not a booking.').waitFor()
  await page.getByText('No time has been reserved yet.').waitFor()
  await page.screenshot({ path: `${out}/05-request-received.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'request received')
  await hold(page, 8000)

  await page.getByRole('button', { name: 'View service-ready brief' }).click()
  await page.getByText('STILL TO CONFIRM').waitFor()
  await page.getByText('Provider availability').waitFor()
  await page.getByText('Appointment date or arrival window').waitFor()
  await page.getByText('Price or quote, if applicable').waitFor()
  await page.getByText('Preference only · not reserved').waitFor()
  await page.screenshot({ path: `${out}/06-service-ready-brief.png`, fullPage: true })
  await assertNoProhibitedClaims(page, 'service-ready brief')
  await hold(page, 8500)

  await titleCard(
    page,
    'Service-ready request',
    'Structured context. Human follow-up.',
    'No false booking claim.',
    4000,
  )

  const report = {
    gate: '6.75',
    verdict: 'PASS',
    evaluatedUrl: baseURL,
    capturedAt: new Date().toISOString(),
    validatedSourceHead: '8d81a9e3396de5823c64cf7d5c3df41840240c3e',
    expectedAssets,
    observedIdentity,
    timelineSeconds: {
      opening: '0-4',
      entry: '4-10',
      siteContext: '10-21',
      accessWindow: '21-29',
      review: '29-38',
      requestReceived: '38-47',
      serviceReadyBrief: '47-56',
      closing: '56-60',
    },
    claimAudit: {
      liveAssetIdentity: 'PASS',
      openingClaimSupported: 'PASS',
      requestNotBookingVisible: 'PASS',
      accessWindowNotInventoryVisible: 'PASS',
      stillToConfirmVisible: 'PASS',
      prohibitedPositiveClaimsAbsent: 'PASS',
      presentationDoesNotStrengthenProductClaims: 'PASS',
    },
  }
  await fs.writeFile(`${out}/claim-audit.json`, JSON.stringify(report, null, 2))

  await context.close()
  if (video) {
    videoPath = await video.path()
    await fs.copyFile(videoPath, `${out}/home-service-ready-request-evidence-film.webm`)
  }

  console.log('Gate 6.75 live evidence capture passed.')
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
