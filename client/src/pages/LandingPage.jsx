import React, { useState, useContext, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import formValidation from "../utils/formValidation";

import LoginForm from "../components/Forms/LoginForm";
import SignUpForm from "../components/Forms/SignUpForm";

export default function LandingPage() {
	const [formType, setFormType] = useState("signup");
	const [formData, setFormData] = useState({});
	const [error, setError] = useState(null);
	const location = useLocation();
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	const handleChange = (value, fieldId) => {
		const payload = { ...formData };
		payload[fieldId] = value;
		setFormData(payload);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const validateMessage = formValidation(formData, formType);
		if (validateMessage === "valid") {
			const url = `/api/users/${formType}`;
			const payload = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			};

			try {
				const response = await fetch(url, payload);
				const responseData = await response.json();

				if (!response.ok) {
					setError(responseData.error);
					throw new Error(responseData.error);
				}
				localStorage.setItem("tkn", responseData.token);
				setUser(responseData.user);
				history.push(`/notes`);
			} catch (err) {
				console.warn(err);
			}
		} else {
			setError(validateMessage);
		}
	};
	useEffect(() => {
		setError(null);
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
					<LoginForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						error={error}
					/>
					<br />
				</div>
			) : (
				<div>
					<SignUpForm
						handleSubmit={handleSubmit}
						handleChange={handleChange}
						error={error}
					/>
					<br />
				</div>
			)}
		</div>
	);
}
