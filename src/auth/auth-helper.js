const auth = {
  isAuthenticated() {
    if (typeof window == "undefined")
      return false

    if (localStorage.getItem('token'))
      return true
    else
      return false
  },
  clearJWT(cb) {
    if (typeof window !== "undefined")
      localStorage.removeItem('token')
    cb()
  }
}

export default auth
