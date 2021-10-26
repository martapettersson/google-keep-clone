import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Note from "../components/Note";
import CreateNote from "../components/CreateNote";
import EditNote from "../components/EditNote";
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
		if (!response.ok) {
			throw new Error("Something went wrong!");
		}
		const responseData = await response.json();
		setNotes(responseData.data);
	};

	useEffect(() => {
		if (user) {
			fetchNotes().catch((error) => {
				console.log(error);
			});
		}
	}, []);

	if (!user) {
		return (
			<span>
				You have to login or sign up to view this page:
				<Link to="/"> Let's go!</Link>
			</span>
		);
	} else if (props.match.params.id && notes) {
		const id = props.match.params.id;
		const note = notes.find((note) => note._id === id);
		if (note) {
			return (
				<div>
					<EditNote id={id} note={note} notes={notes} setNotes={setNotes} />
				</div>
			);
		} else {
			return (
				<div>
					<h1>Page Not Found!</h1>
					<Link to={`/notes`}>Back To Notes</Link>
				</div>
			);
		}
	} else {
		return (
			<>
				<CreateNote notes={notes} setNotes={setNotes} />
				{notes ? (
					<div className="notes-container">
						{notes.map((note) => {
							return (
								<Note
									key={note._id}
									note={note}
									notes={notes}
									setNotes={setNotes}
								/>
							);
						})}
					</div>
				) : (
					<p>No notes created yet!</p>
				)}
			</>
		);
	}
}
