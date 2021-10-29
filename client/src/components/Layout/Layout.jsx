import React from "react";
import Navbar from "../Nav/Navbar";
import styles from "./Layout.module.css";

export default function Layout(props) {
	return (
		<>
			<Navbar />
			<main className={styles.main}>{props.children}</main>
		</>
	);
}
