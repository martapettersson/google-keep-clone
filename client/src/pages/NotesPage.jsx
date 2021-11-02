import React, { useState, useEffect, useContext } from "react";
import Note from "../components/Note/Note";
import CreateNote from "../components/Editor/CreateNote";
import EditNote from "../components/Editor/EditNote";
import { UserContext } from "../context/UserContext";

export default function NotesPage(props) {
	const [notes, setNotes] = useState(null);
	const { user } = useContext(UserContext);

	const fetchNotes = async () => {
		const url = "/api/notes";
		const token = localStorage.getItem("tkn");
		const payload = {
			headers: {
				"Content-Type": "application/json",
				authorization: `Bearer ${token}`,
			},
		};

		const response = await fetch(url, payload);
		const responseData = await response.json();

		if (!response.ok) {
			if (response.status === 404) {
				setNotes(null);
			} else {
				throw new Error(responseData.error);
			}
		}
		setNotes(responseData.data);
	};

	useEffect(() => {
		if (user) {
			fetchNotes().catch((error) => {
				console.warn(error);
			});
		}
	}, [user]);

	if (!user) {
		return <span>You have to login or sign up to view this page.</span>;
	}
	// Edit single note
	else if (props.match.params.id && notes) {
		const id = props.match.params.id;
		const note = notes.find((note) => note._id === id);
		return (
			<div className="notesPageContainer">
				{note ? (
					<EditNote id={id} note={note} notes={notes} setNotes={setNotes} />
				) : (
					<h1>Page Not Found!</h1>
				)}
			</div>
		);
	}
	// Create new and view all notes
	else {
		return (
			<div className="notesPageContainer">
				<CreateNote notes={notes} setNotes={setNotes} />
				<div className="notesContainer">
					{notes ? (
						notes.map((note) => {
							return (
								<Note
									key={note._id}
									note={note}
									notes={notes}
									setNotes={setNotes}
								/>
							);
						})
					) : (
						<p>No notes created yet!</p>
					)}
				</div>
			</div>
		);
	}
}
