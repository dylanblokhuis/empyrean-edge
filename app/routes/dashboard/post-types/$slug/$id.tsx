import { LoaderFunction, ErrorBoundaryComponent, useLoaderData, Link } from "remix";
import db, { Post, PostType, User } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request, params }) => {
  const id = params.id;
  const post = await db.post.findUnique({
    where: {
      id: id
    },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });

  if (!post) throw new Error("This post doesnt exist")

  return post;
};

export default function DashboardPostTypesSlugIdRoute() {
  const post = useLoaderData<Post & {
    author: User;
  }>();

  return (
    <div>
      {post.title}
    </div>
  )
}
