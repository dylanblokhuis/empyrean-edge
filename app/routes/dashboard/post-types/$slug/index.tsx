import { LoaderFunction, ErrorBoundaryComponent, useLoaderData, Link } from "remix";
import db, { Post, PostType, User } from "~/utils/db.server";

export const loader: LoaderFunction = async ({ request, params }) => {
  const slug = params.slug;
  const postType = await db.postType.findUnique({
    where: {
      slug: slug
    },
    include: {
      Post: {
        include: {
          author: {
            select: {
              name: true
            }
          }
        }
      },
    }
  });

  if (!postType) throw new Error("This post-type doesnt exist")

  return postType
};

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center self-center mt-10">
      <h1 className="text-xl mb-0">Oh no :(</h1>
      <p className="mb-2 text-lg">The following error occurred:</p>
      <strong className="text-red-600">{error.message}</strong>
    </div>
  );
}

type LoaderData = PostType & {
  Post: (Post & {
    author: User;
  })[];
}

export default function DashboardPostTypesSlugRoute() {
  const postType = useLoaderData<LoaderData>();

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="mb-4">{postType.plural}</h1>

        <Link className="button small" to={`/dashboard/post-types/${postType.slug}/create`}>
          New {postType.singular}
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">
              Title
            </th>
            <th scope="col">
              Author
            </th>
            <th scope="col">
              Status
            </th>
            <th scope="col">
              Date
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {postType.Post.map(post => (
            <tr key={post.id}>
              <td>
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
              </td>
              <td>
                <div className="text-sm text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">Admin</div>
              </td>
              <td>
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {post.status === "PUBLISHED" && "Published"}
                  {post.status === "DRAFT" && "Draft"}
                  {post.status === "TRASHED" && "Trashed"}
                </span>
              </td>
              <td className="text-sm text-gray-500">
                {post.createdAt}
              </td>
              <td className="text-right text-sm font-medium">
                <Link to={`/dashboard/post-types/posts/${post.id}`} className="link">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
