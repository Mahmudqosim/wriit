import { BrowserRouter, Route, Routes } from "react-router-dom"
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "apollo-link-context"

import Favorites from "./pages/Favorites/Favorites"
import Home from "./pages/Home/Home"
import MyNotes from "./pages/MyNotes/MyNotes"

import Navbar from "./components/Navbar/Navbar"

import "./App.css"
import NotePage from "./pages/Note/NotePage"
import Header from "./components/Header/Header"
import Signup from "./pages/Signup/Signup"
import Signin from "./pages/Signin/Signin"
import NewNote from "./pages/NewNote/NewNote"
import EditNote from "./components/EditNote/EditNote"
import Profile from "./pages/Profile/Profile"
import EditProfile from "./pages/EditProfile/EditProfile"

// API URI & cache
const uri = "https://wriit.onrender.com/api"
const httpLink = createHttpLink({ uri })
const cache = new InMemoryCache()

// check for a token and return the headers to the context
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem("token") || "",
    },
  }
})

// create the Apollo client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  resolvers: {
/*     Query: {
      isLoggedIn() {
        return !!localStorage.getItem("token")
      },
    }, */
  },
  connectToDevTools: true,
})

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <ApolloProvider client={client}>
          <Navbar />

          <div className="main">
            <Header />

            <div className="page">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/mynotes" element={<MyNotes />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/note/:id" element={<NotePage />} />
                <Route path="/edit/:id" element={<EditNote />} />
                <Route path="/new" element={<NewNote />} />
                <Route path="/profile/edit" element={<EditProfile />} />
                <Route path="/profile/:username" element={<Profile />} />
              </Routes>
            </div>
          </div>
        </ApolloProvider>
      </div>
    </BrowserRouter>
  )
}
