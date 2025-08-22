"use client";
import { useState, useRef } from "react";

export default function SpeechToText() {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser. Try Chrome.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = "en-US"; // default input language
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          setTranscript(prev => prev + " " + event.results[i][0].transcript);
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
    };

    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-2">Speech to Text</h2>
      <textarea
        value={transcript}
        readOnly
        className="w-full h-40 p-2 border rounded mb-3"
      />
      <div className="flex justify-center gap-3">
        {!listening ? (
          <button
            onClick={startListening}
            className="px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            🎤 Start
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="px-4 py-2 bg-red-600 text-white rounded-lg"
          >
            ⏹ Stop
          </button>
        )}
      </div>
    </div>
  );
}
