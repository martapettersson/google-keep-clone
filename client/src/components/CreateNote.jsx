import React, { useState } from "react";
import MDEditor from '@uiw/react-md-editor';

export default function CreateNote({ notes, setNotes }) {
    const [formData, setFormData] = useState("");

    const validateForm = () => {
        if (!formData){
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
                body: JSON.stringify({markdown: formData}),
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((res) => res.json())
            .then((data) => {
                setNotes([...notes, data.data]);
                setFormData("");
            });
        } else {
            alert ("Please enter data in form.");
        }
    }

	return (
        <div className="md-editor">
            <h2 className="header">Create New Note</h2>
            <MDEditor value={formData} onChange={setFormData} />
            <form onSubmit={createNote} action="post">
                <input type="hidden" name="markdown" id="markdown" value={formData} />
                <input className="btn" type="submit" value="Create"/>
            </form>
        </div>
	);
}