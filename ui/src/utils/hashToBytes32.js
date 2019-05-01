import CID from "cids";

/**
 * @param {string} IPFS encoded hash: "Qma7dh322..."
 * @returns {string} bytes32: "0x3011ab30911ba..."
 */
export default function hashToBytes32(hash) {
  if (!hash) throw Error("hash must be defined");

  const cid = new CID(hash);
  return (
    "0x" +
    cid.multihash
      .slice(2, 64)
      .toString("hex")
      .padStart(64, "0")
  );
}
