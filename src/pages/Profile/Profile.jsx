import React, { useEffect } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useQuery } from "@apollo/client"
import Loader from "../../components/Loader/Loader"
import NoteFeed from "../../components/NoteFeed/NoteFeed"
import { MetaData } from "../../components/MetaData"
import { GET_USER } from "../../gql/query"
import auth from "../../auth/auth-helper"
import ProfileActions from "../../components/ProfileActions/ProfileActions"

import "./Profile.css"

export default function Profile() {
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

  const { username } = useParams()

  const { loading, error, data } = useQuery(GET_USER, {
    variables: { username },
  })

  if (loading) return <Loader type="main" />

  if (data.user == null) {
    return <div className="error">Error! User "{username}" can't be found</div>
  }

  if (data) console.log(data)

  return (
    <div>
      <MetaData
        title={`${data.user.username}`}
        description={`${data.user.title} Profile`}
      />

      <div className="profile">
        <div className="profile-image">
          <img src={data.user.avatar} alt={data.user.username} />
        </div>

        <div className="profile-name">{data.user.username}</div>

        <div className="profile-bio">{data.user.bio}</div>

        <h2 className="num-notes">
          <i className="bx bx-notepad" /> {data.user.notes.length}{" "}
          {`${data.user.notes.length > 1 ? "Notes" : "Note"}`}
        </h2>

        <ProfileActions user={data.user} />
      </div>

      <div>
        {data.user.notes.length !== 0 ? (
          <NoteFeed notes={data.user.notes} />
        ) : (
          <p>No notes yet</p>
        )}
      </div>
    </div>
  )
}
