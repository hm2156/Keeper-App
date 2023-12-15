import React, { useState , useEffect} from "react";
import Header from "./Header";
import Createnote from "./Createnote";
import Footer from "./Footer";
import Note from "./Note";
import axios from "axios";

function App() {


  //array of notes
  const [note, setNote] = useState([]);

  //fetch notes from the server
  useEffect(() => {

    // Function to fetch notes from the backend and update the state
    function fetchNotes() {
      axios.get('http://localhost:3001/notes')
        .then(response => {
          setNote(response.data); // Update the notes state with the fetched data
        })
        .catch(error => console.error('Error fetching data:', error)); 
    }
  
    fetchNotes(); //call function

  }, []); 

  //function to add new notes
  function addNote(newNote) {
    if (!newNote.title.trim() && !newNote.content.trim()) {
      console.error('Cannot add an empty note.');
      return; // Exit the function if the note is empty
    }

    // POST request to the server to add a new note
    axios.post('http://localhost:3001/notes', newNote)
      .then(response => {
        setNote(prevNotes => [...prevNotes, response.data]); // Update the state with the new note added 
      })
      .catch(error => console.error('Error adding note:', error));
  }

  //function to delete note by id
  function deleteNote(id) {
    console.log(`Deleting note with ID: ${id}`); 
    axios.delete(`http://localhost:3001/notes/${id}`) // DELETE request to the server to delete the note
      .then(() => {
        setNote(prevNotes => prevNotes.filter(noteItem => noteItem._id !== id)); // Update the state by filtering out the deleted note
      })
      .catch(error => console.error('Error deleting note:', error));
  }
 

  return (
    <div>
      <Header />
      <Createnote handleAdd={addNote} /> 
      {note.map((noteItem) => {
        return (
          <Note
            key={noteItem._id} // MongoDB ObjectId 
            id={noteItem._id} // note id
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
