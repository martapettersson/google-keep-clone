import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";

export default function NotesPage(props) {
	const {
		notes, setNotes , getNotes
	} = useContext(UserContext);

	useEffect(() => {
		getNotes();
	}, []);
	
	if(props.match.params.id && notes) {
		const id = props.match.params.id;
		const note = notes.find(note => note._id === id);
		if (note) {
			return (
				<div>
					<h1>Notes Edit</h1>
					<EditNote id={id} note={note} notes= {notes} setNotes = {setNotes}/>
					{notes ? (
						<div>
							{notes.map((note) => {
								return <Note key={note._id} note={note} notes= {notes} setNotes = {setNotes} />;
							})}
						</div>
					) : (
						<p>Loading Data</p>
					)}
				</div>
			);
		} else {
			return (
				<div>
					<h1>Page Not Found!</h1>
					<Link to={`/notes`}>Back To Notes</Link>
				</div>
			)
		}
	} else {
		return (
			<div>
				<h1>Notes</h1>
				<CreateNote notes= {notes} setNotes = {setNotes}/>
				{notes ? (
					<div>
						{notes.map((note) => {
							return <Note key={note._id} note={note} notes= {notes} setNotes = {setNotes} />;
						})}
					</div>
				) : (
					<p>Loading Data</p>
				)}
			</div>
		);
	}
}