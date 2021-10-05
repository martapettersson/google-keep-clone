import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import NotesPage from "./pages/NotesPage";

function App() {
	return (
		<div>
			<Switch>
				<Route path="/notes" component={NotesPage} />
				<Route path="/" component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
