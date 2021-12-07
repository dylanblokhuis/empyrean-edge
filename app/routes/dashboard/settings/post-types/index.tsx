import { Link, LoaderFunction, useLoaderData } from "remix"
import db, { PostType } from "~/utils/db.server";

export let loader: LoaderFunction = async () => {
  const postTypes = await db.postType.findMany();

  return postTypes
};

export default function SettingsPostTypesRoute() {
  const postTypes = useLoaderData<PostType[]>();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1>Post types</h1>

        <Link className="button small" to="/dashboard/settings/post-types/create">
          Create new
        </Link>
      </div>

      <table>
        <thead>
          <tr>
            <th scope="col">
              Name
            </th>
            <th scope="col">
              Slug
            </th>
            <th scope="col">
              Base path
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
          {postTypes.map(postType => (
            <tr key={postType.id}>
              <td>{postType.plural}</td>
              <td>{postType.slug}</td>
              <td>{postType.basePath}</td>
              <td>{postType.createdAt}</td>
              <td>Edit</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
