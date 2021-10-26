import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

export default function LandingPage() {
	const [formType, setFormType] = useState("signup");
	const [formData, setFormData] = useState(null);
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	const setLogin = () => {
		setFormType("login");
	};
	const setSignUp = () => {
		setFormType("signup");
	};

	const handleChange = (value, fieldId) => {
		const payload = { ...formData };
		payload[fieldId] = value;
		setFormData(payload);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = `/api/users/${formType}`;
		const payload = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		};
		const response = await fetch(url, payload);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		const responseData = await response.json();
		localStorage.setItem("tkn", responseData.token);
		setUser(responseData.user);
		history.push(`/notes`);
	};
	return (
		<div>
			<h1>Welcome to Google Keep Clone!</h1>
			<br />
			{formType === "login" ? (
				<div>
					<LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
					<br />
					<Link to="/" onClick={setSignUp}>
						Not a member? Sign up here!
					</Link>
				</div>
			) : (
				<div>
					<SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} />
					<br />
					<Link to="/" onClick={setLogin}>
						Already have an account? Login here!
					</Link>
				</div>
			)}
		</div>
	);
}
