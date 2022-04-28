import React from "react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { GET_ME } from "../../gql/query"
import DeleteNote from "../DeleteNote/DeleteNote"
import FavoriteNote from "../FavoriteNote/FavoriteNote"

export default function NoteUser({ note }) {
  const { loading, error, data } = useQuery(GET_ME)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  return (
    <>
      <button className="favorite">
        <FavoriteNote
          me={data.me}
          noteId={note.id}
          favoriteCount={note.favoriteCount}
        />
      </button>

      {data.me.id === note.author.id && (
        <>
          <Link
            to={`/edit/${note.id}`}
            style={{ color: "var(--main-color)", fontWeight: "700" }}
          >
            <i className="bx bx-pencil" /> Edit
          </Link>
          <DeleteNote noteId={note.id} />
        </>
      )}
    </>
  )
}
