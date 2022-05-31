import { gql } from "@apollo/client"

const EDIT_NOTE = gql`
  mutation updateNote(
    $id: ID!
    $title: String!
    $content: String!
    $image: String
  ) {
    updateNote(id: $id, title: $title, content: $content, image: $image) {
      id
      title
      content
      createdAt
      favoriteCount
      favoritedBy {
        id
        username
      }
      author {
        username
        id
      }
    }
  }
`

const DELETE_NOTE = gql`
  mutation deleteNote($id: ID!) {
    deleteNote(id: $id)
  }
`

const TOGGLE_FAVORITE = gql`
  mutation toggleFavorite($id: ID!) {
    toggleFavorite(id: $id) {
      id
      favoriteCount
    }
  }
`

const UPDATE_PROFILE = gql`
  mutation updateUser(
    $id: ID!
    $username: String!
    $email: String!
    $avatar: String
    $bio: String
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      avatar: $avatar
      bio: $bio
    ) {
      id
      username
      email
      avatar
      bio
    }
  }
`

export { EDIT_NOTE, DELETE_NOTE, TOGGLE_FAVORITE, UPDATE_PROFILE }
