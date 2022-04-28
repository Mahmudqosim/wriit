import React from "react"

export default function Logo({ size }) {
  return (
    <div className="nav__item logo">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xml-space="preserve"
        version="1.1"
        style={{
          shapeRendering: "geometricPrecision",
          textRendering: "geometricPrecision",
          imageRendering: "optimizeQuality",
          fillRule: "evenodd",
          clipRule: "evenodd",
          fill: "#0E8A9B",
          width: size,
        }}
        viewBox="0 0 14.33 16.67"
        xmlns-xlink="http://www.w3.org/1999/xlink"
      >
        <g id="Layer_x0020_1">
          <metadata id="CorelCorpID_0Corel-Layer" />
          <path d="M2.03 13.04c0.08,-0.19 0.2,-0.36 0.36,-0.49l10.09 -8.05c0.74,-0.6 1.85,-0.06 1.85,0.9l0 10.13c0,0.63 -0.51,1.14 -1.14,1.14l-10.86 0c-0.8,0 -1.35,-0.79 -1.07,-1.54l0.77 -2.09z" />
          <path d="M12.3 3.63c-0.07,0.2 -0.2,0.37 -0.36,0.5l-10.08 8.04c-0.75,0.6 -1.86,0.07 -1.86,-0.89l0 -10.14c0,-0.63 0.51,-1.14 1.14,-1.14l10.87 0c0.79,0 1.35,0.8 1.07,1.54l-0.78 2.09z" />
        </g>
      </svg>
    </div>
  )
}
