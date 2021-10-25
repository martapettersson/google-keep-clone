import React, { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import Navbar from "./components/Navbar";

function App() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			if (localStorage.getItem("tkn")) {
				const token = localStorage.getItem("tkn");
				const url = "/api/users/getMe";
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
				setUser(responseData.data);
			}
		};
		fetchUser().catch((error) => {
			console.log(error);
		});
	}, []);

	const userContextValue = {
		user,
		setUser,
	};

	return (
		<main>
			<UserContext.Provider value={userContextValue}>
				<Navbar />
				<div className="container">
					<Switch>
						<Route path="/notes/:id" component={NotesPage} />
						<Route path="/notes" component={NotesPage} />
						<Route path="/" component={LandingPage} />
					</Switch>
				</div>
			</UserContext.Provider>
		</main>
	);
}

export default App;
