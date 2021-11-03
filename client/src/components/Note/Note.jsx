import React from "react";
import MDEditor from "@uiw/react-md-editor";
import { Link } from "react-router-dom";
import styles from "./Note.module.css";

export default function Note({ note, notes, setNotes }) {
	const noteId = note._id;

	const getDate = (date) => {
		const dateObj = new Date(date);
		const year = dateObj.getUTCFullYear();
		const month = dateObj.getUTCMonth() + 1;
		const day = dateObj.getUTCDate();
		const hour = dateObj.getHours();
		let minutes = dateObj.getMinutes().toString();
		if (minutes.length === 1) {
			minutes = `0${minutes}`;
		}
		return `${year}/${month}/${day} ${hour}:${minutes}`;
	};

	const lastUpdatedAt = getDate(note.updatedAt);

	const deleteNote = async () => {
		const url = `${process.env.REACT_APP_BASE_URL}api/notes/${noteId}/`;
		const token = localStorage.getItem("tkn");

		const payload = {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		};
		const response = await fetch(url, payload);
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		const newNotes = notes.filter((note) => note._id !== noteId);
		setNotes(newNotes);
	};

	return (
		<div className={styles.note}>
			<div className={styles.noteContent}>
				<MDEditor.Markdown source={note.sanitizedHtml} />
			</div>
			<div className={styles.noteFooter}>
				<Link className="btn" to={`/notes/${noteId}`}>
					Edit
				</Link>
				<button className="btn btnDelete" onClick={deleteNote}>
					Delete
				</button>
				<p className={styles.date}>Last Updated: {lastUpdatedAt}</p>{" "}
			</div>
		</div>
	);
}
