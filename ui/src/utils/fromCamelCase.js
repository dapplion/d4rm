export default function fromCamelCase(s = "") {
  return s.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return i === 0 ? v.toUpperCase() : " " + v.toLowerCase();
  });
}
