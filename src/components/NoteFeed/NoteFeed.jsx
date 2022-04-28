import React from "react"
import Note from "../Note/Note"

import "./NoteFeed.css"

export default function NoteFeed({ notes }) {
  return (
    <div className="notefeed">
      {notes.map((note) => (
        <div key={note.id}>
            <Note note={note} />
        </div>
      ))}
    </div>
  )
}
