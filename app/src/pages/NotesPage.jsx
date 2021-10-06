import React, { useEffect, useState } from "react";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";

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
				if (data.success) {
					setNotes(data.data);
				} else {
					setNotes([])
				}
			});
	};
	useEffect(() => {
		getNotes();
	}, []);
	return (
		<div>
			<h1>Notes</h1>
			<CreateNote notes= {notes} setNotes = {setNotes}/>
			{notes ? (
				<div>
					{notes.map((note) => {
						return <Note key={note.id} note={note} notes= {notes} setNotes = {setNotes} />;
					})}
				</div>
			) : (
				<p>Loading Data</p>
			)}
		</div>
	);
}