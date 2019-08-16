module.exports = function sanitize (p) {
  if (!p) return null
  if (/^\//.test(p)) {
    return sanitize(p.substr(1))
  }
  if (!/^(layout|content|frame|pages|templates|sections|snippets|config|locales|assets)/.test(p)) {
    return sanitize(p.split('/').slice(1).join('/'))
  }
  return p
}
