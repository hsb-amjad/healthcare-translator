"use client";
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Translator() {
  const [listening, setListening] = useState(false);
  const [inputLang, setInputLang] = useState("en-US");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [originalText, setOriginalText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [activeTab, setActiveTab] = useState("original");
  const recognitionRef = useRef(null);

  const permanentTranscriptRef = useRef("");
  const lastFinalRef = useRef("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.lang = inputLang;
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim();
        if (event.results[i].isFinal) {
          if (
            !permanentTranscriptRef.current.endsWith(transcript + " ") &&
            !transcript.startsWith(permanentTranscriptRef.current.trim())
          ) {
            permanentTranscriptRef.current += transcript + " ";
          } else {
            permanentTranscriptRef.current = transcript + " ";
          }
          lastFinalRef.current = transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      setOriginalText(permanentTranscriptRef.current + interimTranscript);
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
      body: JSON.stringify({ text: originalText, targetLang }),
    });
    const data = await res.json();
    setTranslatedText(data.translatedText);
    setActiveTab("translated"); // auto-switch
  };

  const speakText = () => {
    if (!translatedText) return;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <div className="text-center mt-3 mb-2">
        <h1 className="text-lg font-bold text-blue-700 flex items-center justify-center gap-2">
          🌐 Healthcare Translator
        </h1>
      </div>

      {/* Language selectors */}
      <div className="flex justify-center gap-3 px-4 mb-2">
        <Select onValueChange={setInputLang} defaultValue={inputLang}>
          <SelectTrigger className="w-36 h-9 text-sm">
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
          <SelectTrigger className="w-36 h-9 text-sm">
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

      {/* Tabs + Buttons block */}
      <div className="flex-1 px-4 pb-2 flex flex-col">
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col"
        >
          <TabsList className="grid grid-cols-2 mb-2 h-8">
            <TabsTrigger value="original" className="text-xs px-2 h-8">
              Original
            </TabsTrigger>
            <TabsTrigger value="translated" className="text-xs px-2 h-8">
              Translated
            </TabsTrigger>
          </TabsList>

          <TabsContent value="original" className="flex-1 mb-2">
            <Textarea
              value={originalText}
              readOnly
              className="w-full h-48 resize-none overflow-y-auto"
            />
          </TabsContent>

          <TabsContent value="translated" className="flex-1 mb-2">
            <Textarea
              value={translatedText}
              readOnly
              className="w-full h-48 resize-none overflow-y-auto"
            />
          </TabsContent>
        </Tabs>

        {/* Buttons immediately below tabs */}
        <div className="mt-2">
          <div className="flex gap-2">
            {!listening ? (
              <Button
                onClick={startListening}
                className="flex-1 py-3 text-base bg-green-600 hover:bg-green-700"
              >
                🎤 Start
              </Button>
            ) : (
              <Button
                variant="destructive"
                onClick={stopListening}
                className="flex-1 py-3 text-base"
              >
                ⏹ Stop
              </Button>
            )}

            <Button
              onClick={translateText}
              className="flex-1 py-3 text-base bg-blue-600 hover:bg-blue-700"
            >
              🌍 Translate
            </Button>

            <Button
              onClick={speakText}
              className="flex-1 py-3 text-base bg-purple-600 hover:bg-purple-700"
            >
              🔊 Speak
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
