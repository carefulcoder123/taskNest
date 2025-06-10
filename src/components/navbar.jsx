import React from 'react'

const navbar = () => {
  return (
    <nav className="bg-slate-800 text-white flex justify-around py-3">
        <div className="logo mx-10 hover:cursor-pointer">
            <span className="font-bold text-xl">TaskNest</span>
        </div>
      <ul className="flex gap-8 mx-10 ">
        <li className="hover:cursor-pointer  hover:font-bold transition-all duration-200">Home</li>
        <li className="hover:cursor-pointer  hover:font-bold transition-all duration-200">Your Tasks</li>
      </ul>
    </nav>
  )
}

export default navbar
