import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const outDir = resolve(dirname(fileURLToPath(import.meta.url)), '../public/archive')
await mkdir(outDir, { recursive: true })

const browser = await chromium.launch({
  channel: 'chrome',
  headless: true,
})
const page = await browser.newPage({
  viewport: { width: 1280, height: 900 },
  deviceScaleFactor: 2,
})

const hideChrome = async () => {
  await page.addStyleTag({
    content: `
      .bezel, .back-row { display: none !important; }
      .atlas-main { padding: 16px !important; }
    `,
  })
}

const clipBetween = async (startId, endId) => {
  await page.evaluate((id) => {
    document.getElementById(id)?.scrollIntoView({ block: 'start' })
  }, startId)
  await page.waitForTimeout(280)
  return page.evaluate(
    ({ startId, endId }) => {
      const start = document.getElementById(startId)
      const paper = document.querySelector('.legacy-stage')
      const end = endId ? document.getElementById(endId) : paper
      if (!start || !paper) return null
      const s = start.getBoundingClientRect()
      const p = paper.getBoundingClientRect()
      const e = end.getBoundingClientRect()
      const y = Math.max(0, s.y)
      const bottom = endId ? e.y - 8 : Math.min(p.bottom, y + 640)
      return {
        x: Math.max(0, p.x),
        y,
        width: Math.min(p.width, 1280 - p.x),
        height: Math.max(160, Math.min(bottom - y, 900 - y, 680)),
      }
    },
    { startId, endId },
  )
}

await page.goto('http://localhost:5175/archive/live', { waitUntil: 'domcontentloaded' })
await hideChrome()
await page.waitForSelector('#hw-01')
await page.waitForTimeout(1200)

const homework = [
  ['01', 'hw-01', 'hw-02'],
  ['02', 'hw-02', 'hw-03'],
  ['03', 'hw-03', 'hw-04'],
  ['04', 'hw-04', 'hw-05'],
  ['05', 'hw-05', 'hw-06'],
  ['06', 'hw-06', null],
]

for (const [name, start, end] of homework) {
  const clip = await clipBetween(start, end)
  if (!clip) throw new Error(`clip missing for ${name}`)
  await page.screenshot({
    path: resolve(outDir, `${name}.png`),
    clip,
    type: 'png',
  })
  console.log('saved', name, clip)
}

await page.goto('http://localhost:5175/challenge', { waitUntil: 'domcontentloaded' })
await hideChrome()
await page.waitForSelector('.challenge-dock')
await page.waitForTimeout(800)
const challenge = await page.locator('.challenge-dock').boundingBox()
await page.screenshot({
  path: resolve(outDir, '07.png'),
  clip: {
    x: challenge.x,
    y: challenge.y,
    width: challenge.width,
    height: Math.min(challenge.height, 680),
  },
})
console.log('saved 07', challenge)

await page.goto('http://localhost:5175/', { waitUntil: 'domcontentloaded' })
await hideChrome()
await page.waitForSelector('.korea')
await page.waitForTimeout(2500)
const map = await page.locator('.map-stage').boundingBox()
await page.screenshot({
  path: resolve(outDir, '08.png'),
  clip: {
    x: Math.max(0, map.x),
    y: Math.max(0, map.y),
    width: Math.min(map.width, 1280),
    height: Math.min(map.height, 760),
  },
})
console.log('saved 08', map)

await browser.close()
