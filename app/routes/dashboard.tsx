import { Outlet } from "remix";

export default function DashboardLayout() {
  return (
    <div className="dashboard-layout h-full">
      <nav className="w-full bg-gray-800 text-white py-2 px-3 text-sm">
        Empyrean
      </nav>

      <div className="flex h-full">
        <aside className="bg-gray-800 w-full max-w-[200px] flex-none p-4 text-white">
          <ul>
            <li>Pages</li>
            <li>Posts</li>
          </ul>
        </aside>
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
