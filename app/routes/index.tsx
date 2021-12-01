import { MetaFunction, LoaderFunction, ActionFunction, useLoaderData, Form } from "remix";
import db, { User } from "~/utils/db.server";
import { v4 } from 'uuid'

// Loaders provide data to components and are only ever called on the server, so
// you can connect to a database or run any server side code you want right next
// to the component that renders it.
// https://remix.run/api/conventions#loader
export let loader: LoaderFunction = async ({ request }) => {
  const users = await db.user.findMany();
  return users
};

export let action: ActionFunction = async () => {
  const id = v4();
  await db.user.create({
    data: {
      email: `${id}@example.org`,
      password: "hello-world",
      name: id
    }
  });

  return true
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
  const data = useLoaderData<User[] | undefined>();

  console.log(data);

  return (
    <div className="remix__page">
      <main>
        <h2 className="text-red-600">Welcome to Remix!</h2>

        {data && Array.isArray(data) && (
          <>
            Users:

            <div>
              {data.map(user => (
                <p key={user.id}>{user.name}</p>
              ))}
            </div>
          </>
        )}


        <Form method="post">
          <button type="submit">Create new user!</button>
        </Form>

      </main>
    </div>
  );
}
