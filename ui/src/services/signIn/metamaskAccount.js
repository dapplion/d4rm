const ethereum = window.ethereum;

/**
 * @returns {object} status = {
 *   available: {bool}
 *   msg: {string} "Error description"
 * }
 */
export function status() {
  if (typeof ethereum !== "undefined") {
    if (!ethereum.isMetaMask || !ethereum.enable) {
      return { available: false, msg: "Metamask not installed" };
    } else {
      return { available: true };
    }
  } else {
    // Only modern Metamask versions are supported
    return { available: false, msg: "No Metamask detect" };
  }
}

/**
 * @returns {object} account = {
 *   address: {string} "0x1234abcd...",
 *   isMetamask: {bool} true
 * }
 */
export async function get() {
  /**
   * If metamask is locked, user will be promped to enter the password
   * If the user cancels the unlocking, this promise will never resolve
   * Once the user unlocks, the user will be prompted to authorize
   * - If accepts, the promise returns: ["0x012-userAccount-"]
   * - If refuses, the promise rejects:
   */
  try {
    // ethereum.enable has been checked to exist
    const accounts = await ethereum.enable();
    return {
      address: accounts[0],
      isMetamask: true
    };
  } catch (reason) {
    if (reason === "User rejected provider access")
      throw Error("User rejected provider access");
    else throw Error(reason);
  }
}
