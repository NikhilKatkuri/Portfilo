"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import MiniPlayer from "@/components/ui/miniPlayer";

// Define the context type
type SuperContextType = {
  Ischat: boolean;
  setIschat: (Ischat: boolean) => void;
  messages: { text: string; sender: "user" | "bot" }[];
  sendMessage: (message: string) => Promise<void>;
  isGen: boolean;
  setIsGen: (isGen: boolean) => void;
  query: string;
  setquery: (query: string) => void;
  isKeyboardOpen: boolean;
  setIsKeyboardOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isListening: boolean;
  setIsListening: React.Dispatch<React.SetStateAction<boolean>>;
  player: {
    is: boolean;
    url: string;
  };
  setplayer: (player: { is: boolean; url: string }) => void;
};

// Create the context
const SuperContext = createContext<SuperContextType | undefined>(undefined);

// Provider component
export const SuperContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [Ischat, setIschat] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "bot" }[]
  >([]);
  const [isListening, setIsListening] = useState(false);
  const [isGen, setIsGen] = useState(false);
  const [query, setquery] = useState<string>("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [player, setplayer] = useState({
    is: false,
    url: "",
  });
  async function sendMessage(message: string) {
    if (!message.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    const url = "https://chatbot-backend-common.onrender.com/chat";
    try {
      setIsGen(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "hC2rNyil50ik2her",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      // Append bot response
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      setIsGen(false);
      setquery("");
      console.log(data.reply);
      return data.reply;
    } catch (error) {
      console.error("Error fetching chat response:", error);
    }
  }

  return (
    <SuperContext.Provider
      value={{
        Ischat,
        setIschat,
        sendMessage,
        messages,
        isGen,
        setIsGen,
        query,
        setquery,
        isKeyboardOpen,
        setIsKeyboardOpen,
        isListening,
        setIsListening,
        player,
        setplayer,
      }}
    >
      <motion.div
        className="transition-all duration-300"
        animate={{ opacity: Ischat ? 0.5 : 1 }}
      >
        <MiniPlayer />
        {children}
      </motion.div>
    </SuperContext.Provider>
  );
};

// Custom Hook
export const useSuperContext = () => {
  const context = useContext(SuperContext);
  if (!context)
    throw new Error(
      "useSuperContext must be used within a SuperContextProvider"
    );
  return context;
};
