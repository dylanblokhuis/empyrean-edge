import { Outlet } from "remix";

export const handle = {
  breadcrumb: "Post types"
};

export default function SettingsPostTypesOutlet() {
  return <Outlet />
}
