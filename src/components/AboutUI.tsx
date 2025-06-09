//code for AboutUI
import { motion } from "framer-motion";
import Image from "next/image";
export default function AboutUI() {
  return (
    <>
     <section className="min-h-96 py-6 w-full max-w-[1024px] mx-auto bg-white">
         
      
    
    <div className="px-4 py-3 flex flex-col space-y-12">
      <motion.h2
        initial={{ y: 10, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
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
          viewport={{ once: true }}
          className="p-4 rounded-lg md:rounded-xl bg-white border-1 border-gray-200 "
        >
          <article className="max-w-[90%] sm:max-w-[30rem]">
            <p>
              I am a passionate Full-Stack Developer, Data Science, and AI
              enthusiast by building a solid foundation in computer science and
              engineering, specializing in Data Science at the Hyderabad
              Institute of Technology and Management (HITAM).
            </p>
            <br />
            <p>
              I have a strong interest in software development, data-driven
              solutions, and problem-solving, and I am continually improving my
              skills to keep pace with the ever-evolving tech landscape.
            </p>
            <br />
            <p className="">
              My strengths include integrity, effective communication, and quick
              learning ability, which help me adapt efficiently to new
              challenges and technologies.
            </p>
          </article>

          <button  className="px-4 py-2 active:scale-95 rounded-full bg-[#171717] my-2 text-white shadow">
            👀 View Resume
          </button>
        </motion.div>
      </div>
    </div>
    </section>
    </>
  );
}
