/**
 * Utility helpers
 * -----------------------------------------------------------------------------
 * A collection of useful functions for dealing with arrays and objects
 *
 * @namespace utils
 */

/**
 * Return an object from an array of objects that matches the provided key and value
 *
 * @param {array} array - Array of objects
 * @param {string} key - Key to match the value against
 * @param {string} value - Value to get match of
 */
export function findInstance (array, key, value) {
  for (let i = 0; i < array.length; i++) {
    if (array[i][key] === value) {
      return array[i]
    }
  }
}

/**
 * Remove an object from an array of objects by matching the provided key and value
 *
 * @param {array} array - Array of objects
 * @param {string} key - Key to match the value against
 * @param {string} value - Value to get match of
 */
export function removeInstance (array, key, value) {
  let i = array.length

  while (i--) {
    if (array[i][key] === value) {
      array.splice(i, 1)
      break
    }
  }

  return array
}

/**
 * _.compact from lodash
 * Remove empty/false items from array
 * Source: https://github.com/lodash/lodash/blob/master/compact.js
 *
 * @param {array} array
 */
export function compact (array) {
  let index = -1
  let resIndex = 0
  const length = array == null ? 0 : array.length
  const result = []

  while (++index < length) {
    const value = array[index]

    if (value) {
      result[resIndex++] = value
    }
  }

  return result
}

/**
 * _.defaultTo from lodash
 * Checks `value` to determine whether a default value should be returned in
 * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
 * or `undefined`.
 * Source: https://github.com/lodash/lodash/blob/master/defaultTo.js
 *
 * @param {*} value - Value to check
 * @param {*} defaultValue - Default value
 * @returns {*} - Returns the resolved value
 */
export function defaultTo (value, defaultValue) {
  return (value == null) ? defaultValue : value
}
