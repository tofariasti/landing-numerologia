/**
 * Download astrology-themed photos from Unsplash.
 * Run: node scripts/download-images.mjs
 */
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const outDir = join(__dirname, '../public/images')

/** @type {Record<string, { slug: string; w?: number; desc: string }>} */
const IMAGES = {
  'hero.jpg': {
    slug: '1419242903514-623260b83f33',
    w: 1600,
    desc: 'Céu noturno estrelado com via láctea',
  },
  'hero-card.jpg': {
    slug: '1462331940022-91e8e4d9d874',
    w: 900,
    desc: 'Mesa com mapa astral, velas e cristais',
  },
  'about.jpg': {
    slug: '1446776877081-d282a29fb236',
    w: 1200,
    desc: 'Consulta acolhedora com mapa astral sobre a mesa',
  },
  'services.jpg': {
    slug: '1464806836000-4682859d7f38',
    w: 1200,
    desc: 'Constelações e céu noturno sobre montanhas',
  },
  'methodology.jpg': {
    slug: '1502134249126-9f3755a50d78',
    w: 1200,
    desc: 'Mapa do céu noturno projetado em tela',
  },
  'og-image.jpg': {
    slug: '1419242903514-623260b83f33',
    w: 1200,
    desc: 'Céu estrelado — imagem OG',
  },
}

function unsplashUrl(slug, w = 1200) {
  return `https://images.unsplash.com/photo-${slug}?w=${w}&q=85&auto=format&fit=crop`
}

await mkdir(outDir, { recursive: true })

const manifest = {}

for (const [filename, { slug, w, desc }] of Object.entries(IMAGES)) {
  const url = unsplashUrl(slug, w)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed ${filename} (${slug}): HTTP ${res.status}`)
  const buf = Buffer.from(await res.arrayBuffer())
  await writeFile(join(outDir, filename), buf)
  manifest[filename] = { unsplashSlug: slug, description: desc, bytes: buf.length }
  console.log(`✓ ${filename} — ${desc}`)
}

await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n')
console.log('\nDone — astrology-themed images downloaded.')
