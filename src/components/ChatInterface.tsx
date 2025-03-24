"use client";
import { useSuperContext } from "@/Context/SuperContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
import PromptInput from "./PromptInput";
const ChatInterFace: FC = () => {
  const { Ischat, setIschat, messages, isGen, setquery, isKeyboardOpen } =
    useSuperContext();
  const getPlatformInfo = () => {
    const userAgent = navigator.userAgent.toLowerCase();

    if (/android/.test(userAgent)) return "Android";
    if (/iphone|ipad|ipod/.test(userAgent)) return "iOS";
    if (/win/.test(userAgent)) return "Windows";
    if (/mac/.test(userAgent)) return "MacOS";
    if (/linux/.test(userAgent)) return "Linux";

    return "Unknown";
  };
  const [Platform, setPlatform] = useState("");
  const divRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    setPlatform(getPlatformInfo());
    
  }, []);

  const pn = usePathname();
  useEffect(() => {
    if (divRef.current && containerRef.current) {
      divRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      containerRef.current.scrollTop += 350;
    }
  }, [messages, isGen]);
  const textFormatter = (message: string) => {
    if (!message?.trim()) return null;

    return (
      <span
        dangerouslySetInnerHTML={{
          __html: message
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold (**text**)
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics (*text*)
            .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code (`text`)
            .replace(/\n/g, "<br/>"), // Preserve new lines
        }}
      />
    );
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={pn}
        initial="initialState"
        animate="animateState"
        exit="exitState"
        transition={{
          duration: 0.7,
        }}
        variants={{
          initialState: { opacity: 0 },
          animateState: { opacity: 1 },
          exitState: { opacity: 0 }, // Ensure exit animation works
        }}
        className="h-full w-full flex flex-col justify-start sm:justify-between"
      >
        <header className="py-4 px-4 max-h-20 sm:px-6 md:px-8 lg:px-12 bg-white/50 backdrop-blur-sm z-20 sticky top-0 w-full flex items-center gap-3">
          <button
            onClick={() => {
              setIschat(!Ischat);
            }}
            className="bg-[#171717]  p-2 rounded-full active:scale-95"
          >
            <Image
              src="/back.svg"
              alt="_Cherry_"
              width={20}
              height={20}
              className="size-4 "
            />
          </button>
          <div className="flex items-center justify-between w-full max-w-[1024px] mx-auto">
            <Link
              href="/"
              className="text-slate-900 css-fnt-style text-2xl md:text-3xl"
            >
              Cherry
            </Link>
            <div className="flex items-center gap-3">
              <button className="bg-green-500/10 p-2 rounded-full active:scale-95">
                <Image
                  src="/ai.svg"
                  alt="_Cherry_"
                  width={20}
                  height={20}
                  className="md:size-6"
                />
              </button>
            </div>
          </div>
        </header>
        
        <section className="h-[calc(100%-5rem)]      max-w-[94%] sm:max-w-[600px] md:max-w-[732px] md:pl-4  flex flex-col w-full justify-between items-center mx-auto">
          {messages.length > 0 ? (
            <div className="h-[calc(100%-7rem)] overflow-hidden rounded-md w-full flex flex-col items-center justify-center gap-4">
              <div className="h-full pt-6 w-full overflow-y-scroll  scrollbar-hidden  pr-4">
                <div
                  ref={containerRef}
                  className="flex-1 flex flex-col gap-4 pb-8 "
                >
                  {messages.map((t, i) => {
                    const isLast = i === messages.length - 1;
                    if (t.sender !== "bot") {
                      return (
                        <div
                          key={i}
                          ref={isLast ? divRef : null}
                          className="p-2 px-3 rounded-xl max-w-80  rounded-br-none text-neutral-950 bg-black/5 self-end"
                        >
                          {t.text}
                        </div>
                      );
                    }
                    return (
                      <div
                        ref={isLast ? divRef : null}
                        key={i}
                        className="flex flex-col gap-2 items-start min-h-10 h-auto"
                      >
                        {/* <button className="w-8 h-8  rounded-md bg-black text-white">
                          C
                        </button> */}
                        <div className=" rounded-xl w-full max-w-full *:text-wrap   min-h-10 rounded-bl-none    self-start font-normal ">
                          {textFormatter(t.text)}
                        </div>
                      </div>
                    );
                  })}
                  {isGen && (
                    <div ref={divRef} className="flex items-center gap-3 h-10">
                      <div className="flex gap-3 items-center">
                        <button className="w-8 h-8  rounded-md bg-black text-white">
                          C
                        </button>
                        <div className="h-10 rounded-xl max-w-[90%]  rounded-bl-none   self-start w-64 runner_bg text-black"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[calc(100%-7rem)]  w-full flex flex-col items-center justify-center gap-4">
              <h2 className="text-lg sm:text-xl md:text-2xl text-center font-semibold text-slate-900">
                Powered by Gemini AI .Cherry delivering intelligent and fast
                responses.
              </h2>
              <div className="flex flex-wrap gap-3">
                <div
                  onClick={() => {
                    setquery(" What makes Nikhil stand out as a developer?");
                  }}
                  className="flex px-6 py-2 rounded-lg border-[1px]"
                >
                  <p className="flex flex-col">
                    <span className="font-semibold text-slate-950">
                      What makes Nikhil
                    </span>
                    stand out as a developer?
                  </p>
                </div>
                <div
                  onClick={() => {
                    setquery(
                      "What technologies does Nikhil use  for scalable web development?"
                    );
                  }}
                  className="flex px-6 py-2 rounded-lg border-[1px]"
                >
                  <p className="flex flex-col">
                    <span className="font-semibold text-slate-950">
                      What technologies does Nikhil use
                    </span>
                    for scalable web development?
                  </p>
                </div>
              </div>
            </div>
          )}
          <footer
          ref={(e) => {
            if (isKeyboardOpen && e) {
              e.scrollIntoView({ behavior: "smooth", block: "end" });
            }
          }}
          
            className={`py-3 w-full  flex flex-col items-center justify-between ${
              isKeyboardOpen &&
              !Platform.includes("Windows") &&
              !Platform.includes("MacOs") &&
              !Platform.includes("Linux")
                ? "mb-12"
                : "max-sm:mb-4"
            }`}
          >
            <PromptInput />
            <span
              className={`text-xs  text-black max-sm:px-4 text-center py-2 ${
                isKeyboardOpen &&
                !Platform.includes("Windows") &&
                !Platform.includes("MacOs") &&
                !Platform.includes("Linux")
                  ? "hidden"
                  : ""
              }`}
            >
              Sometimes, Cherry may provide inaccurate responses.{" "}
              <span className="font-semibold cursor-pointer text-xs">
                {Platform}
              </span>
            </span>
          </footer>
        </section>
      </motion.main>
    </AnimatePresence>
  );
};

export default ChatInterFace;
