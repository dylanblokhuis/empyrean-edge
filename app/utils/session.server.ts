import { createCookieSessionStorage } from "remix";

export let sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [APP_SECRET],
    secure: ENVIRONMENT === "production",
  },
});

export let { getSession, commitSession, destroySession } = sessionStorage;