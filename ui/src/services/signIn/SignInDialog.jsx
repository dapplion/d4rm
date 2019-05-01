import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
// Helpers
import * as localAccount from "./localAccount";
import * as metamaskAccount from "./metamaskAccount";
// Styles
import "./sign-in.scss";
import logo from "../../logo.png";

function SignInDialog({ open, onAccount, onClose }) {
  const metamaskStatus = metamaskAccount.status();
  const localAccountStatus = localAccount.status();

  async function onLocalAccount() {
    try {
      onAccount(localAccount.get());
    } catch (e) {
      console.log(`Error getting local account: ${e.stack}`);
    }
  }

  async function onMetamask() {
    try {
      onAccount(metamaskAccount.get());
    } catch (e) {
      console.log(`Error getting metamask account: ${e.stack}`);
    }
  }

  return (
    <Dialog id="sign-in" {...{ open, onClose }}>
      <DialogTitle className="title">Log in</DialogTitle>

      <DialogContent className="content">
        <img src={logo} alt="logo" className="logo" />

        <Button fullWidth variant="contained" onClick={onLocalAccount}>
          {localAccountStatus.available ? "Use" : "Create"} local account
        </Button>

        <div>OR</div>

        <div>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={!metamaskStatus.available}
            onClick={onMetamask}
          >
            Continue with Metamask
          </Button>
          {!metamaskStatus.available && (
            <div className="error">{metamaskStatus.msg}</div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

SignInDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onAccount: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SignInDialog;
