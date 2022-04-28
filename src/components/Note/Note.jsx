import React from "react"
import { Link } from "react-router-dom"
import "./Note.css"
import auth from "../../auth/auth-helper"
import NoteUser from '../NoteUser/NoteUser'

export default function Note({ show, note }) {
  const MAX_NOTE_LENGTH = 350
  const isLoggedIn = auth.isAuthenticated()

  return (
    <article key={note.id}>
      <div className="title">
        <span>{note.title}</span>

        <div>
          {isLoggedIn && <NoteUser note={note} />}
        </div>
      </div>

      {show === "full" ? (
        <div className="content">{note.content}</div>
      ) : (
        <Link to={`note/${note.id}`}>
          <div className="content">{`${note.content.substring(
            0,
            MAX_NOTE_LENGTH
          )}${note.content.length < MAX_NOTE_LENGTH ? "" : "..."}`}</div>
        </Link>
      )}

      <div className="user">
        <span className="author">
          <img
            src={note.author.avatar}
            alt={`${note.author.username} avatar`}
            height="50px"
          />
          {note.author.username}
        </span>

        <span>{new Date(note.createdAt).toDateString()}</span>
      </div>
    </article>
  )
}
