import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import DelegateOrFaucetDialog from "./DelegateOrFaucetDialog";

let root;
export default function delegateOrFaucetDialog({ network, address }) {
  if (!root) {
    // Create the root-modal element
    root = document.createElement("div");
    document.body.appendChild(root);
  }
  const close = () => unmountComponentAtNode(root);
  // render (or re-render) and mount the dialog
  return new Promise((resolve, reject) => {
    render(
      <DelegateOrFaucetDialog
        open={true}
        {...{ network, address }}
        onDelegate={() => {
          close();
          resolve(true);
        }}
        onFaucet={() => {
          close();
          reject(Error("Awaiting user to get funds at the faucet"));
        }}
        onClose={() => {
          close();
          reject(Error("User closed the dialog window"));
        }}
      />,
      root
    );
  });
}
