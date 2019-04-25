import React from "react";
import Paper from "@material-ui/core/Paper";

export default function Section(props) {
  return (
    <>
      <div className="paper-section-topline" />
      <Paper
        {...props}
        elevation={1}
        className={`paper-section ${props.className}`}
      />
    </>
  );
}
