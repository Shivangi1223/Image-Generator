"use client"

import { useState } from "react"
import { Mic } from "lucide-react"

const VoiceInput = ({ onTextGenerated, disabled = false }) => {
  const [listening, setListening] = useState(false)

  const startListening = () => {
    if (disabled) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = "en-US"
    recognition.start()
    setListening(true)

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      onTextGenerated(transcript)
      setListening(false)
    }

    recognition.onerror = () => setListening(false)
    recognition.onend = () => setListening(false)
  }

  return (
    <button
      onClick={startListening}
      disabled={disabled}
      className={`ml-2 transition-colors ${
        disabled ? "text-gray-400 cursor-not-allowed" : "text-white hover:text-blue-400"
      }`}
      title={disabled ? "Insufficient credits" : "Click to speak"}
    >
      <Mic size={18} className={listening ? "animate-pulse text-red-500" : ""} />
    </button>
  )
}

export default VoiceInput
