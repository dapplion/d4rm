import ipfsClient from 'ipfs-http-client';

const ipfs = ipfsClient('ipfs.infura.io', '5001', { protocol: 'https' });
window.ipfs = ipfs;

async function add(obj) {
    const string = JSON.stringify(obj);
    const content = ipfs.types.Buffer.from(string);
    const results = await ipfs.add(content);
    return results[0].hash; // "Qm...WW"
}

async function cat(hash) {
    const content = await ipfs.cat(hash);
    const string = content.toString('utf8');
    return JSON.parse(string);
}

function isHash(hash) {
    return ipfs.util.isIPFS.cid(hash);
}

window.add = add;
window.cat = cat;

export default { add, cat, isHash };
