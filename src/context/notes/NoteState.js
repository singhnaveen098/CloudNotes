import React, { useState } from "react";
import NoteContext from "./NoteContext";

function NoteState(props) {
  const host = ""
  const notesinitial = []
  const [notes, setnotes] = useState(notesinitial)

  //Fetch all notes

  const fetchnote = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setnotes(json)
  }


  //Add a note

  const addnote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setnotes(notes.concat(note))
  }

  //Delete a note

  const deletenote = async (id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    const newnotes = notes.filter((note) => { return note._id !== id })
    setnotes(newnotes)
  }

  //Edit a note

  const editnote = async (id, title, description, tag) => {
    //API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();

    //Logic to edit in client
    let newnotes = JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title
        newnotes[index].description = description
        newnotes[index].tag = tag
        break;
      }
    }
    setnotes(newnotes)
  }
  
  //Delete all notes

  const deleteallnote = async () => {
    const response = await fetch(`${host}/api/notes/deleteallnotes`, {
      method: 'DELETE',
      headers: {
        'auth-token': localStorage.getItem('token')
      }
    });
    const json = await response.json();
    setnotes(json)
  }

  return (
    <NoteContext.Provider value={{ notes, addnote, deletenote, editnote, fetchnote, deleteallnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState


