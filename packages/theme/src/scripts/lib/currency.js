/**
 * Currency Helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions that help with currency formatting
 *
 * Current contents
 * - formatMoney - Takes an amount in cents and returns it as a formatted dollar value.
 *
 */

/**
 * Format money values based on your shop currency settings
 * @param  {Number|string} cents - value in cents or dollar amount e.g. 300 cents
 * or 3.00 dollars
 * @param  {String} format - shop money_format setting
 * @return {String} value - formatted value
 */

/* eslint-disable */

export function formatMoney (cents, format = '${{amount}}') {
  if (typeof cents === 'string') {
    cents = cents.replace('.', '')
  }

  let value = ''
  const placeholderRegex = /\{\{\s*(\w+)\s*\}\}/

  function formatWithDelimiters (number, precision, thousands, decimal) {
    precision = precision || 2
    thousands = thousands || ','
    decimal = decimal || '.'

    if (isNaN(number) || number == null) {
      return 0
    }

    number = (number / 100.0).toFixed(precision)

    const parts = number.split('.')
    const dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands)
    const centsAmount = parts[1] ? (decimal + parts[1]) : ''

    return dollarsAmount + centsAmount
  }

  switch (format.match(placeholderRegex)[1]) {
    case 'amount':
      value = formatWithDelimiters(cents, 2)
      break
    case 'amount_no_decimals':
      value = formatWithDelimiters(cents, 0)
      break
    case 'amount_with_space_separator':
      value = formatWithDelimiters(cents, 2, ' ', '.')
      break
    case 'amount_no_decimals_with_comma_separator':
      value = formatWithDelimiters(cents, 0, ',', '.')
      break
    case 'amount_no_decimals_with_space_separator':
      value = formatWithDelimiters(cents, 0, ' ')
      break
  }

  return format.replace(placeholderRegex, value)
}
