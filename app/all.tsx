import { LoaderFunction, useLoaderData, redirect } from "remix"
import db, { Post } from "./utils/db.server";
import UrlPattern from "url-pattern";

export let loader: LoaderFunction = async ({ params }) => {
  const route = params['*']

  if (!route) throw new Error("This shouldnt happen")

  const postTypes = await db.postType.findMany();

  const firstMatch = postTypes.find(postType => {
    if (postType.basePath) {
      const pattern = new UrlPattern(`${postType.basePath}(/:slug)`);
      return pattern.match(route) !== null;
    }

    return true
  });

  console.log(firstMatch);

  const page = await db.post.findFirst({
    where: {
      slug: route,
      postType: {
        OR: [{
          slug: "posts"
        }, {
          slug: "pages"
        }]
      }
    }
  })

  if (!page) {
    return redirect("/404");
  }

  return page
}

export default function all() {
  const page = useLoaderData<Post>();
  return (
    <div>
      <h1>{page.title}</h1>

    </div>
  )
}
