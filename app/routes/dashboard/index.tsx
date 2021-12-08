import { MetaFunction, Link } from "remix";

// https://remix.run/api/conventions#meta
export const meta: MetaFunction = () => {
  return {
    title: "Dashboard",
  };
};

// https://remix.run/guides/routing#index-routes
export default function DashboardIndexRoute() {
  return (
    <main>
      <h1>This is the dashboard</h1>
    </main>
  );
}
