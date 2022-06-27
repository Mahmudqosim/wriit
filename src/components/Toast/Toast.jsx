import React, { useRef, useState } from "react"
import { useEffect } from "react/cjs/react.development"

import "./Toast.css"

const Toast = ({ message, type, customButtons }) => {
  const [close, setClose] = useState(false)
  const toastRef = useRef(null)

  useEffect(() => {
    if (toastRef.current.classList.contains("close")) {
      setClose(false)
    }
  }, [message])

  return (
    <div ref={toastRef} className={`toast-wrapper ${close ? "close" : ""}`}>
      <div className={`toast ${type ? type : ""}`}>
        <div className="message">{message}</div>

        <div className="buttons">
          <button className="close" onClick={() => setClose(true)}>
            Close
          </button>

          {customButtons &&
            customButtons.map(({ text, cb, index }) => (
              <button key={`text${index}`} onClick={() => cb()}>
                {text}
              </button>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Toast
