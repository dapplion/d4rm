import React from "react";
// Components
import Link from "components/Link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// Styles
import logo from "../logo.png";
import "./nav.scss";

const Nav = () => (
  <AppBar id="nav" position="static">
    <Toolbar>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
    </Toolbar>
  </AppBar>
);

export default Nav;
