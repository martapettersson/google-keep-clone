import React, { useState } from "react";

export default function LoginForm() {
	const [formFields, setFormFields] = useState(null);

	const handleChange = (value, fieldId) => {
		const payload = { ...formFields };
		payload[fieldId] = value;
		setFormFields(payload);
	};
	return (
		<div>
			<h3>Login</h3>
			<form className="form">
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
			</form>
		</div>
	);
}
