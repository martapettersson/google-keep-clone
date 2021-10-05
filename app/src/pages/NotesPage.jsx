import React from "react";
import Note from "../components/Note";

export default function NotesPage() {
	const notes = [
		{id: 1, title: "Title 1", body: "Body 1"}, 
		{id: 2, title: "Title 2", body: "Body 2"}
	];
	// const notes = null;
	return (
		<div>
			<h1>Notes</h1>
			{notes ? (
				<div>
					{notes.map((note) => {
						return <Note key={note.id} note={note} />;
					})}
				</div>
			) : (
				<p>Loading data...</p>
			)}
		</div>
	);
}