import React, { useState } from "react";

export default function SignUpForm() {
	const [formFields, setFormFields] = useState(null);

	const handleChange = (value, fieldId) => {
		const payload = { ...formFields };
		payload[fieldId] = value;
		setFormFields(payload);
	};
	return (
		<div>
			<h2>Sign Up</h2>
			<form className="form">
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
