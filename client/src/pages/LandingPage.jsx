import { React, useState } from "react";
import { Link } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LandingPage() {
	const [formType, setFormType] = useState(null);
	const setLogin = () => {
		setFormType("login");
	};
	const setSignUp = () => {
		setFormType("signup");
	};
	return (
		<div>
			<h2>Welcome to Google Keep Clone!</h2>
			<br />
			{formType === "login" ? (
				<div>
					<LoginForm />
					<br />
					<Link to="/" onClick={setSignUp}>
						Not a member? Sign up here!
					</Link>
				</div>
			) : (
				<div>
					<SignUpForm />
					<br />
					<Link to="/" onClick={setLogin}>
						Already have an account? Login here!
					</Link>
				</div>
			)}
		</div>
	);
}
