import React, { useState } from "react"
import Loader from "../Loader/Loader"

import CanvasImage from "../../utils/CanvasImage"

export default function NoteForm({
  title,
  content,
  image,
  loadingSave,
  setLoadingSave,
  action,
  error,
}) {
  const [values, setValues] = useState({
    title: title || "",
    content: content || "",
    image: image || ""
  })
  const [source, setSource] = useState(null)

  // update the state when a user types in the form
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  function handleFileChange(event) {
    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      console.log(e)
      setSource(reader.result)
    })

    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <form
      className="new-note"
      onSubmit={(e) => {
        e.preventDefault()
        setLoadingSave(true)
        action({
          variables: {
            ...values
          },
        })
      }}
    >
      
      <div>
      <div className="note-image">
        <input
          type="file"
          accept="image/*"
          name="image"
          id="fileInput"
          onChange={handleFileChange}
          style={{
            maxWidth: "100%",
            display: "none",
            visibility: "hidden",
          }}
        />

        {values.image && <img alt="" src={values.image} />}
        <label htmlFor="fileInput">Add Image <i className="bx bx-image-add" /></label>
      </div>
      {source && <CanvasImage setValues={setValues} values={values} source={source} />}
      </div>

      {error && (
        <div className="error">Error saving the note. Please retry. {error.message}</div>
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
