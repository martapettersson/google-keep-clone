import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import MDEditor from '@uiw/react-md-editor';

export default function EditNote({ id, note, notes, setNotes }) {
    const [formData, setFormData] = useState(note.markdown);
    const history = useHistory();
    const noteId = id;

    const validateForm = () => {
        if (!formData){
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
                body: JSON.stringify({markdown: formData}),
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
            alert ("Please enter data in form.");
        }
    }

	return (
        <div className="md-editor">
            <h2 className="header">Edit Note</h2>
            <MDEditor value={formData} onChange={setFormData} />
            <form onSubmit={updateNote} action="post">
                <input type="hidden" name="markdown" id="markdown" value={formData} />
                <input className="btn" type="submit" value="Update"/>
            </form>
        </div>
	);
}