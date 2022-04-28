import React from "react"
import { Link } from "react-router-dom"
import Logo from "../Logo/Logo"
import auth from "../../auth/auth-helper"

import "./Navbar.css"

export default function Navbar() {
  const isLoggedIn = auth.isAuthenticated()

  return (
    <div className="nav">
      <Link to="/">
        <Logo size="2.2rem" />
      </Link>

      <Link to="/" className="nav__item">
        <i className="bx bx-home-alt"></i>
      </Link>

      {isLoggedIn && (
        <>
          <Link to="/new" className="nav__item">
            <i className="bx bx-pencil"></i>
          </Link>

          <Link to="/mynotes" className="nav__item">
            <i className="bx bx-file"></i>
          </Link>

          <Link to="/favorites" className="nav__item">
            <i className="bx bx-star"></i>
          </Link>
        </>
      )}
    </div>
  )
}
