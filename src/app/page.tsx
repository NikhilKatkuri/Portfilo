"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FC, useRef } from "react";
import { motion } from "framer-motion";
import SkillsUI from "@/components/SkillsUI"; 
const Page: FC = () => {
  const ani = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1 },
  };
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    // Normalize values between -1 and 1
    const x = ((e.clientX - left) / width - 0.5) * 5;
    const y = ((e.clientY - top) / height - 0.5) * 5;

    // Adjust sensitivity (lower values for a smoother effect)
    const rotateX = y * 100; // Max 10 degrees
    const rotateY = -x * 100; // Max -10 degrees
    const translateX = x * 400; // Moves left/right
    const translateY = y * 400; // Moves up/down

    if (btnRef.current) {
      btnRef.current.style.transform = `
        perspective(300px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg) 
        translateX(${translateX}px) 
        translateY(${translateY}px) 
        scale(1.05)
      `;
    }
  };

  const resetTransform = () => {
    if (btnRef.current) {
      btnRef.current.style.transform =
        "perspective(300px) rotateX(0) rotateY(0) translateX(0) translateY(0) scale(1)";
    }
  };

  return (
    <>
      <Navbar />
      <main className="h-auto w-full">
        <motion.div
          {...ani}
          className="bg-[url('/bg_md.png')] bg-cover h-[26rem] sm:h-[30rem] flex items-center justify-center"
        >
          <Image
            src="/hero.png"
            alt="hero_nikhil_Katkuri"
            width={440}
            height={450}
            className=" max-w-72 sm:max-w-96"
          />
        </motion.div>
        <motion.div
          {...ani}
          className="py-4 flex flex-col items-center max-sm:max-w-72 mx-auto"
        >
          <h1 className="css-fnt-style text-3xl md:text-4xl  text-slate-900">
            Hi I&apos;m Nikhil
          </h1>
          <p className="text-sm text-center sm:text-lg md:text-xl font-medium sm:font-semibold">
            Aspiring Full-Stack Developer | Data Scientist | AI Enthusiast
          </p>
          <p className="text-sm text-center sm:text-lg md:text-xl font-medium sm:font-semibold">
            Building Scalable Applications & Data-Driven Solutions
          </p>
          <div className="flex items-center gap-4 py-2">
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
              className="p-2 md:p-3 rounded-full overflow-hidden active:scale-95  shadow"
            >
              <Link target="_blank" href="https://github.com/NikhilKatkuri">
                <Image
                  src="/github.svg"
                  alt="Git-Hub"
                  width={32}
                  height={32}
                  className="size-5 md:size-6"
                />
              </Link>
            </motion.button>
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.6 }}
              className="p-2 md:p-3 rounded-full overflow-hidden active:scale-95 shadow"
            >
              <Link
                target="_blank"
                href="https://www.linkedin.com/in/katkurinikhil"
              >
                <Image
                  src="/linkedin.svg"
                  alt="Linkedin"
                  width={32}
                  height={32}
                  className="size-5 md:size-6"
                />
              </Link>
            </motion.button>
            <motion.button
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
              className="p-2 md:p-3 rounded-full overflow-hidden active:scale-95 shadow"
            >
              <Link href="mailto:knikhil07k@gmail.com">
                <Image
                  src="/mail.svg"
                  alt="Google-mail"
                  width={32}
                  height={32}
                  className="size-5 md:size-6"
                />
              </Link>
            </motion.button>
          </div>
        </motion.div>
      </main>
      <section className="min-h-96 py-6 w-full max-w-[1024px] mx-auto">
        <div className="px-4 py-3 flex flex-col space-y-12">
          <motion.h2
            initial={{ y: 10, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="css-fnt-style text-slate-900 text-xl sm:text-2xl md:text-3xl"
          >
            About me
          </motion.h2>
          <div className="flex flex-col items-center max-md:gap-12 md:flex-row-reverse md:justify-between">
            <Image
              src="/power.png"
              alt="hero_power"
              width={200}
              height={200}
              className=" max-w-36 sm:max-w-72 aspect-square"
            />
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: 0.4 }}
              viewport={{ once: false, amount: 0.2 }}
              className="p-4 rounded-lg md:rounded-xl bg-white shadow"
            >
              <article className="max-w-[90%] sm:max-w-[30rem]">
                <p>
                  I am a passionate Full-Stack Developer, Data Science, and AI
                  enthusiast by building a solid foundation in computer science
                  and engineering, specializing in Data Science at the Hyderabad
                  Institute of Technology and Management (HITAM).
                </p>
                <br />
                <p>
                  I have a strong interest in software development, data-driven
                  solutions, and problem-solving, and I am continually improving
                  my skills to keep pace with the ever-evolving tech landscape.
                </p>
                <br />
                <p className="">
                  My strengths include integrity, effective communication, and
                  quick learning ability, which help me adapt efficiently to new
                  challenges and technologies.
                </p>
              </article>
              <button
                // className="button-3d"
                // ref={btnRef}
                // onMouseMove={handleMouseMove}
                // onMouseLeave={resetTransform}
                ref={btnRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetTransform}
                className="px-6 py-2 mt-3 rounded-full bg-[#171717] text-white font-bold text-sm
                           transition-all duration-300 shadow-lg border border-neutral-800"
              >
                👀 View Resume
              </button>
              {/* <button className="px-4 py-2 active:scale-95 rounded-full bg-[#171717] my-2 text-white shadow">
              👀 View Resume
              </button> */}
              {/* <span className="text-lg font-semibold py-2 text-neutral-950">
                Currently building Projects
              </span> */}
            </motion.div>
          </div>
        </div>
      </section>
      <SkillsUI />
      <Footer />
     
    </>
  );
};

export default Page;
