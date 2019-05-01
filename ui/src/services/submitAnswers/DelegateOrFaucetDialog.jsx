import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
// Utils
import getUrlFaucet from "utils/getUrlFaucet";
import newTabProps from "utils/newTabProps";
// Styles
import "services/signIn/sign-in.scss";

function DelegateOrFaucetDialog({
  open,
  network,
  address,
  onClose,
  onDelegate,
  onFaucet
}) {
  return (
    <Dialog id="sign-in" {...{ open, onClose }}>
      <DialogTitle className="title">Not enough funds</DialogTitle>

      <DialogContent style={{ maxWidth: "18.5rem", fontSize: "0.875rem" }}>
        <strong>Delegate</strong> to a relay that will pay the transaction
        costs, or
        <br />
        <strong>Get funds</strong> for free from a public faucet
      </DialogContent>

      <DialogContent className="content">
        <Button fullWidth variant="contained" onClick={onDelegate}>
          Delegate
        </Button>

        <div>OR</div>

        <a
          href={getUrlFaucet(network, address)}
          {...newTabProps}
          style={{ width: "100%" }}
        >
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={onFaucet}
          >
            Get funds
          </Button>
        </a>
      </DialogContent>
    </Dialog>
  );
}

DelegateOrFaucetDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  network: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  onDelegate: PropTypes.func.isRequired,
  onFaucet: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default DelegateOrFaucetDialog;
