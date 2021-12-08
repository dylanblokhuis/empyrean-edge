import { ActionFunction, Form, LoaderFunction, redirect, useActionData } from "remix";
import { authenticator } from "~/utils/auth.server";

export const action: ActionFunction = async ({ request }) => {
  // Authenticate the request, after that it will redirect to the defined URLs
  // and set the user in the session if it's a success
  await authenticator.authenticate("local", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};

export const loader: LoaderFunction = async ({ request }) => {
  // If the user is already authenticated redirect to /dashboard directly
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/dashboard",
  });
};

export default function Login() {
  const error = useActionData();

  return (
    <Form method="post" className="flex flex-col items-center max-w-xs my-5 mx-auto">
      <input className="mb-4 w-full" type="email" name="email" placeholder="E-mail" />
      <input className="mb-4 w-full" type="password" name="password" placeholder="Password" />

      <button className="button w-full" type="submit">
        Login
      </button>

      {error && <span className="text-red-600 font-semibold mt-3">{error}</span>}
    </Form>
  )
}
