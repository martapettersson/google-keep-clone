import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";

function App() {
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
					setNotes([]);
				}
			});
	};
	const userContextValue = {
		notes,
		setNotes,
		getNotes,
	};
	return (
		<div>
			<UserContext.Provider value={userContextValue}>
				<Switch>
					<Route path="/notes" component={NotesPage} />
					<Route path="/" component={HomePage} />
				</Switch>
			</UserContext.Provider>
		</div>
	);
}

export default App;
