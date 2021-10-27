import React from "react";

export default function SignUpForm({ handleSubmit, handleChange }) {
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
				<label htmlFor="passwordConfirm">Confirm Password</label>
				<input
					onChange={(e) => handleChange(e.target.value, e.target.id)}
					id="passwordConfirm"
					type="password"
					autoComplete="off"
				/>
				<input type="submit" className="btn" value="Sign Up" />
			</form>
		</div>
	);
}
