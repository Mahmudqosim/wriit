import React, { useEffect, useState } from "react"
import { useQuery, useMutation } from "@apollo/client"
import { useParams, useNavigate, useLocation } from "react-router-dom"

import { GET_NOTE, GET_ME } from "../../gql/query"
import { EDIT_NOTE } from "../../gql/mutation"
import Loader from "../Loader/Loader"
import auth from "../../auth/auth-helper"
import NoteForm from "../../components/NoteForm/NoteForm"
import { MetaData } from "../../components/MetaData"

import './EditNote.css'

export default function EditNote() {
  const [loadingSave, setLoadingSave] = useState(false)
  const isLoggedIn = auth.isAuthenticated()

  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", {
        state: { from: location },
      })
    }
  }, [isLoggedIn, location, navigate])

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })

  const { data: userData } = useQuery(GET_ME)

  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id,
    },
    onCompleted: () => {
      navigate(`/note/${id}`)
    },
  })


  if (loading) return <Loader type="main" />

  if (error) return <div className="error">Error! Note not found</div>

  if (userData && userData.me.id !== data.note.author.id) {
    return <div className="error">You do not have access to edit this note</div>
  }

  return (
    <>
      <MetaData title="New Note" />
      <NoteForm
        content={data.note.content}
        title={data.note.title}
        image={data.note.image}
        loadingSave={loadingSave}
        setLoadingSave={setLoadingSave}
        action={editNote}
        error={error}
      />
    </>
  )
}
