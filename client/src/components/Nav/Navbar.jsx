import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, useHistory } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);

	const handleLogout = () => {
		localStorage.removeItem("tkn");
		setUser(null);
		history.push("/");
	};

	return (
		<ul className={styles.navbar}>
			<li>
				<Link to={!user ? "/" : "/notes"}>
					<img className="menu-logo" src="/logo.png" alt="Note Logo" />
				</Link>
			</li>
			{!user ? (
				<>
					<li>
						<Link to="/login">Login</Link>
					</li>
					<li>
						<Link to="/signup">Sign Up</Link>
					</li>
				</>
			) : (
				<>
					<li>
						<p>Welcome {user.displayName}!</p>
					</li>
					<li>
						<Link to="/notes">Your Notes</Link>
					</li>
					<li>
						<Link to="/tips">Markdown Guide</Link>
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
