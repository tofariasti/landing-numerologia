export const WHATSAPP_NUMBER = '5551991213724'

export const PRACTITIONER = {
  name: 'Céu & Números',
  title: 'Numerologia e mapa astral',
  tagline: 'Os números revelam o caminho da sua alma',
  city: 'Porto Alegre, RS',
  address: 'Atendimento presencial e online',
  email: 'contato@ceuenumeros.demo',
  phone: '(51) 99121-3724',
  hours: 'Seg–Sex: 9h–18h',
  experienceYears: 10,
  consultations: 1800,
  mapsDelivered: 950,
} as const

export const STORAGE_KEYS = {
  clients: 'numerologia-demo-clients',
  services: 'numerologia-demo-services',
  theme: 'numerologia-demo-theme',
} as const

export const SITE_URL = 'https://tofariasti.github.io/landing-numerologia/site/'

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const IMAGES = {
  hero: asset('images/hero.jpg'),
  heroCard: asset('images/hero-card.jpg'),
  about: asset('images/about.jpg'),
  services: asset('images/services.jpg'),
  methodology: asset('images/methodology.jpg'),
  og: `${SITE_URL}images/og-image.jpg`,
} as const
