import React, { useState } from "react";
import Header from "./Header";
import Createnote from "./Createnote";
import Footer from "./Footer";
import Note from "./Note";
import "../../public/styles.css";

function App() {
  //array of notes
  const [note, setNote] = useState([]);

  // adds a note to an array
  function addNote(newNote) {
    setNote((prevNote) => {
      return [...prevNote, newNote];
    });
  }

  // filters out function that needs deletion
  function deleteNote(id) {
    setNote((prevNote) => {
      return prevNote.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <Createnote handleAdd={addNote} /> 
      {note.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            handleDelete={deleteNote} // passes deletion function
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
