import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from "@apollo/client"
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

// API URI & cache
const uri = process.env.API_URL
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
    Query: {
      isLoggedIn() {
        return !!localStorage.getItem("token")
      }
    }
  },
  connectToDevTools: true,
})


export default function App() {
  return (
    <BrowserRouter  forceRefresh={true}>
      <ApolloProvider client={client}>
        <Navbar />

        <div className="main">
          <Header title="Wriit - The Virtual Space for writers" />

          <div className="page">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mynotes" element={<MyNotes />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/note/:id" element={<NotePage />} />
              <Route path="/edit/:id" element={<EditNote />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/new" element={<NewNote />} />
            </Routes>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  )
}
