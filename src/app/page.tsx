"use client";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { motion } from "framer-motion";
import SkillsUI from "@/components/SkillsUI";
import AboutUI from "@/components/AboutUI";
import ProjectUI from "@/components/projectUI";
const Page: FC = () => {
  const ani = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 1 },
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
      <AboutUI />
      <SkillsUI />
      <ProjectUI />
      <Footer />
    </>
  );
};

export default Page;
