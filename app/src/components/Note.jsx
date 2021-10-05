import React from "react";

export default function Note({ note }) {
	return (
        <div>
            <h2>{note.title}</h2>
            <p>{note.body}</p>
            <hr />
        </div>
	);
}
