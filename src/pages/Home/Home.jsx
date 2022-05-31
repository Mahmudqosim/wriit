import React from "react"
import { useQuery, gql } from "@apollo/client"

import "./Home.css"
import Loader from "../../components/Loader/Loader"
import NoteFeed from "../../components/NoteFeed/NoteFeed"

import "./Home.css"

const GET_NOTES = gql`
  query Query($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        title
        content
        image
        favoriteCount
        createdAt
        author {
          id
          username
          avatar
        }
      }
    }
  }
`

export default function HomePage() {
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES, {
    $cursor: "",
  })

  function fetchMoreNote() {
    fetchMore({
      variables: {
        cursor: data.noteFeed.cursor,
      },

      updateQuery: (previousResult, { fetchMoreResult }) => {
        return {
          noteFeed: {
            cursor: fetchMoreResult.noteFeed.cursor,
            hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
            notes: [
              ...previousResult.noteFeed.notes,
              ...fetchMoreResult.noteFeed.notes,
            ],
            __typename: "noteFeed",
          },
        }
      },
    })
  }

  // display the loader in UI if the data is loading
  if (loading) return <Loader type="main" />

  if (error)
    return (
      <div className="error">
        Error! failed to fetch. Please reload the page.
      </div>
    )

  // display the data in UI if the data is successful
  return (
    <div className="home">
      <NoteFeed notes={data.noteFeed.notes} />
      {/* Only display the Load More button if hasNextPage is true */}
      {data.noteFeed.hasNextPage && (
        <button className="btn" onClick={() => fetchMoreNote()}>
          Load more
        </button>
      )}
    </div>
  )
}
