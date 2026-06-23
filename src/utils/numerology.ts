export function reduceToSingleDigit(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split('')
      .reduce((sum, d) => sum + Number(d), 0)
  }
  return n
}

export function calculateLifePath(birthDate: string): number | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate)
  if (!match) return null
  const digits = birthDate.replace(/-/g, '').split('').map(Number)
  if (digits.some((d) => Number.isNaN(d))) return null
  const sum = digits.reduce((a, b) => a + b, 0)
  return reduceToSingleDigit(sum)
}

export function validateBirthDate(dateStr: string): string | null {
  if (!dateStr.trim()) return 'Informe sua data de nascimento.'
  if (!calculateLifePath(dateStr)) return 'Data inválida.'
  const year = Number(dateStr.slice(0, 4))
  const currentYear = new Date().getFullYear()
  if (year < 1920 || year > currentYear) return `Ano deve estar entre 1920 e ${currentYear}.`
  return null
}

const INTERPRETATIONS: Record<number, { title: string; text: string }> = {
  1: { title: 'O Líder', text: 'Independência, pioneirismo e iniciativa. Você veio para abrir caminhos e confiar na própria voz.' },
  2: { title: 'O Diplomata', text: 'Cooperação, sensibilidade e parcerias. Seu caminho passa por equilíbrio, escuta e harmonia.' },
  3: { title: 'O Comunicador', text: 'Criatividade, expressão e alegria. Arte, palavra e conexão social iluminam sua jornada.' },
  4: { title: 'O Construtor', text: 'Disciplina, estrutura e trabalho. Bases sólidas e constância trazem realizações duradouras.' },
  5: { title: 'O Aventureiro', text: 'Liberdade, mudança e experiência. Versatilidade e curiosidade guiam seu crescimento.' },
  6: { title: 'O Cuidador', text: 'Responsabilidade, família e serviço. Amor prático e senso de dever definem seu propósito.' },
  7: { title: 'O Buscador', text: 'Espiritualidade, análise e introspecção. Profundidade interior e sabedoria são seus dons.' },
  8: { title: 'O Realizador', text: 'Poder, abundância e manifestação. Ambição consciente e ética constroem legado material.' },
  9: { title: 'O Humanitário', text: 'Compaixão, conclusão e entrega. Você veio para servir causas maiores que si.' },
  11: { title: 'O Inspirador', text: 'Intuição elevada e inspiração. Número mestre — liderança espiritual e visão ampliada.' },
  22: { title: 'O Mestre Construtor', text: 'Visão grandiosa com execução prática. Potencial para impactar muitas vidas.' },
  33: { title: 'O Mestre Curador', text: 'Amor incondicional e ensino. Serviço compassivo em escala ampla.' },
}

export function formatLifePathResult(number: number) {
  const data = INTERPRETATIONS[number] ?? {
    title: `Caminho ${number}`,
    text: 'Número com energia única no seu mapa numerológico.',
  }
  return { number, ...data }
}
