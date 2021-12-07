import { Outlet, LoaderFunction, useLoaderData, Link, ErrorBoundaryComponent } from "remix";
import { authenticator } from "~/utils/auth.server";
import db, { PostType } from "~/utils/db.server";

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const postTypes = await db.postType.findMany();

  return { postTypes };
};

export default function DashboardLayout() {
  const { postTypes } = useLoaderData<{ postTypes: PostType[] }>();
  return (
    <div className="dashboard-layout h-full">
      <nav className="w-full bg-gray-800 text-white py-2 px-3 text-sm">
        <Link to="/">
          Empyrean
        </Link>
      </nav>

      <div className="flex h-full">
        <aside className="bg-gray-800 w-full max-w-[200px] flex-none p-4 text-white border-t border-gray-700">
          <div className="flex flex-col mb-6">
            <span className="text-sm font-semibold mb-2 uppercase text-gray-400">Post types</span>

            <ul>
              {postTypes.map(postType => (
                <li className="mb-1" key={postType.id}>
                  <Link to={`/dashboard/post-types/${postType.slug}`}>
                    {postType.plural}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col">
            <span className="text-sm font-semibold mb-2 uppercase text-gray-400">Settings</span>

            <ul>
              <li className="mb-1">
                <Link to="/dashboard/settings/post-types">
                  Post types
                </Link>
              </li>
            </ul>
          </div>

        </aside>
        <main className="w-full py-4 px-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
