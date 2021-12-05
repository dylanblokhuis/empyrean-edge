import { MetaFunction, LoaderFunction, ActionFunction, useLoaderData, Form } from "remix";
import { authenticator } from "~/utils/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
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
