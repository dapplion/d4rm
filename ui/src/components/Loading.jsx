import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./loading.scss";

const Loading = () => (
  <div className="loading">
    <div className="text">Loading...</div>
    <CircularProgress />
  </div>
);

export default Loading;
