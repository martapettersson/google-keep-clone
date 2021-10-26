import React from "react";

export default function LoginForm({ handleSubmit, handleChange }) {
	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className="form">
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
				<input type="submit" className="btn" value="Login" />
			</form>
		</div>
	);
}
