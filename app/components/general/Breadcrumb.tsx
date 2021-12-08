import React from 'react'
import { Link, useMatches } from 'remix'

export default function Breadcrumb() {
  const matches = useMatches()
  const crumbs = matches.filter(match => match.handle !== undefined)

  return (
    <div className="breadcrumb text-sm mb-2 text-gray-500 flex items-center lowercase h-6">
      {crumbs.map((crumb, index) => (
        <React.Fragment key={crumb.pathname}>
          <Link to={crumb.pathname}>{crumb.handle.breadcrumb}</Link>
          {crumbs.length !== (index + 1) && <Separator />}
        </React.Fragment>
      ))}
    </div >
  )
}

function Separator() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 flex-shrink-0"><path d="M9.75 20.25L14.25 3.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path></svg>
  )
}