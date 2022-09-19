import React from "react"
import { Canvas } from "@layerhub-pro/react"
import ContextMenu from "../ContextMenu"

export default function () {
  return (
    <div style={{ flex: 1, display: "flex", position: "relative" }}>
      <ContextMenu />
      <Canvas
        config={{
          background: "#f1f2f6",
          controlsPosition: {
            rotation: "BOTTOM",
          },
          type: "CUSTOMIZATION",
          shadow: {
            blur: 4,
            color: "#fcfcfc",
            offsetX: 0,
            offsetY: 0,
          },
        }}
      />
    </div>
  )
}
