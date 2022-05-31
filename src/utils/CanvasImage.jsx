import React, { useEffect, useRef } from "react"

export default function CanvasImage({ source, setValues, type }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    let originalWidthToHeightRatio
    const activeImage = new Image()
    const canvas = canvasRef.current
    const context = canvas.getContext("2d")
    const IMAGE_HEIGHT = type === 'profile' ? 140 : 180

    activeImage.addEventListener("load", () => {
      console.log(activeImage)
      originalWidthToHeightRatio = activeImage.width / activeImage.height

      resizeImage(activeImage.width, activeImage.height)
    })

    activeImage.src = source

    function resizeImage() {
      const heightValue = IMAGE_HEIGHT
      const widthValue = IMAGE_HEIGHT * originalWidthToHeightRatio

      canvas.width = widthValue
      canvas.height = heightValue

      context.drawImage(
        activeImage,
        0,
        0,
        Math.floor(widthValue),
        Math.floor(heightValue)
      )

      if(type === 'profile') {
        setValues((prev) => ({
          ...prev,
          avatar: canvas.toDataURL(),
        }))

        return
      }

      setValues((prev) => ({
        ...prev,
        image: canvas.toDataURL(),
      }))
    }
  }, [setValues, source, type])

  return (
    <canvas
      width="1200"
      height="900"
      style={{
        maxWidth: "100%",
        display: "none",
        visibility: "hidden",
      }}
      ref={canvasRef}
    ></canvas>
  )
}
