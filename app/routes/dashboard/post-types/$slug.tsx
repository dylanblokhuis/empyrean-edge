import { Outlet } from "remix";

export const handle = {
  breadcrumb: "Overview"
};

export default function DashboardPostTypesSlugOutlet() {
  return <Outlet />
}
