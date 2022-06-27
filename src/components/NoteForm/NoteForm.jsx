import React, { useState } from "react"
import Loader from "../Loader/Loader"

import CanvasImage from "../../utils/CanvasImage"
import Toast from "../Toast/Toast"

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
    image: image || "",
  })
  const [source, setSource] = useState(null)

  const [errMsg, setErrMsg] = useState("")
  const [showToast, setShowToast] = useState(false)

  // update the state when a user types in the form
  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  function handleFileChange(event) {
    const FILE_TYPES = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
      "image/svg+xml",
    ]

    if (event.target.files.length < 1) {
      return
    }

    if (!FILE_TYPES.includes(event.target.files[0].type)) {
      setErrMsg("File type should be either a png, jpg, webp, svg")

      setShowToast(true)
      return
    }

    if (event.target.files[0].size > 1024 * 1024) {
      setErrMsg("Image size should not be larger than 1MB")
      setShowToast(true)
      return
    }

    const reader = new FileReader()

    reader.addEventListener("load", (e) => {
      setSource(reader.result)
    })

    reader.readAsDataURL(event.target.files[0])
  }

  return (
    <>
      {showToast && <Toast message={errMsg} type="danger" />}
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
            <label htmlFor="fileInput">
              Add Image <i className="bx bx-image-add" />
            </label>
          </div>
          {source && (
            <CanvasImage
              setValues={setValues}
              values={values}
              source={source}
            />
          )}
        </div>

        {error && (
          <div className="error">
            Error saving the note. Please retry. {error.message}
          </div>
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
    </>
  )
}
