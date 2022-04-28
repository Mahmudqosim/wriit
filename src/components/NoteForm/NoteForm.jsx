import React, { useState } from "react"
import Loader from "../Loader/Loader"

export default function NoteForm({
  title,
  content,
  loadingSave,
  setLoadingSave,
  action,
  error,
}) {
  const [values, setValues] = useState({
    title: title || "",
    content: content || "",
  })

  // update the state when a user types in the form
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  return (
    <form
      className="new-note"
      onSubmit={(e) => {
        e.preventDefault()
        setLoadingSave(true)
        action({
          variables: {
            ...values,
          },
        })
      }}
    >
      {error && (
        <div className="error">Error saving the note. Please retry.</div>
      )}

      <input
        required
        type="text"
        name="title"
        placeholder="Title here..."
        value={values.title}
        onChange={onChange}
      />

      <textarea
        required
        type="text"
        name="content"
        placeholder="Start writing..."
        value={values.content}
        onChange={onChange}
      ></textarea>

      <button disabled={loadingSave} className="btn" type="submit">
        Save {loadingSave && <Loader />}
      </button>
    </form>
  )
}
