import { createCookieSessionStorage } from "remix";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [APP_SECRET],
    secure: ENVIRONMENT === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;