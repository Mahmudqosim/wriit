import { gql } from "@apollo/client"

const GET_NOTES = gql`
  query noteFeed($cursor: String) {
    noteFeed(cursor: $cursor) {
      cursor
      hasNextPage
      notes {
        id
        createdAt
        content
        image
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      title
      image
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`

const GET_AVATAR = gql`
  query Query {
    me {
      avatar
      username
    }
  }
`

const GET_MY_NOTES = gql`
  query me {
    me {
      id
      username
      notes {
        id
        title
        createdAt
        image
        content
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`
const GET_MY_FAVORITES = gql`
  query me {
    me {
      id
      username
      favorites {
        id
        title
        createdAt
        content
        image
        favoriteCount
        author {
          username
          id
          avatar
        }
      }
    }
  }
`

const GET_ME = gql`
  query me {
    me {
      id
      username
      email
      avatar
      bio
      favorites {
        id
      }
    }
  }
`

const GET_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      id
      username
      email
      avatar
      bio
      notes {
        id
        title
        image
        content
        createdAt
        updatedAt
        favoriteCount
        
        author {
          username
          email
          avatar
          id
        }
      }
    }
  }
`

export {
  GET_NOTES,
  GET_NOTE,
  GET_AVATAR,
  GET_MY_NOTES,
  GET_MY_FAVORITES,
  GET_ME,
  GET_USER,
}
