/**
 * Download verified numerology / cosmos-themed photos from Unsplash.
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
    slug: '1635070041078-e363dbe005cb',
    w: 1600,
    desc: 'Galáxia espiral em tons violeta e dourado',
  },
  'hero-card.jpg': {
    slug: '1502134249126-9f3755a50d78',
    w: 900,
    desc: 'Horizonte urbano sob céu profundo com estrelas',
  },
  'about.jpg': {
    slug: '1682687220063-4742bd7fd538',
    w: 1200,
    desc: 'Aurora boreal refletindo luz mística no céu',
  },
  'services.jpg': {
    slug: '1559827260-dc66d52bef19',
    w: 1200,
    desc: 'Montanhas silhuetadas contra céu estrelado',
  },
  'methodology.jpg': {
    slug: '1451187580459-43490279c0fa',
    w: 1200,
    desc: 'Terra e cosmos — perspectiva do espaço sideral',
  },
  'og-image.jpg': {
    slug: '1677442136019-21780ecad995',
    w: 1200,
    desc: 'Via láctea — imagem OG para compartilhamento',
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
console.log('\nDone — numerology-themed images downloaded.')
