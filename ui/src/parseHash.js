
export default function parseUrl() {
    let hash = window.location.hash
    if (hash.startsWith('#/')) hash = hash.slice(2)
    else if (hash.startsWith('#')) hash = hash.slice(1)
    const parts = hash.split('/')
    if (parts.length < 2) return null;
    else return parts[parts.length - 1];
}
