import { describe, it, expect } from 'vitest'
import { calculateLifePath, validateBirthDate, formatLifePathResult } from '../utils/numerology'

describe('numerology', () => {
  it('calculates life path number', () => {
    expect(calculateLifePath('1990-05-15')).toBe(3)
    expect(calculateLifePath('2000-01-10')).toBe(4)
  })

  it('validates birth date', () => {
    expect(validateBirthDate('')).toMatch(/Informe/)
    expect(validateBirthDate('1990-05-15')).toBeNull()
  })

  it('formats life path result', () => {
    const result = formatLifePathResult(7)
    expect(result.title).toBe('O Buscador')
    expect(result.number).toBe(7)
  })
})
