import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const baseURL = process.env.QA_URL || 'https://home-service-ready-request.vercel.app'
const out = 'live-evaluation-artifacts'
const expectedAssets = {
  js: '/assets/index-DsBP0ZMz.js',
  css: '/assets/index-dI3W3B_H.css',
}

await fs.mkdir(out, { recursive: true })

function assert(condition, message) {
  if (!condition) throw new Error(message)
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

  const [jsResponse, cssResponse] = await Promise.all([
    fetch(new URL(expectedAssets.js, baseURL)),
    fetch(new URL(expectedAssets.css, baseURL)),
  ])
  assert(jsResponse.ok, `Live JS asset returned ${jsResponse.status}`)
  assert(cssResponse.ok, `Live CSS asset returned ${cssResponse.status}`)

  return observed
}

async function completeEvaluatorPath(page, prefix) {
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.getByText('This does not book an appointment.').waitFor()
  await page.screenshot({ path: `${out}/${prefix}-01-entry.png`, fullPage: true })

  await page.getByRole('button', { name: 'Start service request' }).click()
  await page.getByRole('button', { name: 'Leaking fixture or pipe' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByRole('button', { name: 'Kitchen' }).click()
  await page.getByRole('button', { name: '+ Add demo photo' }).click()
  await page.getByRole('button', { name: '+ Add demo photo' }).click()
  await page.getByPlaceholder('Example: Slow drip under the kitchen sink, noticed this morning.').fill('Slow drip under the kitchen sink, noticed this morning.')
  await page.getByPlaceholder('Example: Weekday mornings are easiest.').fill('Weekday mornings are easiest.')
  await page.screenshot({ path: `${out}/${prefix}-02-site-context.png`, fullPage: true })
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByText('This is not live availability and does not reserve a time.').waitFor()
  await page.getByRole('button', { name: /This week/ }).click()
  await page.getByPlaceholder('Example: Before noon is best.').fill('Before noon is best.')
  await page.getByText('Preference only · not reserved').first().waitFor()
  await page.screenshot({ path: `${out}/${prefix}-03-access-window.png`, fullPage: true })
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByPlaceholder('Jamie Lee').fill('Jamie Lee')
  await page.getByPlaceholder('(415) 555-0198').fill('(415) 555-0198')
  await page.getByRole('button', { name: 'Review request' }).click()

  await page.getByText('Sending this creates a request, not an appointment.').waitFor()
  await page.getByText('Preferred · not reserved').waitFor()
  await page.screenshot({ path: `${out}/${prefix}-04-review.png`, fullPage: true })

  await page.getByRole('button', { name: 'Confirm & send request' }).click()
  await page.getByText('REQUEST RECEIVED').first().waitFor()
  await page.getByText('This is not a booking.').waitFor()
  await page.getByText('No time has been reserved yet.').waitFor()
  await page.screenshot({ path: `${out}/${prefix}-05-received.png`, fullPage: true })

  await page.getByRole('button', { name: 'View service-ready brief' }).click()
  await page.getByText('STILL TO CONFIRM').waitFor()
  await page.getByText('Provider availability').waitFor()
  await page.getByText('Appointment date or arrival window').waitFor()
  await page.getByText('Price or quote, if applicable').waitFor()
  await page.getByText('Preference only · not reserved').waitFor()
  await page.screenshot({ path: `${out}/${prefix}-06-service-ready-brief.png`, fullPage: true })

  const body = await page.locator('body').innerText()
  for (const prohibited of ['Booking confirmed', 'Appointment confirmed', 'Technician assigned', 'Guaranteed response time']) {
    assert(!body.includes(prohibited), `Misleading positive claim appeared live: ${prohibited}`)
  }
}

async function assertHazardBoundary(page) {
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Start service request' }).click()
  await page.getByRole('button', { name: 'Water is rapidly flooding or the situation feels unsafe' }).click()
  await page.getByText('OUTSIDE THIS REQUEST FLOW').waitFor()
  await page.getByText('It does not assess safety, dispatch emergency service, or tell you a situation is safe.').waitFor()
  await page.screenshot({ path: `${out}/mobile-hazard-boundary.png`, fullPage: true })
}

const browser = await chromium.launch({ headless: true })
let observedIdentity

try {
  const identityContext = await browser.newContext({ viewport: { width: 1280, height: 800 } })
  const identityPage = await identityContext.newPage()
  observedIdentity = await assertLiveIdentity(identityPage)
  await identityContext.close()

  const desktop = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    recordVideo: { dir: `${out}/video`, size: { width: 1280, height: 720 } },
  })
  const desktopPage = await desktop.newPage()
  const desktopVideo = desktopPage.video()
  await completeEvaluatorPath(desktopPage, 'desktop')
  await desktop.close()
  if (desktopVideo) {
    const generatedVideo = await desktopVideo.path()
    await fs.copyFile(generatedVideo, `${out}/live-evaluator-proof.webm`)
  }

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mobilePage = await mobile.newPage()
  await assertHazardBoundary(mobilePage)
  await completeEvaluatorPath(mobilePage, 'mobile')
  await mobile.close()

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(baseURL, { waitUntil: 'networkidle' })
  await reducedPage.getByRole('button', { name: 'Start service request' }).click()
  await reducedPage.getByRole('button', { name: 'Leaking fixture or pipe' }).click()
  await reducedPage.screenshot({ path: `${out}/mobile-reduced-motion.png`, fullPage: true })
  await reduced.close()

  const report = {
    gate: '6.5',
    verdict: 'PASS',
    evaluatedUrl: baseURL,
    evaluatedAt: new Date().toISOString(),
    validatedSourceHead: '8d81a9e3396de5823c64cf7d5c3df41840240c3e',
    expectedAssets,
    observedIdentity,
    assertions: {
      liveAssetIdentity: 'PASS',
      missedContactToServiceReadyBrief: 'PASS',
      requestReceivedNotBooking: 'PASS',
      accessWindowPreferenceNotInventory: 'PASS',
      hazardBoundary: 'PASS',
      stillToConfirmVisible: 'PASS',
      misleadingPositiveClaimsAbsent: 'PASS',
      mobile390x844: 'PASS',
      reducedMotion: 'PASS',
    },
  }
  await fs.writeFile(`${out}/live-evaluation-report.json`, JSON.stringify(report, null, 2))
  console.log('Gate 6.5 live evaluator proof path passed.')
  console.log(JSON.stringify(report, null, 2))
} finally {
  await browser.close()
}
