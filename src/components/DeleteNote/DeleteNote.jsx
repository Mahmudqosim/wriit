import React from "react"
import { useMutation } from "@apollo/client"
import {  useNavigate } from "react-router-dom"

import { DELETE_NOTE } from "../../gql/mutation"
import { GET_MY_NOTES, GET_NOTES } from "../../gql/query"

export default function DeleteNote({ noteId }) {
  const navigate = useNavigate()

  const [deleteNote] = useMutation(DELETE_NOTE, {
    variables: {
      id: noteId,
    },
    refetchQueries: [{ query: GET_MY_NOTES, GET_NOTES }],
    onCompleted: (data) => {
      // redirect the user to the "my notes" page
      navigate("/mynotes")
    },
  })

  return <button className="btn-link" onClick={deleteNote} name="Delete Note"><i className="bx bx-trash" /></button>
}
