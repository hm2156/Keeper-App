import React from "react";

function Note(props) {
  //gets a delete function from props
  function handleClick() {
    props.handleDelete(props.id); //passes id over
  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>DELETE</button>
    </div>
  );
}

export default Note;
