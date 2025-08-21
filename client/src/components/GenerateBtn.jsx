"use client"

import { useContext } from "react"
import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const GenerateBtn = () => {
  const { user, setShowLogin, credit } = useContext(AppContext)
  const navigate = useNavigate()

  const onClickHandler = () => {
    if (!user) {
      setShowLogin(true)
      return
    }

    if (credit < 2) {
      toast.error("You need at least 2 credits to generate an image!")
      navigate("/buy")
      return
    }

    navigate("/result")
  }

  return (
    <motion.div
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="pb-16 text-center"
    >
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic. Try now
      </h1>

      {user && credit < 2 && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
          <p className="text-red-700 font-medium">Insufficient Credits!</p>
          <p className="text-red-600 text-sm mt-1">You need at least 2 credits to generate images.</p>
        </div>
      )}

      <button
        onClick={onClickHandler}
        disabled={user && credit < 2}
        className={`inline-flex items-center gap-2 px-12 py-3 rounded-full m-auto transition-all duration-500 ${
          user && credit < 2 ? "bg-gray-400 text-gray-600 cursor-not-allowed" : "bg-black text-white hover:scale-105"
        }`}
      >
        {user && credit < 2 ? "Need 2 Credits" : "Generate Images"}
        <img src={assets.star_group || "/placeholder.svg"} alt="" className="h-6" />
      </button>

      {user && credit < 10 && credit >= 2 && (
        <p className="text-yellow-600 text-sm mt-3">Low credits! You have {credit} credits remaining.</p>
      )}
    </motion.div>
  )
}

export default GenerateBtn
