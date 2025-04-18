"use client";

import { useSuperContext } from "@/Context/SuperContext";
import Image from "next/image";
import { FC, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition?: typeof SpeechRecognition;
    SpeechRecognition?: typeof SpeechRecognition;
  }
}

const MicAssistance: FC = () => {
  const { isListening, setIsListening, setquery } = useSuperContext();
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(
    null
  );
  const [text, setText] = useState("");
  const [isMounted, setIsMounted] = useState(false); // Ensures client-side render
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setIsMounted(true);

    if (
      typeof window !== "undefined" &&
      ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)
    ) {
      const SpeechRecognitionClass =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      const instance = new SpeechRecognitionClass();
      instance.continuous = false;
      instance.lang = "en-US";

      instance.onresult = (e: SpeechRecognitionEvent) => {
        const transcript = e.results[0][0].transcript;
        setText(transcript);
        setIsListening(false);
        instance.stop();
      };

      instance.onerror = (e) => {
        console.error("Speech recognition error:", e?.error || e);
        alert("Speech recognition error: " + (e?.error || "Unknown error"));
        setIsListening(false);
      };

      instance.onend = () => {
        setIsListening(false);
      };

      setRecognition(instance);
    }
  }, [setIsListening]);

  useEffect(() => {
    if (text.trim()) {
      setquery(text);
    }
  }, [text, setquery]);

  const startListening = () => {
    setText("");
    setIsListening(true);
    audioRef.current?.play();
    recognition?.start();
  };

  const stopListening = () => {
    setIsListening(false);
    recognition?.stop();
  };

  if (!isMounted) return null; // Prevent server mismatch

  return (
    <>
      <button
        onClick={startListening}
        className="p-3 rounded-full bg-green-500/15 hover:bg-green-500/30 active:scale-90 transition-all duration-200"
        disabled={isListening}
        title={isListening ? "Listening..." : "Start Listening"}
      >
        <Image
          src="/mic.svg"
          alt="Mic"
          width={24}
          height={24}
          className="size-4 opacity-90"
        />
      </button>

      <audio ref={audioRef} src="/pop.mp3" />

      {isListening && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/5 flex items-center justify-center z-50">
          <div className="p-4 w-80 bg-white rounded-md shadow-xl">
            <p className="text-gray-700 animate-pulse">Listening...</p>
            {text && (
              <div className="mt-4 p-2 border rounded-md bg-gray-50">
                <p className="text-gray-800">{text}</p>
              </div>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={stopListening}
                className="px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MicAssistance;
