import React, { useState } from "react";
import { UserContext } from "./context/UserContext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import Navbar from "./components/Navbar";

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
			<Navbar />
			<div className="container">
				<UserContext.Provider value={userContextValue}>
					<Switch>
						<Route path="/notes/:id" component={NotesPage} />
						<Route path="/notes" component={NotesPage} />
						<Route path="/" component={LandingPage} />
					</Switch>
				</UserContext.Provider>
			</div>
		</div>
	);
}

export default App;
