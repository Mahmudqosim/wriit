import React from "react"
import { useParams } from "react-router-dom"
import { useQuery, gql } from "@apollo/client"
import Loader from "../../components/Loader/Loader"
import Note from "../../components/Note/Note"
import { MetaData } from "../../components/MetaData"

const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      title
      createdAt
      content
      image
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`

export default function NotePage() {
  const { id } = useParams()

  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } })

  if (loading) return <Loader type="main" />

  if (error) {
    console.log(Object.create(error))
    if (error.graphQLErrors[0].extensions.exception.kind && error.graphQLErrors[0].extensions.exception.kind === "ObjectId") {
      return (
        <div className="error">
          Note can't be found!.
        </div>
      )
    }

    return (
      <div className="error">
        Error! failed to fetch. Please reload the page.
      </div>
    )
  }

  return (
    <div>
      <MetaData
        title={data.note.title}
        description={`${data.note.title} by ${data.note.author.username}`}
      />
      <Note show="full" note={data.note} />
    </div>
  )
}
