import React, { useEffect, useState } from "react"
import { useMutation, gql } from "@apollo/client"
import { useNavigate } from "react-router-dom"
import { MetaData } from "../../components/MetaData"
import { GET_AVATAR } from "../../gql/query"

import "../auth.css"
import Loader from "../../components/Loader/Loader"
import auth from "../../auth/auth-helper"

const SIGNIN_USER = gql`
  mutation signIn($email: String, $password: String!) {
    signIn(email: $email, password: $password)
  }
`

export default function Signup() {
  const isLoggedIn = auth.isAuthenticated()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loadingAuth, setLoadingAuth] = useState(false)

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/")
    }
  }, [isLoggedIn, navigate])

  const [signIn, { error }] = useMutation(SIGNIN_USER, {
    refetchQueries: [{ query: GET_AVATAR }],
    onCompleted: (data) => {
      // store the token
      localStorage.setItem("token", data.signIn)
      setLoadingAuth(false)

      // redirect the user to the homepage
      navigate("/")
    },
    onError: () => {
      setLoadingAuth(false)
    },
  })

  // Update the state when a user types in the form
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoadingAuth(true)
    signIn({
      variables: {
        ...values,
      },
    })
  }

  return (
    <>
      <MetaData
        title="Signin"
        description="Sign in to  Wriit(The Virtual Space for writers)"
      />

      <div className="auth">
        <h1>Sign in | Wriit</h1>
        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="error">{error.message}</div>}

          <div className="form-input">
            <label htmlFor="email">Email:</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
            />
          </div>

          <div className="form-input password-toggle">
            <label htmlFor="password">Password:</label>
            <input
              required
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <i
              className={showPassword ? "bx bx-hide" : "bx bx-show"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          <button disabled={loadingAuth} className="btn" type="submit">
            Submit {loadingAuth && <Loader />}
          </button>
        </form>
      </div>
    </>
  )
}
