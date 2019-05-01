import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import SignInDialog from "./SignInDialog";

/**
 * The goal of this module is to provide return a valid address,
 * so the user can interact with the Ethereum blockchain.
 *
 * This action will be shown as a normal Sign In process, for UX
 */

let root;

/**
 * @returns {object} account = {
 *   address: {string} "0x1234abcd...",
 *   privateKey: {string} "0x9876fedc...", (only on localAccount)
 *   isMetamask: {bool} true / false
 * }
 */
export default function signIn() {
  if (!root) {
    // Create the root-modal element
    root = document.createElement("div");
    document.body.appendChild(root);
  }
  const close = () => unmountComponentAtNode(root);
  // render (or re-render) and mount the dialog
  return new Promise((resolve, reject) => {
    render(
      <SignInDialog
        open={true}
        onAccount={account => {
          close();
          resolve(account);
        }}
        onClose={() => {
          close();
          reject(Error("User closed the signIn window"));
        }}
      />,
      root
    );
  });
}

window.signIn = signIn;
