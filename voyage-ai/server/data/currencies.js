/**
 * Voyage AI — Centralized Currency Registry
 * ===========================================
 *
 * Single source of truth for every currency used by the destination catalog.
 * Adding a new currency (for a new destination) only requires one entry here
 * (code -> { symbol, name, usdRate, decimals }) and setting `currency` on the
 * destination in server/data/destinationCatalog.js.
 *
 * Destination data is served by the API with `currency`, `currencySymbol`,
 * `currencyName` and `currencyUsdRate` attached (see enrichWithCurrency below),
 * so the client can format any price in the destination's local currency
 * without needing its own rate table.
 *
 * `usdRate` = how many units of local currency equal 1 USD (approximate).
 * The user's own account/budget values are NEVER converted — they stay USD.
 */

const currencies = {
  USD: { symbol: '$', name: 'US Dollar', usdRate: 1, decimals: 2, prefix: true },
  EUR: { symbol: '€', name: 'Euro', usdRate: 0.92, decimals: 2, prefix: true },
  GBP: { symbol: '£', name: 'British Pound', usdRate: 0.79, decimals: 2, prefix: true },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', usdRate: 0.88, decimals: 2, prefix: true },
  NOK: { symbol: 'kr', name: 'Norwegian Krone', usdRate: 11.1, decimals: 0, prefix: false },
  ISK: { symbol: 'kr', name: 'Icelandic Króna', usdRate: 148, decimals: 0, prefix: false },
  CZK: { symbol: 'Kč', name: 'Czech Koruna', usdRate: 23.5, decimals: 0, prefix: true },
  JPY: { symbol: '¥', name: 'Japanese Yen', usdRate: 152, decimals: 0, prefix: true },
  CNY: { symbol: '¥', name: 'Chinese Yuan', usdRate: 7.25, decimals: 0, prefix: true },
  KRW: { symbol: '₩', name: 'South Korean Won', usdRate: 1430, decimals: 0, prefix: true },
  INR: { symbol: '₹', name: 'Indian Rupee', usdRate: 84, decimals: 0, prefix: true },
  THB: { symbol: '฿', name: 'Thai Baht', usdRate: 36, decimals: 0, prefix: true },
  IDR: { symbol: 'Rp', name: 'Indonesian Rupiah', usdRate: 16200, decimals: 0, prefix: true },
  MYR: { symbol: 'RM', name: 'Malaysian Ringgit', usdRate: 4.7, decimals: 0, prefix: true },
  SGD: { symbol: 'S$', name: 'Singapore Dollar', usdRate: 1.35, decimals: 2, prefix: true },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', usdRate: 3.67, decimals: 2, prefix: true },
  MVR: { symbol: 'MVR', name: 'Maldivian Rufiyaa', usdRate: 15.4, decimals: 2, prefix: true },
  VND: { symbol: '₫', name: 'Vietnamese Dong', usdRate: 25400, decimals: 0, prefix: true },
  KHR: { symbol: '៛', name: 'Cambodian Riel', usdRate: 4100, decimals: 0, prefix: true },
  LKR: { symbol: 'Rs', name: 'Sri Lankan Rupee', usdRate: 305, decimals: 0, prefix: true },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', usdRate: 1.36, decimals: 2, prefix: true },
  MXN: { symbol: 'MX$', name: 'Mexican Peso', usdRate: 20, decimals: 0, prefix: true },
  PEN: { symbol: 'S/', name: 'Peruvian Sol', usdRate: 3.75, decimals: 2, prefix: true },
  BRL: { symbol: 'R$', name: 'Brazilian Real', usdRate: 5.5, decimals: 0, prefix: true },
  ARS: { symbol: '$', name: 'Argentine Peso', usdRate: 1275, decimals: 0, prefix: true },
  CLP: { symbol: '$', name: 'Chilean Peso', usdRate: 970, decimals: 0, prefix: true },
  COP: { symbol: '$', name: 'Colombian Peso', usdRate: 4200, decimals: 0, prefix: true },
  BOB: { symbol: 'Bs', name: 'Bolivian Boliviano', usdRate: 6.9, decimals: 0, prefix: true },
  ZAR: { symbol: 'R', name: 'South African Rand', usdRate: 18.5, decimals: 0, prefix: true },
  TZS: { symbol: 'TSh', name: 'Tanzanian Shilling', usdRate: 2900, decimals: 0, prefix: true },
  MAD: { symbol: 'MAD', name: 'Moroccan Dirham', usdRate: 10, decimals: 0, prefix: true },
  EGP: { symbol: 'E£', name: 'Egyptian Pound', usdRate: 49, decimals: 0, prefix: true },
  SCR: { symbol: '₨', name: 'Seychellois Rupee', usdRate: 13.8, decimals: 0, prefix: true },
  AUD: { symbol: 'A$', name: 'Australian Dollar', usdRate: 1.55, decimals: 2, prefix: true },
  NZD: { symbol: 'NZ$', name: 'New Zealand Dollar', usdRate: 1.68, decimals: 2, prefix: true },
  FJD: { symbol: 'FJ$', name: 'Fijian Dollar', usdRate: 2.26, decimals: 2, prefix: true },
  XPF: { symbol: '₣', name: 'CFP Franc', usdRate: 110, decimals: 0, prefix: false },
};

// Fallback used whenever a code is unknown or absent (keeps USD the safe default).
const FALLBACK = { code: 'USD', symbol: '$', name: 'US Dollar', usdRate: 1, decimals: 2, prefix: true };

function getCurrency(code) {
  if (!code) return FALLBACK;
  const entry = currencies[code];
  if (!entry) {
    console.warn(`[currencies] Unknown currency code "${code}" — falling back to USD`);
    return FALLBACK;
  }
  return { code, ...entry };
}

/**
 * Attaches currency metadata to a destination (or any object carrying a
 * `currency` code, e.g. a populated trip destination) so the payload is
 * self-sufficient: `currency`, `currencySymbol`, `currencyName`,
 * `currencyUsdRate`. Mutates and returns the same object.
 */
function enrichWithCurrency(obj) {
  if (!obj || typeof obj === 'string') return obj;
  const meta = getCurrency(obj.currency);
  obj.currencySymbol = meta.symbol;
  obj.currencyName = meta.name;
  obj.currencyUsdRate = meta.usdRate;
  return obj;
}

module.exports = { currencies, getCurrency, enrichWithCurrency };