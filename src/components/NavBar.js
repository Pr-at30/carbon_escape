import React from 'react'
import { Link } from 'react-router-dom'


function NavBar() {
  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
        
        <div className="flex items-center flex-shrink-0 text-white mr-6 ">
          <span className="font-semibold text-xl tracking-tight">
            <Link to="/">Carbon Escape</Link>
          </span>
        </div>

        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="text-sm lg:flex-grow">
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-cyan-500 mr-4">
              <Link to="/">Emission Calculator</Link>
            </a>
            <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-cyan-500 mr-4">
            <Link to="/coderunner">Compare Code</Link>
            </a>
            {/* <a href="#responsive-header" className="block mt-4 lg:inline-block lg:mt-0 text-slate-200 hover:text-cyan-500">
              <Link to="/aboutus">About us</Link>
            </a> */}
          </div>
        </div>

      </nav>
    </>
  )
}

export default NavBar