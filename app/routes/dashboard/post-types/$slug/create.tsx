import { LinksFunction } from "remix";
import { ClientOnly } from "remix-utils"
import IsolatedBlockEditorClient from "~/components/general/IsolatedBlockEditor.client";

export const handle = {
  breadcrumb: "new"
};

export const links: LinksFunction = () => [
  {
    href: "https://cdn.jsdelivr.net/npm/@automattic/isolated-block-editor/build-browser/core.css",
    rel: "stylesheet"
  },
  {
    href: "https://cdn.jsdelivr.net/npm/@automattic/isolated-block-editor/build-browser/isolated-block-editor.css",
    rel: "stylesheet"
  },
]

export default function DashboardPostTypeCreate() {
  return (
    <div>
      <ClientOnly>
        <IsolatedBlockEditorClient />
      </ClientOnly>
    </div>
  )
}
