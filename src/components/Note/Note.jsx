import React from "react"
import { Link } from "react-router-dom"
import "./Note.css"
import auth from "../../auth/auth-helper"
import NoteUser from "../NoteUser/NoteUser"
import { useState } from "react/cjs/react.development"

function timeDifference(current, previous) {
  let msPerMinute = 60 * 1000
  let msPerHour = msPerMinute * 60
  let msPerDay = msPerHour * 24
  let msPerMonth = msPerDay * 30
  let msPerYear = msPerDay * 365

  let elapsed = current - previous

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now"

    return Math.round(elapsed / 1000) + " seconds ago"
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago"
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago"
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago"
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago"
  } else {
    return Math.round(elapsed / msPerYear) + " years ago"
  }
}

export default function Note({ show, note }) {
  const [showDiff, setShowDiff] = useState(true)

  const MAX_NOTE_LENGTH = 350
  const isLoggedIn = auth.isAuthenticated()

  return (
    <article key={note.id}>
      <div>
        <img className="image" src={note.image} alt={note.title} />
      </div>

      <div className="title">
        <span>{note.title}</span>

        <div>{isLoggedIn && <NoteUser note={note} />}</div>
      </div>

      {show === "full" ? (
        <div className="content">{note.content}</div>
      ) : (
        <Link to={`/note/${note.id}`}>
          <div className="content">{`${note.content.substring(
            0,
            MAX_NOTE_LENGTH
          )}${note.content.length < MAX_NOTE_LENGTH ? "" : "..."}`}</div>
        </Link>
      )}

      <div className="user">
        <Link to={`/profile/${note.author.username}`}>
          <span className="author">
            <img
              src={note.author.avatar}
              alt={`${note.author.username} avatar`}
              height="50px"
            />
            {note.author.username}
          </span>
        </Link>

        <span onClick={() => setShowDiff(!showDiff)}>
          {showDiff
            ? timeDifference(new Date(), new Date(note.createdAt))
            : new Date(note.createdAt).toDateString()}
        </span>
      </div>
    </article>
  )
}
