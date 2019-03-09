import React from "react";
import { Link } from "react-router-dom";
import logo from "./logo.png"
import parseHash from './parseHash' 

const links = [
    // 'create',
    // 'share',
    'results',
    'form'
]

const Nav = () => {
    const hash = parseHash()
    return (
        <nav className="navbar navbar-expand-lg bg-secondary fixed-top text-uppercase" id="mainNav">
            <div className="container">
            <img src={logo} style={{width: '130px'}} alt="logo"></img>
            <button className="navbar-toggler navbar-toggler-right text-uppercase bg-primary text-white rounded" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                Menu
                <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarResponsive">
                <ul className="navbar-nav ml-auto">
                    {links.map(link => 
                    <li key={link} className="nav-item mx-0 mx-lg-1">
                        <Link className="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" to={`/${link}${hash ? '/' + hash : ''}`}>{link}</Link>
                    </li>)}
                </ul>
            </div>
            </div>
        </nav>
    );
}

export default Nav;
