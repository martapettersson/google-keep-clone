import React from "react";
import styles from "./Form.module.css";

export default function LoginForm({ handleSubmit, handleChange, error }) {
	return (
		<div className={styles.formContainer}>
			<h2>Login</h2>
			<form onSubmit={handleSubmit} className={styles.form}>
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
			{error && (
				<div className={styles.errorBox}>
					<p>{error}</p>
				</div>
			)}
		</div>
	);
}
