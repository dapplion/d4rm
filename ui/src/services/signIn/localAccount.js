import Web3 from "web3";
import { LOCAL_ACCOUNT } from "services/localStorageIds";

/**
 * @returns {object} status = {
 *   available: {bool}
 *   msg: {string} "Error description"
 * }
 */
export function status() {
  if (localStorage.getItem(LOCAL_ACCOUNT)) {
    return { available: true };
  } else {
    return { available: false };
  }
}

/**
 * @returns {object} account = {
 *   address: {string} "0x1234abcd...",
 *   privateKey: {string} "0x9876fedc...",
 *   isMetamask: {bool} false
 * }
 */
export function get() {
  const accountString = localStorage.getItem(LOCAL_ACCOUNT);
  const account = accountString ? JSON.parse(accountString) : create();
  return {
    ...account,
    isMetamask: false
  };
}

// Utils

function create() {
  const web3 = new Web3();
  const localAccount = web3.eth.accounts.create();
  const account = {
    address: localAccount.address,
    privateKey: localAccount.privateKey
  };
  localStorage.setItem(LOCAL_ACCOUNT, JSON.stringify(account));
  return account;
}
