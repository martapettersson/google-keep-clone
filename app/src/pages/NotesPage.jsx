import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";

export default function NotesPage() {
	const {
		notes, setNotes , getNotes
	} = useContext(UserContext);

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