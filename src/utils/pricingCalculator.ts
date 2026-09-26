import { estimatorConfig } from '../data/pricing'
import type { EstimateBreakdown, EstimateInput, EstimatorConfig } from '../types/pricing'

const roundMoney = (value: number) => Math.round(value * 100) / 100

export function urgencyFor(days: number | null, config: EstimatorConfig = estimatorConfig) {
  if (days === null) return { multiplier: 1, label: '—' }
  const band = config.urgency.find((b) => days <= b.maxDays) ?? config.urgency[config.urgency.length - 1]
  return { multiplier: band.multiplier, label: band.label }
}

/**
 * Pure, synchronous estimator. Deterministic for a given input + config, so it can be
 * unit-tested and later swapped for `POST /api/estimates` without touching the UI.
 *
 * Neutral multipliers (1) are used for unchosen fields so the estimate stays useful
 * while the form is being filled; `isComplete` tells the UI whether it is final.
 */
export function calculateEstimate(
  input: EstimateInput,
  config: EstimatorConfig = estimatorConfig,
): EstimateBreakdown {
  const words = Math.min(Math.max(input.wordCount, config.words.min), config.words.max)

  const typeFactor = input.projectType ? config.projectTypeFactor[input.projectType] : 1
  const complexity = input.subject ? config.subjectComplexity[input.subject] : 1
  const serviceMultiplier = input.service ? config.serviceMultiplier[input.service] : 1
  const academicLevelMultiplier = input.academicLevel
    ? config.academicLevelMultiplier[input.academicLevel]
    : 1
  const urgency = urgencyFor(input.deadlineDays, config)

  const basePrice = roundMoney((words / 1000) * config.ratePerThousandWords * typeFactor * complexity)
  const raw = basePrice * serviceMultiplier * academicLevelMultiplier * urgency.multiplier
  const estimatedTotal = roundMoney(Math.max(raw, config.minimumCharge))
  const discount = input.applyFirstProjectDiscount
    ? roundMoney(estimatedTotal * config.firstProjectDiscount.rate)
    : 0

  return {
    basePrice,
    urgencyMultiplier: urgency.multiplier,
    urgencyLabel: urgency.label,
    serviceMultiplier,
    academicLevelMultiplier,
    complexity,
    estimatedTotal,
    discount,
    finalTotal: roundMoney(estimatedTotal - discount),
    isComplete: Boolean(
      input.academicLevel && input.projectType && input.service && input.subject && input.deadlineDays !== null,
    ),
    currency: config.currency,
  }
}

const formatters = new Map<string, Intl.NumberFormat>()

export function formatMoney(
  value: number,
  { currency = estimatorConfig.currency, locale = estimatorConfig.locale, cents = false } = {},
) {
  const key = `${locale}|${currency}|${cents}`
  let formatter = formatters.get(key)
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: cents ? 2 : 0,
      maximumFractionDigits: cents ? 2 : 0,
    })
    formatters.set(key, formatter)
  }
  return formatter.format(value)
}

export const formatNumber = (value: number) => new Intl.NumberFormat(estimatorConfig.locale).format(value)

/** Whole days from today (local) to an ISO date string; null if invalid or in the past. */
export function daysUntil(isoDate: string, now: Date = new Date()): number | null {
  if (!isoDate) return null
  const target = new Date(`${isoDate}T23:59:59`)
  if (Number.isNaN(target.getTime())) return null
  const diff = Math.ceil((target.getTime() - now.getTime()) / 86_400_000)
  return diff >= 1 ? diff : null
}
