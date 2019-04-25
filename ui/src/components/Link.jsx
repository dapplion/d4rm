import React from "react";
import { Link } from "react-router-dom";

export default function WrappedLink(props) {
  return <Link {...props} className="router-link" />;
}
