/**
 * Generates WebP (+ optional AVIF) responsive variants without replacing originals.
 * Run: node scripts/optimize-images.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const publicDir = path.join(root, 'public')

const WIDTHS = {
  hero: [640, 960, 1280, 1920],
  gallery: [400, 800, 1200],
  card: [480, 800, 1200],
  banner: [768, 1280, 1920],
}

/** @type {{ src: string, kind: keyof typeof WIDTHS, maxWidth?: number }[]} */
const JOBS = [
  { src: 'assets/hero-slide-1.png', kind: 'hero' },
  { src: 'assets/hero-slide-2.png', kind: 'hero' },
  { src: 'assets/hero-slide-3.png', kind: 'hero' },
  { src: 'assets/home-section/industry-construction.png', kind: 'card' },
  { src: 'assets/home-section/industry-logistics.png', kind: 'card' },
  { src: 'assets/home-section/industry-healthcare.png', kind: 'card' },
  { src: 'assets/home-section/industry-manufacturing.png', kind: 'card' },
  { src: 'assets/home-section/industry-retail.png', kind: 'card' },
  { src: 'assets/home-section/industry-professional.png', kind: 'card' },
  { src: 'assets/footer-cta-banner.png', kind: 'banner' },
  { src: 'assets/why-us-saudi-enterprise.png', kind: 'card' },
  { src: 'assets/contact/contact-hero-banner.png', kind: 'banner' },
  { src: 'assets/contact/contact-form.png', kind: 'card' },
  { src: 'assets/services/service-copilot-1.png', kind: 'banner' },
  { src: 'assets/services/service-copilot-2.png', kind: 'card' },
  { src: 'assets/services/service-copilot-3.png', kind: 'banner' },
  { src: 'assets/services/service-ai-training-how.png', kind: 'card' },
  { src: 'assets/services/service-agents-1.png', kind: 'banner' },
  { src: 'assets/services/service-agents-how.png', kind: 'card' },
  { src: 'assets/services/service-agents-benefits.png', kind: 'card' },
  { src: 'assets/services/service-agents-3.png', kind: 'banner' },
  { src: 'assets/services/service-ops-1.png', kind: 'banner' },
  { src: 'assets/services/service-ops-how.png', kind: 'card' },
  { src: 'assets/services/service-ops-benefits.png', kind: 'card' },
  { src: 'assets/services/service-agents-2.png', kind: 'card' },
  { src: 'assets/services/service-ops-2.png', kind: 'card' },
  { src: 'assets/services/service-ops-3.png', kind: 'banner' },
  { src: 'assets/services/why-gulf-ai-systems.png', kind: 'card' },
  { src: 'assets/executive.png', kind: 'card' },
  { src: 'assets/about/2030.png', kind: 'card' },
  { src: 'assets/about/collab-event-01.webp', kind: 'card' },
  { src: 'assets/about/collab-event-02.png', kind: 'card' },
  { src: 'assets/about/collab-event-10.webp', kind: 'card' },
  { src: 'assets/about/collab-event-11.png', kind: 'card' },
  { src: 'assets/about/video-thumbnail.png', kind: 'banner' },
  { src: 'assets/about-hero-team.webp', kind: 'card' },
  { src: 'assets/paperwork.webp', kind: 'card' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0012.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0023.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0029.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0036.jpg', kind: 'gallery' },
  // Event page hero uses kind="banner" (768/1280/1920)
  { src: 'assets/about/gulf-event/IMG-20260805-WA0036.jpg', kind: 'banner' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0037.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0040.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0069.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0071.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0077.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0087.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0089.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0095.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0109.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0111.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0115.jpg', kind: 'gallery' },
  { src: 'assets/about/gulf-event/IMG-20260805-WA0119.jpg', kind: 'gallery' },
]

function variantDir(relSrc) {
  const dir = path.dirname(relSrc)
  const base = path.basename(relSrc, path.extname(relSrc))
  return { dir, base }
}

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function processJob(job) {
  const abs = path.join(publicDir, job.src)
  try {
    await fs.access(abs)
  } catch {
    console.warn('skip missing', job.src)
    return
  }

  const { dir, base } = variantDir(job.src)
  const outDir = path.join(publicDir, dir, 'responsive')
  await ensureDir(outDir)

  const meta = await sharp(abs).metadata()
  // Always emit every declared width filename so srcset never 404s.
  // withoutEnlargement keeps native size when the source is smaller.
  const widths = WIDTHS[job.kind]

  for (const width of widths) {
    const webpOut = path.join(outDir, `${base}-${width}.webp`)
    const avifOut = path.join(outDir, `${base}-${width}.avif`)

    await sharp(abs)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 4 })
      .toFile(webpOut)

    await sharp(abs)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 55, effort: 4 })
      .toFile(avifOut)

    console.log('wrote', path.relative(publicDir, webpOut), path.relative(publicDir, avifOut))
  }

  // Full-size WebP sibling for simple <picture> fallbacks
  const siblingWebp = path.join(publicDir, dir, `${base}.webp`)
  if (path.extname(job.src).toLowerCase() !== '.webp') {
    await sharp(abs)
      .rotate()
      .resize({ width: Math.min(meta.width ?? 1920, 1920), withoutEnlargement: true })
      .webp({ quality: 80, effort: 4 })
      .toFile(siblingWebp)
    console.log('wrote', path.relative(publicDir, siblingWebp))
  }
}

async function main() {
  for (const job of JOBS) {
    await processJob(job)
  }
  console.log('done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
