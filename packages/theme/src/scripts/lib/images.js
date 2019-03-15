/**
 * Image Helper Functions
 * -----------------------------------------------------------------------------
 * A collection of functions that help with basic image operations.
 *
 */

/**
 * Preloads an image in memory and uses the browsers cache to store it until needed.
 *
 * @param {Array} images - A list of image urls
 * @param {String} size - A shopify image size attribute
 */
export function preload (images, size) {
  if (typeof images === 'string') {
    images = [images]
  }

  for (var i = 0; i < images.length; i++) {
    var image = images[i]
    loadImage(getSizedImageUrl(image, size))
  }
}

/**
 * Loads and caches an image in the browsers cache.
 * @param {string} path - An image url
 */
export function loadImage (path) {
  /* eslint-disable */
  new Image().src = path
  /* eslint-enable */
}

/**
 * Find the Shopify image attribute size
 *
 * @param {string} src
 * @returns {null}
 */
export function imageSize (src) {
  /* eslint-disable */
  var match = src.match(/.+_((?:pico|icon|thumb|small|compact|medium|large|grande)|\d{1,4}x\d{0,4}|x\d{1,4})[_\.@]/)
  /* esling-enable */

  if (match) {
    return match[1]
  } else {
    return null
  }
}

/**
 * Adds a Shopify size attribute to a URL
 *
 * @param src
 * @param size
 * @returns {*}
 */
export function getSizedImageUrl (src, size) {
  if (size === null) {
    return src
  }

  if (size === 'master') {
    return removeProtocol(src)
  }

  var match = src.match(/\.(jpg|jpeg|gif|png|bmp|bitmap|tiff|tif)(\?v=\d+)?$/i)

  if (match) {
    var prefix = src.split(match[0])
    var suffix = match[0]

    return removeProtocol(prefix[0] + '_' + size + suffix)
  } else {
    return null
  }
}

export function removeProtocol (path) {
  return path.replace(/http(s)?:/, '')
}
