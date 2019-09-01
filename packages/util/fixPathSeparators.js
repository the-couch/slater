const path = require("path")

module.exports = fixPathSeparators = string => string.split(path.sep).join("/")
