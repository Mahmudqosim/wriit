import React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import auth from "../../auth/auth-helper"
// import Logo from "../Logo/Logo"

import "./Navbar.css"

export default function Navbar() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  
  const isLoggedIn = auth.isAuthenticated()

  function activeLink(link) {
    if (link !== pathname) return false

    return true
  }

  if (pathname === "/signin" || pathname === "/signup") {
    return <div className="nav" style={{ display: "none" }}></div>
  }

  return (
    <div className="nav">
      <div className="nav__items">
        {/*         <Link to="/">
          <Logo size="2.2rem" />
        </Link> */}

        <Link to="/" className={`nav__item ${activeLink("/") ? "active" : ""}`}>
          <i className="bx bx-home-alt"></i>
          <span>Home</span>
        </Link>

        <Link
          to="/new"
          className={`nav__item ${activeLink("/new") ? "active" : ""}`}
        >
          <i className="bx bx-pencil"></i>
          <span>New</span>
        </Link>

        <Link
          to="/mynotes"
          className={`nav__item ${activeLink("/mynotes") ? "active" : ""}`}
        >
          <i className="bx bx-file"></i>
          <span>Notes</span>
        </Link>

        <Link
          to="/favorites"
          className={`nav__item ${activeLink("/favorites") ? "active" : ""}`}
        >
          <i className="bx bx-star"></i>
          <span>Favorites</span>
        </Link>

        {isLoggedIn && <Link
          to="/favorites"
          className="nav__item"
          onClick={() => {
            auth.clearJWT(() => {
              navigate("/signin")
            })
          }}
        >
          <i
            style={{
              color: "#eb3d1e",
              fontWeight: 'bold'
            }}
            className="bx bx-log-out"
          ></i>
          <span>Logout</span>
        </Link>}
      </div>
    </div>
  )
}
