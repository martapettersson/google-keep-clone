import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
	return (
        <ul className="navbar">
            <li><Link to={`/home/`}><img className="menu-logo" src="/logo.png" alt="Note Logo"/></Link></li>
			<li><Link to={`/notes/`}>Notes</Link></li>
        </ul>
	);
}
