import React, { useState } from "react"
import Loader from "../Loader/Loader"

import CanvasImage from "../../utils/CanvasImage"
import "./ProfileForm.css"
import { useEffect } from "react/cjs/react.development"

export default function ProfileForm({
  user,
  loadingSave,
  setUsername,
  setLoadingSave,
  action,
  error,
}) {
  const [values, setValues] = useState({
    id: user.id || "",
    username: user.username || "",
    email: user.email || "",
    bio: user.bio || "",
    avatar: user.avatar || "",
  })
  const [words, setWords] = useState(250)
  const [source, setSource] = useState(null)

  useEffect(() => {
    if(user) setWords(250 - user.bio.length)
  }, [user])

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
      className="profile-form"
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
        <div className="profile-image">
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

          {values.avatar && <img alt="" src={values.avatar} />}
          <label htmlFor="fileInput">
            <span>Change Image</span>
            <i className="bx bx-image-add" />
          </label>
        </div>
        {source && (
          <CanvasImage
            setValues={setValues}
            type="profile"
            values={values}
            source={source}
          />
        )}
      </div>

      <input
        required
        type="text"
        name="username"
        placeholder="Username..."
        value={values.username}
        onChange={(e) => {
          setUsername(e.target.value)
          onChange(e)
        }}
      />

      <input
        required
        type="text"
        name="email"
        placeholder="Email address..."
        value={values.email}
        onChange={onChange}
      />

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '.25rem'
      }}>
        <textarea
          required
          type="text"
          name="bio"
          placeholder="About you..."
          value={values.bio}
          onChange={(e) => {
            setWords(250 - e.target.value.length)
            onChange(e)
          }}
          maxLength={250}
        ></textarea>
        <span>Words remaining: {words}</span>
      </div>

      {error && (
        <div className="error">
          Error updating profile. Please retry. {error.message}
        </div>
      )}

      <button disabled={loadingSave} className="btn" type="submit">
        Save {loadingSave && <Loader />}
      </button>
    </form>
  )
}
