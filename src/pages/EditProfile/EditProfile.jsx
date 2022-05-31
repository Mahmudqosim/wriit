import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery } from "@apollo/client"
import auth from "../../auth/auth-helper"
import { GET_AVATAR, GET_ME } from "../../gql/query"
import { MetaData } from "../../components/MetaData"
import ProfileForm from "../../components/ProfileForm/ProfileForm"
import { UPDATE_PROFILE } from "../../gql/mutation"

export default function EditProfile() {
  const [loadingSave, setLoadingSave] = useState(false)
  const isLoggedIn = auth.isAuthenticated()
  const [username, setUsername] = useState("")

  // const { username } = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/signin", {
        state: { from: location },
      })
    }
  }, [isLoggedIn, location, navigate])

  const { data: userData } = useQuery(GET_ME)

  useEffect(() => {
    if (userData) {
      setUsername(userData.me.username)
    }
  }, [userData])

  const [editProfile] = useMutation(UPDATE_PROFILE, {
    refetchQueries: [{ query: GET_AVATAR }, { query: GET_ME }],
    onCompleted: (data) => {
      setLoadingSave(false)
      // when complete, redirect the user to the note page
      navigate(`/profile/${username}`)
    },
    onError: (error) => {
      console.log(error.message)
      setLoadingSave(false)
    },
  })

  return (
    <div>
      <MetaData title="Update Profile" />
      {userData && (
        <ProfileForm
          user={userData.me}
          setUsername={setUsername}
          loadingSave={loadingSave}
          setLoadingSave={setLoadingSave}
          action={editProfile}
          error={userData.error}
        />
      )}
    </div>
  )
}
