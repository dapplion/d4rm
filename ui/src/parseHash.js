
export default function parseUrl() {
    let hash = window.location.hash
    if (hash.startsWith('#/')) hash = hash.slice(2)
    else if (hash.startsWith('#')) hash = hash.slice(1)
    return hash
}
