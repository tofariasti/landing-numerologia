export type ZodiacSign =
  | 'aries'
  | 'touro'
  | 'gemeos'
  | 'cancer'
  | 'leao'
  | 'virgem'
  | 'libra'
  | 'escorpiao'
  | 'sagitario'
  | 'capricornio'
  | 'aquario'
  | 'peixes'

export type Element = 'fogo' | 'terra' | 'ar' | 'agua'
export type Modality = 'cardinal' | 'fixo' | 'mutavel'

export interface SignMeta {
  sign: ZodiacSign
  label: string
  symbol: string
  element: Element
  modality: Modality
  dates: string
}

export const SIGNS: SignMeta[] = [
  { sign: 'aries', label: 'Áries', symbol: '♈', element: 'fogo', modality: 'cardinal', dates: '21 mar – 19 abr' },
  { sign: 'touro', label: 'Touro', symbol: '♉', element: 'terra', modality: 'fixo', dates: '20 abr – 20 mai' },
  { sign: 'gemeos', label: 'Gêmeos', symbol: '♊', element: 'ar', modality: 'mutavel', dates: '21 mai – 20 jun' },
  { sign: 'cancer', label: 'Câncer', symbol: '♋', element: 'agua', modality: 'cardinal', dates: '21 jun – 22 jul' },
  { sign: 'leao', label: 'Leão', symbol: '♌', element: 'fogo', modality: 'fixo', dates: '23 jul – 22 ago' },
  { sign: 'virgem', label: 'Virgem', symbol: '♍', element: 'terra', modality: 'mutavel', dates: '23 ago – 22 set' },
  { sign: 'libra', label: 'Libra', symbol: '♎', element: 'ar', modality: 'cardinal', dates: '23 set – 22 out' },
  { sign: 'escorpiao', label: 'Escorpião', symbol: '♏', element: 'agua', modality: 'fixo', dates: '23 out – 21 nov' },
  { sign: 'sagitario', label: 'Sagitário', symbol: '♐', element: 'fogo', modality: 'mutavel', dates: '22 nov – 21 dez' },
  { sign: 'capricornio', label: 'Capricórnio', symbol: '♑', element: 'terra', modality: 'cardinal', dates: '22 dez – 19 jan' },
  { sign: 'aquario', label: 'Aquário', symbol: '♒', element: 'ar', modality: 'fixo', dates: '20 jan – 18 fev' },
  { sign: 'peixes', label: 'Peixes', symbol: '♓', element: 'agua', modality: 'mutavel', dates: '19 fev – 20 mar' },
]

const ELEMENT_LABELS: Record<Element, string> = {
  fogo: 'Fogo',
  terra: 'Terra',
  ar: 'Ar',
  agua: 'Água',
}

const MODALITY_LABELS: Record<Modality, string> = {
  cardinal: 'Cardinal',
  fixo: 'Fixo',
  mutavel: 'Mutável',
}

export function getSignMeta(sign: ZodiacSign): SignMeta {
  return SIGNS.find((s) => s.sign === sign) ?? SIGNS[0]
}

export function getSunSign(dateStr: string): ZodiacSign | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateStr)
  if (!match) return null
  const month = Number(match[2])
  const day = Number(match[3])
  if (month < 1 || month > 12 || day < 1 || day > 31) return null

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'aries'
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'touro'
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'gemeos'
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'cancer'
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'leao'
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'virgem'
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'libra'
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'escorpiao'
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'sagitario'
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'capricornio'
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'aquario'
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return 'peixes'
  return null
}

export function validateBirthDate(dateStr: string): string | null {
  if (!dateStr.trim()) return 'Informe sua data de nascimento.'
  if (!getSunSign(dateStr)) return 'Data inválida. Use o formato correto.'
  const year = Number(dateStr.slice(0, 4))
  const currentYear = new Date().getFullYear()
  if (year < 1920 || year > currentYear) return `Ano deve estar entre 1920 e ${currentYear}.`
  return null
}

export function formatSignResult(sign: ZodiacSign) {
  const meta = getSignMeta(sign)
  return {
    ...meta,
    elementLabel: ELEMENT_LABELS[meta.element],
    modalityLabel: MODALITY_LABELS[meta.modality],
  }
}
