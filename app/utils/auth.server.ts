import db, { User } from "~/utils/db.server";
import { Authenticator, AuthorizationError, LocalStrategy } from "remix-auth";
import { sessionStorage } from "~/utils/session.server";

// Create an instance of the authenticator, pass a generic with what your
// strategies will return and will be stored in the session
export let authenticator = new Authenticator<User>(sessionStorage);

// Add the local strategy
authenticator.use(
  new LocalStrategy(
    // The strategy will use this URL to redirect the user in case it's logged-in
    // And to know if it should grab the username and password from the request
    // body in case of a POST request
    { loginURL: "/login", usernameField: "email" },
    async (email, password) => {
      const user = await db.user.findUnique({
        where: {
          email: email
        }
      });

      if (!user) throw new AuthorizationError("No user found");
      if (user.password === password) throw new AuthorizationError("No matching password");

      return user;
    }
  ),
  // The name of the strategy, every strategy has a default name, only add one
  // if you want to override it (e.g. setup more than one strategy)
  "local"
);