import React from "react";
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
        <div>
            <h2>{note.title}</h2>
			<p>{lastUpdatedAt}</p>
            <p>{note.body}</p>
            <button onClick={deleteNote}>Delete</button>
			<button><Link to={`/notes/${noteId}`}>Edit</Link></button>
            <hr />
        </div>
	);
}
