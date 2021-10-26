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
	console.log(user);

	return (
		<ul className="navbar">
			<li>
				<Link to={`/`}>
					<img className="menu-logo" src="/logo.png" alt="Note Logo" />
				</Link>
			</li>
			{user && (
				<>
					<li>
						<Link to={`/notes/`}>Notes</Link>
					</li>
					<li>
						<p onClick={handleLogout}>Logout</p>
					</li>
				</>
			)}
		</ul>
	);
}
