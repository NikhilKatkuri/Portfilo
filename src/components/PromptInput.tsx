import {  useRef } from "react";
import Image from "next/image";
import { useSuperContext } from "@/Context/SuperContext";

  


export default function PromptInput() {
  const {  sendMessage, isGen, query, setquery, setIsKeyboardOpen } =
    useSuperContext();
    const MesGer = () => {
        if (!isGen) {
          sendMessage(query);
        }
      };
  
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-resize textarea
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setquery(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  // Handle "Shift + Enter" for sending message
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      MesGer();
    }
  };

  return (
    <div className="flex items-end rounded-xl px-5 py-3 border border-neutral-300 w-full max-w-[700px] gap-3 bg-white/60 backdrop-blur-md shadow-md transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-green-400">
      <textarea
        ref={textareaRef}
        placeholder="Send a message..."
        value={query}
        onChange={handleInput}
        onFocus={() => setIsKeyboardOpen(true)}
        onBlur={() => setIsKeyboardOpen(false)}
        onKeyDown={handleKeyDown}
        className="w-full resize-none outline-none text-neutral-950 text-lg bg-transparent placeholder:text-neutral-400 overflow-hidden max-h-[200px]"
        rows={1}
      />
      <button
        onClick={MesGer}
        className="p-3 rounded-full bg-green-500/15 hover:bg-green-500/30 active:scale-90 transition-all duration-200"
        disabled={isGen}
      >
        <Image
          src="/send.svg"
          alt="Send"
          width={24}
          height={24}
          className="size-5 opacity-90"
        />
      </button>
    </div>
  );
}
