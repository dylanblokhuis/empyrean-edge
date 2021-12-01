import type { MetaFunction, LoaderFunction } from "remix";
import db from "~/utils/db.server";

type IndexData = {
  resources: Array<{ name: string; url: string }>;
  demos: Array<{ name: string; to: string }>;
};

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  const user = await db.user.create({
    data: {
      email: "info@example.org",
      password: "hello-world",
      name: "Dylan"
    }
  });

  console.log(user);

  return true
};

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
        <h2 className="text-red-600">Create!</h2>
      </main>
    </div>
  );
}
