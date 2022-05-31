import React, { useEffect } from "react"
import auth from "../../auth/auth-helper"
import { useLocation, useNavigate } from "react-router-dom"
import { useQuery } from "@apollo/client"

import "../../components/MetaData"
import { MetaData } from "../../components/MetaData"
import Loader from "../../components/Loader/Loader"
import NoteFeed from "../../components/NoteFeed/NoteFeed"
import { GET_MY_FAVORITES } from "../../gql/query"

export default function Favorites() {
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

  const { loading, error, data } = useQuery(GET_MY_FAVORITES)

  // display the loader in UI if the data is loading
  if (loading) return <Loader type="main" />

  if (error)
    return (
      <>
        <MetaData title="Favorites" />
        <div className="error">
          {`Error! ${error.message}. Please reload the page.`}
        </div>
      </>
    )

  return (
    <>
      <MetaData title="Favorites" />
      {data.me.favorites.length !== 0 ? (
        <NoteFeed notes={data.me.favorites} />
      ) : (
        <p>No favorites yet</p>
      )}
    </>
  )
}
