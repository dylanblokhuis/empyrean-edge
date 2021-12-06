import { LoaderFunction, useLoaderData, redirect } from "remix"
import db, { Post } from "./utils/db.server";
import UrlPattern from "url-pattern";

export let loader: LoaderFunction = async ({ params, request }) => {
  /**
   * Check if page is cached
   */
  const cache = await caches.default;
  const cacheUrl = new URL(request.url);
  const cacheKey = new Request(cacheUrl.toString(), request);
  const cachedResponse = await cache.match(cacheKey)

  if (cachedResponse) {
    return cachedResponse
  }

  /**
   * Get the first matching post type
   */
  const route = `/` + (params['*'] || "")
  const postTypes = await db.postType.findMany();
  const postType = postTypes.find(postType => {
    if (postType.basePath) {
      const pattern = new UrlPattern(`${postType.basePath}:slug`);
      return pattern.match(route) !== null;
    }

    return true
  });
  if (!postType) return redirect("/404")

  if (route === "/home") {
    return redirect("/")
  }

  /**
   * Find the first post associated with the post type
   */
  const post = await db.post.findFirst({
    where: {
      slug: route === "/" ? "home" : route.replace(postType.basePath || "/", ""),
      postTypeId: postType.id
    }
  });

  if (!post) {
    return redirect("/404");
  }

  /**
   * Cache the response for 10 seconds
   */
  const response = new Response(JSON.stringify(post), {
    headers: {
      "Content-Type": "application/json"
    }
  });
  response.headers.append("Cache-Control", "s-maxage=10")
  await cache.put(cacheKey, response.clone())

  return response;
}

export default function all() {
  const post = useLoaderData<Post>();

  return (
    <div>
      <h1>{post?.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post?.content }} />
    </div>
  )
}
