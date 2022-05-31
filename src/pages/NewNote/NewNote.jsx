import React, { useEffect, useState } from "react"
import auth from "../../auth/auth-helper"
import { useLocation, useNavigate } from "react-router-dom"
import { useMutation, gql } from "@apollo/client"

import { MetaData } from "../../components/MetaData"
import { GET_NOTES, GET_MY_NOTES } from "../../gql/query"

import "./NewNote.css"
import NoteForm from "../../components/NoteForm/NoteForm"

const NEW_NOTE = gql`
  mutation newNote($title: String!, $content: String!, $image: String) {
    newNote(title: $title, content: $content, image: $image) {
      id
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`

export default function NewNote({ content, action }) {
  const [loadingSave, setLoadingSave] = useState(false)
  const isLoggedIn = auth.isAuthenticated()

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", {
        state: { from: location },
      })
    }
  }, [isLoggedIn, location, navigate])

  const [data, {  error }] = useMutation(NEW_NOTE, {
    refetchQueries: [{ query: GET_MY_NOTES }, { query: GET_NOTES }],
    onCompleted: (data) => {
      setLoadingSave(false)
      // when complete, redirect the user to the note page
      navigate(`/note/${data.newNote.id}`)
    },
    onError: () => {
      setLoadingSave(false)
    },
  })

  return (
    <>
      <MetaData title="New Note" />
      <div>

        <NoteForm loadingSave={loadingSave} setLoadingSave={setLoadingSave} action={data} error={error} />
      </div>
    </>
  )
}
