/**
 * Voyage AI — Client-side currency formatting helpers
 * ====================================================
 *
 * Destination & travel costs are stored in USD and served by the API together
 * with the destination's `currency`, `currencySymbol`, `currencyName` and
 * `currencyUsdRate` (see server/data/currencies.js). These helpers convert a
 * USD amount to the local currency and format it naturally (e.g. ¥12,000 /
 * ₹8,500 / £120 / €150 / A$200).
 *
 * The user's own account/budget values (wallet, dashboard aggregates, budget
 * inputs) are ALWAYS USD and use formatUsd() — never converted.
 */

// Numbers are rounded to whole units: the catalog stores whole-dollar prices
// and the design shows prices without decimals (¥12,000, not ¥12,000.50).
const ROUND = 0;

/**
 * Format a USD-denominated amount in the destination's local currency.
 *
 * @param {number} usdValue  Amount stored in USD.
 * @param {{code?:string, symbol?:string, usdRate?:number}} currency
 *        Destination currency metadata (from the API: `currency`,
 *        `currencySymbol`, `currencyUsdRate`) — OR a fallback object. When a
 *        truthy code is given but no symbol/rate, defaults are applied.
 * @returns {string} e.g. "¥12,000", "₹8,500", "A$200"
 */
export function formatCurrency(usdValue, currency = {}) {
  const usd = Number(usdValue) || 0;
  // Accept either {code,symbol,usdRate} or a full destination object with {currency,currencySymbol,currencyUsdRate}
  const code = currency.code || currency.currency || 'USD';
  const rate = Number(currency.usdRate || currency.currencyUsdRate) || 1;
  const symbol = currency.symbol || currency.currencySymbol || defaultSymbol(code);

  const local = Math.round(usd * rate);
  const amount = local.toLocaleString('en-US', { maximumFractionDigits: ROUND });

  // A few currencies conventionally place the symbol after the amount.
  const isSuffix = SUFFIX_SYMBOLS.includes(code);
  if (isSuffix) return `${amount} ${symbol}`;
  return `${symbol}${amount}`;
}

/**
 * Build the currency metadata object expected by formatCurrency from a
 * destination or populated trip-destination object as served by the API.
 * Falls back to USD when the object has no `currency` (e.g. a custom trip
 * that isn't tied to a catalog destination) or no enriched fields.
 *
 * @param {{currency?:string, currencySymbol?:string, currencyUsdRate?:number}|null} obj
 */
export function currencyOf(obj) {
  const code = obj?.currency || 'USD';
  return {
    code,
    symbol: obj?.currencySymbol,
    usdRate: obj?.currencyUsdRate,
  };
}

/**
 * Format an amount as plain USD for account / wallet / budget surfaces that
 * must always stay in USD (e.g. "$5,000").
 */
export function formatUsd(usdValue) {
  const usd = Math.round(Number(usdValue) || 0);
  return `$${usd.toLocaleString('en-US')}`;
}

// Symbols used when the API omits the symbol (e.g. a client-side fallback).
const DEFAULT_SYMBOLS = {
  USD: '$', EUR: '€', GBP: '£', JPY: '¥', CNY: '¥', INR: '₹', KRW: '₩',
  THB: '฿', IDR: 'Rp', MYR: 'RM', SGD: 'S$', AED: 'د.إ', CAD: 'C$',
  AUD: 'A$', NZD: 'NZ$', MXN: 'MX$', BRL: 'R$', ZAR: 'R', VND: '₫',
  CHF: 'CHF', NOK: 'kr', XPF: '₣',
};

function defaultSymbol(code) {
  return DEFAULT_SYMBOLS[code] || code;
}

const SUFFIX_SYMBOLS = ['NOK', 'ISK', 'XPF'];