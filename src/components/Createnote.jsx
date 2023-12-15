import React, { useState } from "react";

function Createnote(props) {
  // array to keep track of title and content
  const [note, setNote] = useState({
    title: "",
    content: ""
  });

  //handles title and content input and adds to array
  function handleChange(event) {
    const { name, value } = event.target;

    setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  // pass new note to app
  function addNote(event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if both title and content are empty
    if (!note.title.trim() && !note.content.trim()) {
      alert('You cannot add an empty note.'); //alert
      return; // Exit
    }
    props.handleAdd(note);
    setNote({
      title: "",
      content: ""
    });
  }

  return (
    <div>
      <form>
        <input
          name="title"
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
        />
        <textarea
          name="content"
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
          rows="3"
        />
        <button onClick={addNote}>Add</button>
      </form>
    </div>
  );
}

export default Createnote;
