import React, { useState } from "react";
import ReactDOM from "react-dom";
import MDEditor from '@uiw/react-md-editor';

export default function CreateNote({ notes, setNotes }) {
    const [formData, setFormData] = useState("");

    // const handleOnChange = (e) => {
	// 	const inputName = e.target.name;
	// 	const inputValue = e.target.value;
	// 	setFormData({ ...formData, [inputName]: inputValue });
	// };
    console.log(formData)

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
            alert ("Please enter data in form.");
        }
    }

	return (
        <div>hello
            {/* <MDEditor value={formData} onChange={setFormData} />
            <MDEditor.Markdown source={formData} /> */}
        </div>
	);
}