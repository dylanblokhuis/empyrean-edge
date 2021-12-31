import IsolatedBlockEditor from "./IsolatedBlockEditor"


export default function IsolatedBlockEditorClient() {
  window.wp = {
    galleryBlockV2Enabled: true
  }
  return (
    <div>
      <IsolatedBlockEditor
        settings={{
          iso: {
            allowApi: false
          }
        }}
      />
    </div>
  )
}
