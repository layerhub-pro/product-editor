import React from "react"
import { Block } from "baseui/block"
import ReactPlayer from "react-player"
import { useEditor } from "@layerhub-pro/react"
import Loading from "~/components/Loading"
import useDesignEditorPages from "~/hooks/useDesignEditorScenes"

function Video() {
  const editor = useEditor()
  const scenes = useDesignEditorPages()
  const [loading, setLoading] = React.useState(true)
  const [state, setState] = React.useState({
    video: "",
  })

  const makePreview = React.useCallback(async () => {
    const template = editor.scene.exportToJSON()
    const clips = scenes.map((scene) => {
      const currentScene = editor.scene.exportToJSON()
      if (scene.id === currentScene.id) {
        return {
          duration: scene.duration! / 1000,
          layers: currentScene.layers,
        }
      }
      return {
        duration: 5,
        layers: scene.layers,
      }
    })

    const options = {
      duration: 5,
      fps: 25,
      dimension: template.frame,
      scenes: clips,
    }
    console.log({ options })

    fetch("https://render.layerhub.io/render", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    })
      .then((res) => {
        return res.json()
      })
      .then((res) => {
        setState({ video: res.url })
        setLoading(false)
      })
      .catch((err) => console.error(err))
  }, [editor])

  React.useEffect(() => {
    makePreview()
  }, [editor])

  return (
    <Block $style={{ flex: 1, alignItems: "center", justifyContent: "center", display: "flex", padding: "5rem" }}>
      {loading ? (
        <Loading text="Generating preview" />
      ) : (
        <ReactPlayer
          muted={false}
          className="react-player"
          width={"100%"}
          height={"100%"}
          controls
          autoPlay
          url={state.video}
        />
      )}
    </Block>
  )
}

export default Video
