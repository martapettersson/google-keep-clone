import React, { useState } from "react";

export default function CreateNote({ notes, setNotes }) {
    const [formData, setFormData] = useState({});

    const handleOnChange = (e) => {
		const inputName = e.target.name;
		const inputValue = e.target.value;
		setFormData({ ...formData, [inputName]: inputValue });
	};

    const validateForm = () => {
        if (!formData.title || !formData.body){
            return false;
        } else {
            return true;
        }
    }

    const createNote = (e) => {
        e.preventDefault();
        if (validateForm() === true) {
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
        } else {
            alert ("Please enter a title and body.");
        }
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