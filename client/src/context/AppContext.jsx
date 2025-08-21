"use client"

import { createContext, useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { useNavigate } from "react-router-dom"

import { API_URL } from "../config" // ✅ Using config.js instead of env var

export const AppContext = createContext()

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const [credit, setCredit] = useState(0)

  const navigate = useNavigate()

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/api/user/credits`, {
        headers: { token },
      })

      if (data.success) {
        setCredit(data.credits)
        setUser(data.user)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const generateImage = async (prompt) => {
    try {
      if (credit < 2) {
        toast.error("Insufficient credits! You need at least 2 credits to generate an image.")
        navigate("/buy")
        return
      }

      const { data } = await axios.post(`${API_URL}/api/image/generate-image`, { prompt }, { headers: { token } })

      if (data.success) {
        loadCreditsData()
        return data.resultImage
      } else {
        toast.error(data.message)
        loadCreditsData()
        if (data.creditBalance === 0) {
          navigate("/buy")
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken("")
    setUser(null)
    setCredit(0)
  }

  useEffect(() => {
    if (token) {
      loadCreditsData()
    }
  }, [token])

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    API_URL, // ✅ now sharing API_URL via context if needed
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  }

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
}

export default AppContextProvider
