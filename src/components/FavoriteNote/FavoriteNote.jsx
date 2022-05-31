import React, { useState } from "react"
import { useMutation } from "@apollo/client"
import { TOGGLE_FAVORITE } from "../../gql/mutation"
import { GET_MY_FAVORITES } from "../../gql/query"

export default function FavoriteNote({ noteId, favoriteCount, me }) {
  const [count, setCount] = useState(favoriteCount)

  const [favorited, setFavorited] = useState(
    me.favorites.filter((note) => note.id === noteId).length > 0
  )

  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: noteId,
    },
    refetchQueries: [{ query: GET_MY_FAVORITES }, ],
  })

  return (
    <>
      {favorited ? (
        <button
          className="btn-link"
          onClick={() => {
            toggleFavorite()
            setFavorited(false)
            setCount(count - 1)
          }}
        >
          {count} <i className="bx bxs-heart" />
        </button>
      ) : (
        <button
          className="btn-link"
          onClick={() => {
            toggleFavorite()
            setFavorited(true)
            setCount(count + 1)
          }}
        >
          {count} <i className="bx bx-heart" />
        </button>
      )}
    </>
  )
}
