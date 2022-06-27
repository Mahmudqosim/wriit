import React from "react"
import { Route, Navigate } from "react-router-dom"
import auth from "../auth/auth-helper"

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = auth.isAuthenticated()

  return (
      <Route
        {...rest}
        element={(props) => {
          if (isLoggedIn === false) {
            return <Navigate to="/login" />
          }

          return <Component {...props} />
        }}
      />
  )
}

export default ProtectedRoute
