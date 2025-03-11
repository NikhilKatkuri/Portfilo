"use client";
import { useSuperContext } from "@/Context/SuperContext";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, useEffect, useState } from "react";

const ChatInterFace: FC = () => {
  const { Ischat, setIschat, sendMessage, messages, isGen, query, setquery } =
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

  useEffect(() => {
    setPlatform(getPlatformInfo());
    // console.log("Platform:", getPlatformInfo());
  }, []);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const pn = usePathname();
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
        className="h-full w-full"
      >
        <header className="py-4 px-4 sm:px-6 md:px-8 lg:px-12 bg-white/50 backdrop-blur-sm z-20 sticky top-0 w-full flex items-center gap-3">
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
        <section className="h-[calc(100%-5rem)]  max-w-[94%] sm:max-w-[600px] md:max-w-[700px] flex flex-col w-full justify-between items-center mx-auto">
          {messages.length > 0 ? (
            <div className="h-[calc(100%-7rem)] overflow-hidden rounded-md w-full flex flex-col items-center justify-center gap-4">
              <div className="h-full pt-6 w-full overflow-y-scroll flex  flex-col gap-6 scrollbar-hidden">
                {messages.map((t, i) => {
                  if (t.sender !== "bot") {
                    return (
                      <div
                        key={i}
                        className="p-2 px-3 rounded-xl max-w-80  rounded-bl-none text-neutral-950 bg-black/5 self-end"
                      >
                        {t.text}
                      </div>
                    );
                  }
                  return (
                    <div
                      key={i}
                      className="flex flex-col gap-2 items-start min-h-10"
                    >
                      <button className="w-8 h-8  rounded-md bg-black text-white">
                        C
                      </button>

                      <div className=" rounded-xl max-w-[90%] min-h-10 rounded-bl-none   self-start">
                        {t.text}
                      </div>
                    </div>
                  );
                })}
                {isGen && (
                  <div className="flex items-center gap-3 h-10">
                    <div className="flex gap-3 items-center">
                      <button className="w-8 h-8  rounded-md bg-black text-white">
                        C
                      </button>
                      <div className="h-10 rounded-xl max-w-[90%]  rounded-bl-none   self-start w-64 runner_bg"></div>
                    </div>
                  </div>
                )}
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
            className={`h-24 w-full flex flex-col items-center justify-between ${
              isKeyboardOpen &&
              !Platform.includes("Windows") &&
              !Platform.includes("MacOs") &&
              !Platform.includes("Linux")
                ? "mb-20"
                : ""
            }`}
          >
            <div className="flex items-center rounded-full pl-6 px-4 py-2 border-[1px] w-full max-w-[600px] gap-4">
              <input
                placeholder="Ask Anything"
                type="text"
                value={query}
                onChange={(e) => {
                  setquery(e.target.value);
                }}
                onFocus={() => setIsKeyboardOpen(true)}
                onBlur={() => setIsKeyboardOpen(false)}
                className={`w-full outline-none text-neutral-950 `}
              />
              <button
                onClick={() => {
                  sendMessage(query);
                }}
                className="p-2 rounded-full bg-green-500/15"
              >
                <Image
                  src="/send.svg"
                  alt="sender"
                  width={24}
                  height={24}
                  className="size-4  "
                />
              </button>
            </div>
            <span
              className={`text-xs md:text-sm ${
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
