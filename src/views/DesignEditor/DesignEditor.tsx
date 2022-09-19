import useEditorType from "~/hooks/useEditorType"
import CustomizationEditor from "./CustomizationEditor"
import useDesignEditorContext from "~/hooks/useDesignEditorContext"
import Preview from "./components/Preview"

function DesignEditor() {
  const { displayPreview, setDisplayPreview } = useDesignEditorContext()

  return (
    <>
      {displayPreview && <Preview isOpen={displayPreview} setIsOpen={setDisplayPreview} />}

      <CustomizationEditor />
    </>
  )
}

export default DesignEditor
