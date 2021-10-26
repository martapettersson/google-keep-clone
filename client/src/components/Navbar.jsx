import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link, useHistory } from "react-router-dom";

export default function Navbar() {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = () => {
		localStorage.removeItem("tkn");
		setUser(null);
		history.push("/");
	};

	return (
		<ul className="navbar">
			<li>
				<Link to={!user ? "/" : "/notes"}>
					<img className="menu-logo" src="/logo.png" alt="Note Logo" />
				</Link>
			</li>
			{user && (
				<>
					<li>
						<Link to="/notes">Notes</Link>
					</li>
					<li>
						<Link to="/" onClick={handleLogout}>
							Logout
						</Link>
					</li>
				</>
			)}
		</ul>
	);
}
