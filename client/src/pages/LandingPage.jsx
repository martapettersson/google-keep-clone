import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import LoginForm from "../components/Forms/LoginForm";
import SignUpForm from "../components/Forms/SignUpForm";

export default function LandingPage() {
	const [formType, setFormType] = useState("signup");
	const location = useLocation();
	const [formData, setFormData] = useState(null);
	const { setUser } = useContext(UserContext);
	const history = useHistory();

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
	useEffect(() => {
		if (location.pathname === "/login") {
			setFormType("login");
		}
		if (location.pathname === "/signup") {
			setFormType("signup");
		}
	}, [location.pathname]);
	return (
		<div>
			<h1>Google Keep Clone</h1>
			<br />
			{formType === "login" ? (
				<div>
					<LoginForm handleSubmit={handleSubmit} handleChange={handleChange} />
					<br />
				</div>
			) : (
				<div>
					<SignUpForm handleSubmit={handleSubmit} handleChange={handleChange} />
					<br />
				</div>
			)}
		</div>
	);
}
