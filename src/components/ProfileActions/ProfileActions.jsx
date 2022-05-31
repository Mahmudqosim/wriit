import React from "react"
import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { GET_ME } from "../../gql/query"

import './ProfileActions.css'

export default function ProfileActions({ user }) {
  const { loading, error, data } = useQuery(GET_ME)

  if (loading) return <p>Loading...</p>

  if (error) return <p>Error!</p>

  console.log(data)

  return (
    <>
      {data.me.id === user.id && (
        <Link className="profile-actions" to={`/profile/edit`}>
          <button>
            <i className="bx bx-pencil" />
            <span>Edit Profile</span>
          </button>
        </Link>
      )}
    </>
  )
}
