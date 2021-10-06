import React from "react";
import { Link } from "react-router-dom";

export default function Note({ note, notes, setNotes }) {
    const noteId = note._id
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
            <p>{note.body}</p>
            <button onClick={deleteNote}>Delete</button>
			<button><Link to={`/notes/${noteId}`}>Edit</Link></button>
            <hr />
        </div>
	);
}
