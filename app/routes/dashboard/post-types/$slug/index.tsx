import { LoaderFunction, ErrorBoundaryComponent, useLoaderData, Link } from "remix";
import db, { Post, PostType, User } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request, params }) => {
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

export let ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
  return (
    <div className="flex flex-col items-center self-center mt-10">
      <h1 className="text-xl mb-0">Oh no :(</h1>
      <p className="mb-2 text-lg">The following error occurred:</p>
      <strong className="text-red-600">{error.message}</strong>
    </div>
  );
}

export default function DashboardPostTypesSlugRoute() {
  const postType = useLoaderData<PostType & {
    Post: (Post & {
      author: User;
    })[];
  }>();

  return (
    <div className="px-4 py-3">
      <h1 className="mb-4">{postType.plural}</h1>

      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Author
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {postType.Post.map(post => (
            <tr key={post.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {post.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{post.author.name}</div>
                <div className="text-sm text-gray-500">Admin</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  {post.status === "PUBLISHED" && "Published"}
                  {post.status === "DRAFT" && "Draft"}
                  {post.status === "TRASHED" && "Trashed"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {post.createdAt}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <Link to={`/dashboard/post-types/posts/${post.id}`} className="text-indigo-600 hover:text-indigo-900">Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
