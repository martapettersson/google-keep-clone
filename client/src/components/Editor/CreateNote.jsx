import React, { useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import styles from "./Editor.module.css";

export default function CreateNote({ notes, setNotes }) {
	const [formData, setFormData] = useState("");

	const validateForm = () => {
		if (!formData) {
			return false;
		} else {
			return true;
		}
	};

	const createNote = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return alert("Please enter data in form.");
		}
		const url = "/api/notes/";
		const token = localStorage.getItem("tkn");

		const payload = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({ markdown: formData }),
		};
		const response = await fetch(url, payload);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		const responseData = await response.json();
		setNotes(!notes ? [responseData.data] : [...notes, responseData.data]);
		setFormData("");
	};

	return (
		<div className={styles.editorContainer}>
			<h2>Create New Note</h2>
			<div className={styles.editorForm}>
				<MDEditor value={formData} onChange={setFormData} />
				<form onSubmit={createNote} action="post">
					<input type="hidden" name="markdown" id="markdown" value={formData} />
					<input className="btn" type="submit" value="Create" />
				</form>
			</div>
		</div>
	);
}
