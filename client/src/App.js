import React, { useState, useEffect } from "react";
import { UserContext } from "./context/UserContext";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import NotesPage from "./pages/NotesPage";
import Layout from "./components/Layout/Layout";

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
				const responseData = await response.json();

				if (!response.ok) {
					throw new Error(responseData.error);
				}
				setUser(responseData.data);
			}
		};
		fetchUser().catch((error) => {
			console.warn(error);
		});
	}, []);

	const userContextValue = {
		user,
		setUser,
	};

	return (
		<UserContext.Provider value={userContextValue}>
			<Layout>
				<Switch>
					<Route path="/notes/:id" component={NotesPage} />
					<Route path="/notes" component={NotesPage} />
					<Route
						path="/tips"
						component={() => {
							window.open(
								"https://www.markdownguide.org/basic-syntax/",
								"_blank"
							);
							return (
								<div>
									<h2>Tips opened in new tab</h2>
								</div>
							);
						}}
					/>
					<Route path="/" component={LandingPage} />
				</Switch>
			</Layout>
		</UserContext.Provider>
	);
}

export default App;
