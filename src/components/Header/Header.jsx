import { useQuery, gql } from "@apollo/client"
import React from "react"
import { Link, useNavigate } from "react-router-dom"

import auth from "../../auth/auth-helper"
import "./Header.css"

const GET_AVATAR = gql`
  query Query {
    me {
      avatar
      username
    }
  }
`

export default function Header({ title }) {
  const isLoggedIn = auth.isAuthenticated()
  const navigate = useNavigate()

  const { data } = useQuery(GET_AVATAR)

  return (
    <div className="header">
      <h1>{title}</h1>

      {isLoggedIn ? (
        <div className="user-actions">
          <button
            onClick={() => {
              auth.clearJWT(() => {
                navigate("/signin")
              })
            }}
          >
            <i className="bx bx-log-out" /> Log Out{" "}
          </button>
          <img src={data && data.me.avatar} alt={data && data.me.username} />
        </div>
      ) : (
        <div className="user-actions">
          <Link to={"/signin"}>Sign In</Link>/
          <Link to={"/signup"}>Sign Up</Link>
        </div>
      )}
    </div>
  )
}
