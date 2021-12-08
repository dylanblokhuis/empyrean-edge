import { Link, useMatches } from 'remix'

export default function Breadcrumb() {
  const matches = useMatches()

  console.log("matchse", matches);

  return (
    <div className="breadcrumb text-sm mb-2 text-gray-500 flex items-center ">
      <Link to="/dashboard">dashboard</Link>
      <Separator />
      settings
      <Separator />
      <strong>post types</strong>
    </div >
  )
}

function Separator() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0"><path d="M9.75 20.25L14.25 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
  )
}