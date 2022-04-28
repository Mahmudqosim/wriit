import React from "react"
import { Helmet } from "react-helmet"

export const MetaData = ({ title, description }) => {
  return (
    <Helmet>
      <title>Wriit | {title}</title>
      <meta
        name="description"
        content={description}
      />
    </Helmet>
  )
}
