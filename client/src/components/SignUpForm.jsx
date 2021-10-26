import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function SignUpForm() {
	const [formFields, setFormFields] = useState(null);
	const { setUser } = useContext(UserContext);
	const history = useHistory();

	const handleChange = (value, fieldId) => {
		const payload = { ...formFields };
		payload[fieldId] = value;
		setFormFields(payload);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const url = "/api/users/signup";
		const payload = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formFields),
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
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit} className="form">
				<label htmlFor="fullName">Full Name</label>
				<input
					onChange={(e) => handleChange(e.target.value, e.target.id)}
					id="fullName"
					type="text"
					autoComplete="off"
				/>
				<label htmlFor="displayName">Display Name</label>
				<input
					onChange={(e) => handleChange(e.target.value, e.target.id)}
					id="displayName"
					type="text"
					autoComplete="off"
				/>
				<label htmlFor="email">Email</label>
				<input
					onChange={(e) => handleChange(e.target.value, e.target.id)}
					id="email"
					type="email"
					autoComplete="off"
				/>
				<label htmlFor="password">Password</label>
				<input
					onChange={(e) => handleChange(e.target.value, e.target.id)}
					id="password"
					type="password"
					autoComplete="off"
				/>
				<input type="submit" className="btn" value="Sign Up" />
			</form>
		</div>
	);
}
