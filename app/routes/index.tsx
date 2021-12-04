import { MetaFunction, LoaderFunction, ActionFunction, useLoaderData, Form } from "remix";
import db, { User } from "~/utils/db.server";
import { authenticator } from "~/utils/auth.server";

export let loader: LoaderFunction = async ({ request }) => {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
};

export let action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate("local", request, {
    successRedirect: "/",
  });
}

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  return (
    <div className="remix__page">
      <main>
        <h2 className="text-red-600">Welcome to Remix!</h2>
      </main>
    </div>
  );
}
