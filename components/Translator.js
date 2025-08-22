"use client";
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function Translator() {
  const [listening, setListening] = useState(false);
  const [inputLang, setInputLang] = useState("en-US");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = inputLang;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let fullTranscript = "";
      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript + " ";
      }
      setOriginalText(fullTranscript);
    };

    recognitionRef.current.start();
    setListening(true);
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const translateText = async () => {
    if (!originalText) return;
    const res = await fetch("/api/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: originalText, targetLang })
    });
    const data = await res.json();
    setTranslatedText(data.translatedText);
  };

  const speakText = () => {
    if (!translatedText) return;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-center mb-6 text-blue-700">
        Healthcare Translator
      </h2>

      {/* Language Selectors */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <Select onValueChange={setInputLang} defaultValue={inputLang}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Input Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en-US">English</SelectItem>
            <SelectItem value="es-ES">Spanish</SelectItem>
            <SelectItem value="ur-PK">Urdu</SelectItem>
            <SelectItem value="fr-FR">French</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={setTargetLang} defaultValue={targetLang}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Target Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="Urdu">Urdu</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transcript Panels */}
      <div className="grid md:grid-cols-2 gap-6 mb-20">
        <Card>
          <CardHeader>
            <CardTitle>Original Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={originalText} readOnly className="h-60" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Translated Transcript</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={translatedText} readOnly className="h-60" />
          </CardContent>
        </Card>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-14 left-0 right-0 flex justify-center gap-4">
        {!listening ? (
          <Button onClick={startListening} className="px-6 py-3 text-lg">
            🎤 Start
          </Button>
        ) : (
          <Button variant="destructive" onClick={stopListening} className="px-6 py-3 text-lg">
            ⏹ Stop
          </Button>
        )}

        <Button onClick={translateText} className="px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700">
          🌍 Translate
        </Button>

        <Button onClick={speakText} className="px-6 py-3 text-lg bg-purple-600 hover:bg-purple-700">
          🔊 Speak
        </Button>
      </div>
    </div>
  );
}
