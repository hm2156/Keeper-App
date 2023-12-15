//necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// MongoDB URI 
const monguri = "mongodb+srv://ham2167:Mom_1910@cluster0.9yv0wib.mongodb.net/?retryWrites=true&w=majority"

const app = express();

// Enable CORS for all routes to allow cross-origin requests
app.use(cors());
// Parses incoming JSON requests and puts the parsed data in req.body
app.use(express.json());

// Connectting to MongoDB using the connection string
mongoose.connect(monguri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));


// Mongoose schema for notes
const noteSchema = new mongoose.Schema({
  title: String, //Note title
  content: String //Note content
});


// Create a Mongoose model based on the schema
const Note = mongoose.model('Note', noteSchema);


//fetch all notes from MongoDb
app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.find({});// Find all notes
    res.json(notes); // Send all notes as a JSON response
  } catch (err) {
    res.status(500).send(err); // Send an error response if something goes wrong
  }
});

//log the HTTP method and path for all requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Create a new note in MongoDB
app.post('/notes', async (req, res) => {
  // new Note instance
  const newNote = new Note({
    title: req.body.title,
    content: req.body.content
  });

  try {
    const savedNote = await newNote.save(); // Save note to the database
    res.json(savedNote);  // Respond with the saved note
  } catch (err) {
    res.status(500).send(err); //save failed = error
  }
});

//delete a note by its ID
app.delete('/notes/:id', async (req, res) => {
  try {
    const result = await Note.findByIdAndDelete(req.params.id); // Attempt to find a note by ID and delete it
    if (result) {
      res.send("Successfully deleted the note."); // If deletion is successful, send a confirmation
    } else { 
      res.status(404).send("Note not found."); //no note found send error msg
    }
  } catch (err) {
    console.error(err); // Log error
    res.status(500).send(err.message);
  }
});



// Start server on port 3001
app.listen(3001, () => {
  console.log('Server started on port 3001');
});