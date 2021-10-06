import React, { useState } from "react";

export default function CreateNote({ notes, setNotes }) {
    const [formData, setFormData] = useState({});

    const handleOnChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData({ ...formData, [inputName]: inputValue });
        console.log(formData);
	};

    const createNote = (e) => {
        e.preventDefault();
        const url = `http://localhost:5000/api/notes/`;
        fetch(url, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => res.json())
        .then((data) => {
            setNotes([...notes, data.data]);
            setFormData({});
        });
    }

	return (
        <div>
            <form onSubmit={createNote} action="post">
                <h3>Title</h3>
                <input onChange={handleOnChange} type="text" name="title" id="title" value={formData["title"] || ""} />
                <br />
                <h3>Body</h3>
                <textarea onChange={handleOnChange} name="body" id="body" cols="30" rows="10" value={formData["body"] || ""}></textarea>
                <br />
                <input type="submit" value="Create" />
            </form>
            <hr />
        </div>
	);
}