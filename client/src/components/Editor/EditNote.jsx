import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import styles from "./Editor.module.css";

export default function EditNote({ id, note, notes, setNotes }) {
	const [formData, setFormData] = useState(note.markdown);
	const history = useHistory();
	const noteId = id;

	const validateForm = () => {
		if (formData === note.markdown) {
			return false;
		} else {
			return true;
		}
	};

	const updateNote = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			return alert("Please enter new data in form or cancel.");
		}
		const url = `/api/notes/${noteId}`;
		const token = localStorage.getItem("tkn");

		const payload = {
			method: "PUT",
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
		const newNotes = notes.filter((note) => note._id !== noteId);
		newNotes.push(responseData.data);
		setNotes(newNotes);
		history.push(`/notes`);
	};

	return (
		<div className={styles.editorContainer}>
			<h2>Edit Note</h2>
			<div className={styles.editorForm}>
				<MDEditor value={formData} onChange={setFormData} />
				<form onSubmit={updateNote} action="post">
					<input type="hidden" name="markdown" id="markdown" value={formData} />
					<input className="btn" type="submit" value="Update" />
					<Link to="/notes" className={styles.cancelBtn}>
						Cancel
					</Link>
				</form>
			</div>
		</div>
	);
}
