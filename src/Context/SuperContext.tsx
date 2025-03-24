"use client";
import ChatInterFace from "@/components/ChatInterface";
import { createContext, useContext, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
  isKeyboardOpen:boolean;
   setIsKeyboardOpen:(isKeyboardOpen:boolean)=>void;
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
  const [isGen, setIsGen] = useState(false);
  const [query, setquery] = useState<string>("");
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  async function sendMessage(message: string) {
    if (!message.trim()) return;

    // Append user message
    setMessages((prev) => [...prev, { text: message, sender: "user" }]);

    try {
      setIsGen(true);
      const response = await fetch("https://chatbot-backend-common.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key":"hC2rNyil50ik2her" ,
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();


      // Append bot response
      setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
      setIsGen(false);
      setquery(""); 
      console.log(data.reply)
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
        isKeyboardOpen, setIsKeyboardOpen
      }}
    >
      <motion.div
        className="transition-all duration-300"
        animate={{ opacity: Ischat ? 0.5 : 1 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {Ischat && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm z-30"
              onClick={() => setIschat(false)}
            />

            <motion.div
              key="chat"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="fixed top-0 right-0 z-40 bg-white h-screen w-screen shadow-lg"
            >
              <ChatInterFace />
            </motion.div>
          </>
        )}
      </AnimatePresence>
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
