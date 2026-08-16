import { chromium } from 'playwright'
import fs from 'node:fs/promises'

const baseURL = process.env.QA_URL || 'http://127.0.0.1:4173'
const out = 'qa-artifacts'
await fs.mkdir(out, { recursive: true })

async function completeFlow(page) {
  await page.goto(baseURL, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Start service request' }).click()
  await page.getByRole('button', { name: 'Leaking fixture or pipe' }).click()
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByRole('button', { name: 'Kitchen' }).click()
  await page.getByRole('button', { name: '+ Add demo photo' }).click()
  await page.getByRole('button', { name: '+ Add demo photo' }).click()
  await page.getByPlaceholder('Example: Slow drip under the kitchen sink, noticed this morning.').fill('Slow drip under the kitchen sink, noticed this morning.')
  await page.getByPlaceholder('Example: Weekday mornings are easiest.').fill('Weekday mornings are easiest.')
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByRole('button', { name: /This week/ }).click()
  await page.getByPlaceholder('Example: Before noon is best.').fill('Before noon is best.')
  await page.getByRole('button', { name: 'Continue' }).click()

  await page.getByPlaceholder('Jamie Lee').fill('Jamie Lee')
  await page.getByPlaceholder('(415) 555-0198').fill('(415) 555-0198')
  await page.getByRole('button', { name: 'Review request' }).click()

  await page.getByText('Sending this creates a request, not an appointment.').waitFor()
  await page.getByText('Preferred · not reserved').waitFor()
}

const browser = await chromium.launch({ headless: true })

try {
  const desktop = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await desktop.newPage()
  await completeFlow(page)
  await page.screenshot({ path: `${out}/desktop-review.png`, fullPage: true })

  await page.getByRole('button', { name: 'Confirm & send request' }).click()
  await page.getByText('REQUEST RECEIVED').first().waitFor()
  await page.getByText('This is not a booking.').waitFor()
  await page.screenshot({ path: `${out}/desktop-received.png`, fullPage: true })

  await page.getByRole('button', { name: 'View service-ready brief' }).click()
  await page.getByText('STILL TO CONFIRM').waitFor()
  await page.getByText('Provider availability').waitFor()
  await page.getByText('Preference only · not reserved').waitFor()
  await page.screenshot({ path: `${out}/desktop-brief.png`, fullPage: true })
  await desktop.close()

  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 } })
  const mobilePage = await mobile.newPage()
  await completeFlow(mobilePage)
  await mobilePage.screenshot({ path: `${out}/mobile-review.png`, fullPage: true })
  await mobilePage.getByRole('button', { name: 'Confirm & send request' }).click()
  await mobilePage.getByText('This is not a booking.').waitFor()
  await mobilePage.screenshot({ path: `${out}/mobile-received.png`, fullPage: true })
  await mobile.close()

  const reduced = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' })
  const reducedPage = await reduced.newPage()
  await reducedPage.goto(baseURL, { waitUntil: 'networkidle' })
  await reducedPage.getByRole('button', { name: 'Start service request' }).click()
  await reducedPage.getByRole('button', { name: 'Leaking fixture or pipe' }).click()
  await reducedPage.screenshot({ path: `${out}/mobile-reduced-motion.png`, fullPage: true })
  await reduced.close()

  console.log('Rendered QA assertions passed.')
} finally {
  await browser.close()
}
