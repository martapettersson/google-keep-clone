import React from "react";
import MDEditor from '@uiw/react-md-editor';
import { Link } from "react-router-dom";

export default function Note({ note, notes, setNotes }) {
    const noteId = note._id

	const getDate = (date) => {
		const dateObj = new Date(date);
		const year = dateObj.getUTCFullYear();
		const month = dateObj.getUTCMonth() + 1;
		const day = dateObj.getUTCDate();
		const hour = dateObj.getHours();
		const minutes = dateObj.getMinutes();
		return `${year}/${month}/${day} - ${hour}:${minutes}`;
	}

	const lastUpdatedAt = getDate(note.updatedAt);

    const deleteNote = () => {
        const url = `http://localhost:5000/api/notes/${noteId}/`;
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(() => {
			const newNotes = notes.filter(
				(note) => note._id !== noteId
			);
			setNotes(newNotes);
		});
    }
	return (
        <div className="note-container">
			<p>{lastUpdatedAt}</p>
			<MDEditor.Markdown source={note.sanitizedHtml} />
            <button className="btn" onClick={deleteNote}>Delete</button>
			<Link className="btn" to={`/notes/${noteId}`}>Edit</Link>
        </div>
	);
}