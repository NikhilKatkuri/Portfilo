"use client";
import MicAssistance from "@/components/ui/MicAssitance";
import { useSuperContext } from "@/Context/SuperContext";
import TextToSpeech from "@/helpers/TextToSpeech";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FC, useEffect, useRef, useState } from "react";
const Page: FC = () => {
  const {
    messages,
    isGen,
    setquery,
    isKeyboardOpen,
    sendMessage,
    query,
    setIsKeyboardOpen,
    isListening,
    player, setplayer
  } = useSuperContext();
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
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Bold: **text**
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Italics: *text*
            .replace(/`(.*?)`/g, "<code>$1</code>") // Inline code: `text`
            .replace(/\n/g, "<br/>") // Newlines to <br>
            .replaceAll(
              /<uri>(.*?)<\/uri>/g,
              "<a href='$1' class='link-format' target='_blank' rel='noopener noreferrer'>$1</a>"
            ), // Handle <uri> links correctly
        }}
      />
    );
  };
  const MesGer = () => {
    if (!isGen && query.length > 0) {
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
  
  useEffect(() => {
    const botMessages = messages
      .filter((t) => t.sender === "bot")
      .map((t) => t.text);

    const latestBotMessage = botMessages[botMessages.length - 1];

    // Extract the URL from <uri>...</uri> tags
    const extractUrl = (msg: string): string | null => {
      const match = msg.match(/<uri>(.*?)<\/uri>/);
      return match ? match[1] : null;
    };

    if (!isGen && latestBotMessage?.toLowerCase().startsWith("playing ")) {
      const extractedUrl = extractUrl(latestBotMessage);
      console.log(extractedUrl);
      if (extractedUrl) {
        console.log("is player : ", isGen);
        setplayer({
          is: !isGen,
          url: extractedUrl,
        });
      }
    }
  }, [messages, isGen, setplayer]);
  const router = useRouter();
  const [copied, setCopied] = useState({
    id: 0,
    is: false,
  });
  const [speaking, setSpeaking] = useState({
    id: 0,
    is: false,
  });
  const handleSpeech = async (text: string, i: number) => {
    setSpeaking({ id: i, is: true });

    const finished = await TextToSpeech(text);

    if (finished) {
      setSpeaking({ id: i, is: false });
    }
  };

  const handleCopy = async (textToCopy: string, i: number) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied({
        id: i,
        is: true,
      });
      setTimeout(
        () =>
          setCopied({
            id: 0,
            is: false,
          }),
        2000
      ); // Reset message
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };
  const SupriseTrack = () => {
    const messages = [
      // Telugu  
      "play Adhento Gaani Vunnapaatuga (Telugu) - Jersey song",
      "play Naatu Naatu (Telugu) - RRR song",
      "play Samajavaragamana (Telugu) - Ala Vaikunthapurramuloo song",
      "play Butta Bomma (Telugu) - Ala Vaikunthapurramuloo song",
      "play Inthandham (Telugu) - Sita Ramam song",
      "play Srivalli (Telugu) - Pushpa song",
      "play Dosti (Telugu) - RRR song",
      "play Almost Padipoyindhe Pilla (Telugu) - Das Ka Dhamki song",
      "play Ramuloo Ramulaa (Telugu) - Ala Vaikunthapurramuloo song", 
      "play Sound of Salaar (Telugu) - Salaar song",
    
      // Hindi 
      "play Chaleya (Hindi) - Jawan song",
      "play Kesariya (Hindi) - Brahmastra song",
      "play Tum Hi Ho (Hindi) - Aashiqui 2 song",
      "play Apna Bana Le (Hindi) - Bhediya song",
      "play Shayad (Hindi) - Love Aaj Kal song",
      "play Tujhe Kitna Chahne Lage (Hindi) - Kabir Singh song",
      "play Dil Diyan Gallan (Hindi) - Tiger Zinda Hai song",
      "play Ghungroo (Hindi) - War song",
    
      //  English 
      "play Blinding Lights (English) - The Weeknd",
      "play Perfect (English) - Ed Sheeran"
    ];
    

    const randomIndex = Math.floor(Math.random() * messages.length);
    setquery(messages[randomIndex]);
    sendMessage(messages[randomIndex]);
  };
  return (
    <div className="h-screen w-screen bg-white flex flex-col overflow-y-hidden">
      <header className="h-16 w-screen flex items-center justify-between bg-white px-4 md:px-6 lg:px-10 sticky top-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              router.push("/");
            }}
            className="h-8 w-8 rounded-full flex items-center justify-center bg-black/5 hover:bg-black/10  active:scale-95"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <Link href="/Cherry" className="css-fnt-style text-2xl">
            Cherry
          </Link>
        </div>
      </header>
      <div className="max-h-[calc(100vh-4rem)] pb-36 h-full w-full flex flex-col items-center max-w-[94%] sm:max-w-[600px] md:max-w-[732px] gap-2 mx-auto p-2">
        {messages.length > 0 ? (
          <div className="row-span-1 h-full overflow-hidden rounded-md w-full flex flex-col items-center justify-center gap-4">
            <div className="h-full select-text pt-6 w-full overflow-y-scroll  scrollbar-hidden  pr-4">
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
                        {t?.text}
                      </div>
                    );
                  }
                  return (
                    <div
                      ref={isLast ? divRef : null}
                      key={i}
                      className="flex flex-col gap-1 items-start min-h-10 h-auto"
                    >
                      <div className=" rounded-xl w-full max-w-full *:text-wrap   min-h-10 rounded-bl-none    self-start font-normal ">
                        {textFormatter(t.text)}
                      </div>
                      {!t.text.toLowerCase().includes("playing") && (
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => {
                              handleCopy(t.text, i);
                            }}
                          >
                            {copied.is && copied.id === i ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-4"
                              >
                                <path d="M7.5 3.375c0-1.036.84-1.875 1.875-1.875h.375a3.75 3.75 0 0 1 3.75 3.75v1.875C13.5 8.161 14.34 9 15.375 9h1.875A3.75 3.75 0 0 1 21 12.75v3.375C21 17.16 20.16 18 19.125 18h-9.75A1.875 1.875 0 0 1 7.5 16.125V3.375Z" />
                                <path d="M15 5.25a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 17.25 7.5h-1.875A.375.375 0 0 1 15 7.125V5.25ZM4.875 6H6v10.125A3.375 3.375 0 0 0 9.375 19.5H16.5v1.125c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 0 1 3 20.625V7.875C3 6.839 3.84 6 4.875 6Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                                />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => {
                              handleSpeech(t.text, i);
                            }}
                          >
                            {speaking.is && speaking.id === i ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="size-4"
                              >
                                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                                <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="size-4"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M19.114 5.636a9 9 0 0 1 0 12.728M16.463 8.288a5.25 5.25 0 0 1 0 7.424M6.75 8.25l4.72-4.72a.75.75 0 0 1 1.28.53v15.88a.75.75 0 0 1-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.009 9.009 0 0 1 2.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75Z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      )}
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
          <div className="row-span-1 h-full w-full flex flex-col items-center justify-center gap-6  p-6 rounded-xl ">
            <h2 className="text-xl md:text-2xl text-center font-bold text-slate-900 flex items-center gap-2">
              {/* <Sparkles className="text-purple-600" /> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              Powered by Gemini AI - Cherry
            </h2>
            <p className="text-center text-slate-700 max-w-2xl">
              Ask Cherry anything! It delivers intelligent and fast responses to
              help you get to know Nikhil&apos;s developer journey, skills, and
              more.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-4">
              <div
                onClick={() =>
                  setquery("What makes Nikhil stand out as a developer?")
                }
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 cursor-pointer transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M12 20v2" />
                  <path d="M12 2v2" />
                  <path d="M17 20v2" />
                  <path d="M17 2v2" />
                  <path d="M2 12h2" />
                  <path d="M2 17h2" />
                  <path d="M2 7h2" />
                  <path d="M20 12h2" />
                  <path d="M20 17h2" />
                  <path d="M20 7h2" />
                  <path d="M7 20v2" />
                  <path d="M7 2v2" />
                  <rect x="4" y="4" width="16" height="16" rx="2" />
                  <rect x="8" y="8" width="8" height="8" rx="1" />
                </svg>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">What makes Nikhil</span> stand
                  out as a developer?
                </p>
              </div>

              <div
                onClick={() =>
                  setquery(
                    "What technologies does Nikhil use for scalable web development?"
                  )
                }
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 cursor-pointer transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <p className="text-sm md:text-base">
                  <span className="font-semibold">
                    Technologies Nikhil uses
                  </span>{" "}
                  for scalable web development?
                </p>
              </div>
              <div
                onClick={SupriseTrack}
                className="flex items-center gap-3 px-5 py-3 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 cursor-pointer transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-600"
                >
                  <path d="M9 18V5l12-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="18" cy="16" r="3" />
                </svg>
                <p className="text-sm md:text-base text-slate-800">
                  <span className="font-semibold text-slate-950">Play</span> a
                  surprise track 🎧
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
      <footer
        ref={(e) => {
          if (isKeyboardOpen && e) {
            e.scrollIntoView({ behavior: "smooth", block: "end" });
          }
        }}
        className={`fixed bottom-0  w-full flex items-center justify-center flex-col bg-white z-10 ${
          isKeyboardOpen &&
          !Platform.includes("Windows") &&
          !Platform.includes("MacOs") &&
          !Platform.includes("Linux")
            ? ""
            : "max-sm:mb-4"
        }`}
      >
        <div className="w-full max-w-[94%] mb-2 sm:max-w-[600px] md:max-w-[732px] bg-white shadow-xl rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 ease-in-out">
          {false && (
            <h1 className="flex items-center font-medium">
              Enter movie or track name to play
            </h1>
          )}
          <div>
            <textarea
              placeholder="Type here..."
              className="w-full outline-none resize-none  "
              maxLength={1000 * 10}
              rows={1}
              value={query}
              onChange={handleInput}
              onFocus={() => setIsKeyboardOpen(true)}
              onBlur={() => setIsKeyboardOpen(false)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="flex items-center justify-between">
            <div
             onClick={SupriseTrack}
              className={`px-3  flex items-center gap-3 h-9 rounded-full  text-[13px] font-medium ${
                player.is ? " bg-green-500" : " bg-green-50"
              } hover:bg-green-500 transition-all duration-200 ease-in-out group`}
            >
              <button className="flex h-full min-w-8 items-center justify-center pl-0 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  className="size-6"
                  viewBox="0 0 26 26"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M13 0C5.8203 0 0 5.8203 0 13C0 20.1797 5.8203 26 13 26C20.1797 26 26 20.1797 26 13C26 5.8203 20.1797 0 13 0ZM11.8899 19.2981C12.5582 19.9744 13.3616 20.3125 14.3 20.3125C15.2384 20.3125 16.0418 19.9744 16.7101 19.2981C17.3784 18.6219 17.7125 17.809 17.7125 16.8594V10.7961C17.7125 9.85376 18.4764 9.08984 19.4188 9.08984H19.8301C20.5452 9.08984 21.125 8.51009 21.125 7.79492C21.125 7.07976 20.5452 6.5 19.8301 6.5H18.5656C17.1521 6.5 16.0063 7.64587 16.0063 9.05937V13.0028C16.0063 13.3862 15.5752 13.6302 15.2064 13.525C14.9292 13.4458 14.627 13.4062 14.3 13.4062C13.3616 13.4062 12.5582 13.7444 11.8899 14.4206C11.2216 15.0968 10.8875 15.9098 10.8875 16.8594C10.8875 17.809 11.2216 18.6219 11.8899 19.2981ZM4.09551 16.0071C4.05869 16.4768 4.44446 16.8594 4.91563 16.8594C5.38679 16.8594 5.7641 16.4765 5.80793 16.0074C5.88997 15.1293 6.10086 14.2946 6.44059 13.5034C6.88848 12.4602 7.49988 11.5466 8.2748 10.7625C9.04973 9.9783 9.95617 9.35962 10.9941 8.9064C11.7728 8.5664 12.5874 8.35394 13.4381 8.269C13.9125 8.22162 14.3 7.84006 14.3 7.36328C14.3 6.8865 13.9128 6.49595 13.4376 6.53504C12.3477 6.62469 11.3093 6.88638 10.3223 7.32012C9.07816 7.86686 7.99398 8.60785 7.06977 9.54307C6.14555 10.4783 5.41328 11.5754 4.87297 12.8343C4.4417 13.8392 4.18255 14.8968 4.09551 16.0071ZM7.52527 16.0082C7.46902 16.476 7.85696 16.8594 8.32812 16.8594C8.79929 16.8594 9.17313 16.4751 9.24288 16.0091C9.40401 14.9325 9.88112 13.993 10.6742 13.1904C11.4624 12.3929 12.3843 11.9111 13.44 11.7451C13.911 11.6711 14.3 11.2932 14.3 10.8164C14.3 10.3396 13.912 9.94681 13.4389 10.0056C12.8174 10.0828 12.2229 10.2451 11.6553 10.4927C10.8306 10.8524 10.109 11.3452 9.49051 11.971C8.87199 12.5969 8.38144 13.3307 8.01887 14.1724C7.76652 14.7582 7.60199 15.3701 7.52527 16.0082Z"
                    className={`group-hover:fill-white ${
                      player.is ? "fill-white" : "fill-green-500"
                    }  `}
                  />
                </svg>
                <span>
                  <div
                    className={`group-hover:text-white ps-1 pe-1 ${
                      player.is && "text-white"
                    } whitespace-nowrap`}
                  >
                    music
                  </div>
                </span>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <MicAssistance />

              <button
                disabled={isGen}
                title={isListening ? "Listening..." : "Start Listening"}
                onClick={MesGer}
                className="p-3 rounded-full bg-green-500/15 hover:bg-green-500/30 active:scale-90 transition-all duration-200"
              >
                <Image
                  src="/send.svg"
                  alt="Send"
                  width={24}
                  height={24}
                  className="size-4 opacity-90"
                />
              </button>
            </div>
          </div>
        </div>
        <span
          className={`row-span-2 text-xs  text-black max-sm:px-4 text-center py-2 ${
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
    </div>
  );
};

export default Page;
