import React from "react"
import { Navigate, Outlet } from "react-router-dom"

import auth from "../../auth/auth-helper"
import Signin from "../../pages/Signin/Signin"

export default function ProtectedRoutes() {
  return auth.isAuthenticated() ? <Outlet /> : <Navigate to={Signin} />
}
