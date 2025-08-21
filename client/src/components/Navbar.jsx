"use client"

import { useContext } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { AppContext } from "../context/AppContext"

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext)
  const navigate = useNavigate()

  return (
    <div className="flex items-center justify-between py-4">
      <Link to="/">
        <img src={assets.logo || "/placeholder.svg"} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/buy")}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 transition-all duration-300 ${
                credit < 10
                  ? "bg-red-100 border border-red-200"
                  : credit < 50
                    ? "bg-yellow-100 border border-yellow-200"
                    : "bg-blue-100 border border-blue-200"
              }`}
            >
              <img className="w-5" src={assets.credit_star || "/placeholder.svg"} alt="" />
              <div className="text-left">
                <p
                  className={`text-xs sm:text-sm font-semibold ${
                    credit < 10 ? "text-red-600" : credit < 50 ? "text-yellow-600" : "text-blue-600"
                  }`}
                >
                  {credit} Credits
                </p>
                {credit < 10 && <p className="text-xs text-red-500">Low balance!</p>}
              </div>
            </button>

            <div className="flex items-center gap-3 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200">
              <div className="text-right max-sm:hidden">
                <p className="text-sm font-medium text-gray-800">Welcome back!</p>
                <p className="text-xs text-gray-600">{user.name}</p>
              </div>
              <p className="text-gray-600 sm:hidden text-sm font-medium">Hi, {user.name}</p>

              <div className="relative group">
                <img
                  src={assets.profile_icon || "/placeholder.svg"}
                  className="w-10 h-10 rounded-full drop-shadow-sm hover:drop-shadow-md transition-all duration-200 cursor-pointer"
                  alt=""
                />
                <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                  <ul className="list-none m-0 p-3 bg-white rounded-lg border shadow-lg text-sm min-w-[120px]">
                    <li className="py-2 px-3 text-gray-700 border-b border-gray-100">
                      <span className="font-medium">{user.name}</span>
                    </li>
                    <li className="py-2 px-3 text-gray-600">
                      Credits: <span className="font-semibold text-blue-600">{credit}</span>
                    </li>
                    <li
                      onClick={logout}
                      className="py-2 px-3 cursor-pointer text-red-600 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p
              onClick={() => navigate("/buy")}
              className="cursor-pointer hover:text-blue-600 transition-colors duration-200"
            >
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white px-7 py-2 sm:px-10 text-sm rounded-full transition-all duration-200 hover:scale-105"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
