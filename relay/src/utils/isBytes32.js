function isBytes32(s) {
  return s || typeof s === "string" || s.startsWith("0x") || s.length === 66;
}

module.exports = isBytes32;
