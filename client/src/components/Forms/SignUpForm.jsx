import React from "react";
import styles from "./Form.module.css";

export default function SignUpForm({ handleSubmit, handleChange, error }) {
	return (
		<div className={styles.formContainer}>
			<h2>Sign Up</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
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
			{error && (
				<div className={styles.errorBox}>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
}
