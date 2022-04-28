import React, { useEffect } from "react"
import auth from "../../auth/auth-helper"
import { useLocation, useNavigate } from "react-router-dom"
import { MetaData } from "../../components/MetaData"
import { useQuery } from "@apollo/client"
import { GET_MY_NOTES } from "../../gql/query"
import Loader from "../../components/Loader/Loader"
import NoteFeed from "../../components/NoteFeed/NoteFeed"

export default function MyNotes() {
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

  const { loading, error, data } = useQuery(GET_MY_NOTES)

  // display the loader in UI if the data is loading
  if (loading) return <Loader type="main" />

  if (error)
    return (
      <div className="error">
        {`Error! ${error.message}. Please reload the page.`}
      </div>
    )

  return (
    <>
      <MetaData title="My Notes" />
      {data.me.notes.length !== 0 ? <NoteFeed notes={data.me.notes} /> : <p>No notes yet</p>}
    </>
  )
}
