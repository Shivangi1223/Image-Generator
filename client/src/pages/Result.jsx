"use client"

import { useContext, useState } from "react"
import { assets } from "../assets/assets"
import { motion } from "framer-motion"
import { AppContext } from "../context/AppContext"
import VoiceInput from "../components/VoiceInput"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [input, setInput] = useState("")

  const { generateImage, credit, user } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please login to generate images")
      return
    }

    if (credit < 2) {
      toast.error("Insufficient credits! You need at least 2 credits to generate an image.")
      navigate("/buy")
      return
    }

    if (!input.trim()) {
      toast.error("Please enter a description for your image")
      return
    }

    setLoading(true)

    const image = await generateImage(input)
    if (image) {
      setIsImageLoaded(true)
      setImage(image)
    }
    setLoading(false)
  }

  return (
    <motion.form
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image || "/placeholder.svg"} alt="" className="max-w-sm rounded" />
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? "w-full transition-all duration-[10s]" : "w-0"
            }`}
          ></span>
        </div>
        <p className={!loading ? "hidden" : ""}>Loading.........</p>
      </div>

      {!isImageLoaded && (
        <div className="w-full max-w-xl mt-10">
          {user && credit < 10 && (
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
              <p className="text-yellow-700 text-sm">
                ⚠️ Low credits! You have {credit} credits remaining. Each image costs 2 credits.
              </p>
              <button
                type="button"
                onClick={() => navigate("/buy")}
                className="mt-2 text-yellow-800 underline hover:text-yellow-900"
              >
                Buy more credits
              </button>
            </div>
          )}

          {credit === 0 && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <p className="text-red-700 font-medium">No credits remaining!</p>
              <p className="text-red-600 text-sm mt-1">You need credits to generate images.</p>
              <button
                type="button"
                onClick={() => navigate("/buy")}
                className="mt-3 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition-colors"
              >
                Buy Credits
              </button>
            </div>
          )}

          <div className="flex items-center bg-neutral-500 text-white text-sm px-4 py-2 rounded-full">
            <input
              type="text"
              placeholder="Describe what you want to generate"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent outline-none ml-2 placeholder-color"
              disabled={credit < 2}
            />

            <VoiceInput onTextGenerated={(text) => setInput(text)} disabled={credit < 2} />

            <button
              type="submit"
              disabled={credit < 2 || loading}
              className={`ml-2 px-6 py-2 rounded-full transition-all ${
                credit < 2 || loading ? "bg-gray-600 cursor-not-allowed opacity-50" : "bg-zinc-900 hover:bg-zinc-800"
              }`}
            >
              {loading ? "Generating..." : `Generate (${credit >= 2 ? "2 credits" : "Need 2 credits"})`}
            </button>
          </div>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoaded(false)
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer hover:bg-zinc-800 transition-colors"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  )
}

export default Result
