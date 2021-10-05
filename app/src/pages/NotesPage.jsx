import React, { useEffect, useState } from "react";
import Note from "../components/Note";

export default function NotesPage() {
	const [notes, setNotes] = useState(null);
	const getNotes = () => {
		const url = "http://localhost:5000/api/notes/";
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.success === false) {
					setNotes([]);
				}
				setNotes(data.data);
			});
	};
	useEffect(() => {
		setNotes(getNotes());
	}, []);
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