import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function EditNote({ id, note, notes, setNotes }) {
    const [formData, setFormData] = useState(note);
    const history = useHistory();
    const noteId = id;

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

    const updateNote = (e) => {
        e.preventDefault();
        if (validateForm() === true) {
            const url = `http://localhost:5000/api/notes/${noteId}`;
            fetch(url, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json())
            .then((data) => {
                const newNotes = notes.filter(
                    (note) => note._id !== noteId
                );
                newNotes.push(data.data);
                setNotes(newNotes)
                history.push(`/notes`);
            });
        } else {
            alert ("Please enter a title and body.");
        }
    }

	return (
        <div>
            <form onSubmit={updateNote} action="post">
                <h3>Title</h3>
                <input onChange={handleOnChange} type="text" name="title" id="title" value={formData["title"] || note.title} />
                <br />
                <h3>Body</h3>
                <textarea onChange={handleOnChange} name="body" id="body" cols="30" rows="10" value={formData["body"] || note.body}></textarea>
                <br />
                <input type="submit" value="Update" />
            </form>
            <hr />
        </div>
	);
}