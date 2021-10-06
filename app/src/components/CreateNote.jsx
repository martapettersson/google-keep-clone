import React from "react";

export default function CreateNote({ notes, setNotes }) {

	return (
        <div>
            <form action="post">
                <h3>Title</h3>
                <input type="text" name="title" id="title" value="Title" />
                <br />
                <h3>Body</h3>
                <textarea name="body" id="body" cols="30" rows="10" value="Body"></textarea>
                <br />
                <input type="submit" value="Create" />
            </form>
            <hr />
        </div>
	);
}