"use client";
import skills from "@/helpers/Skills";
import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";
const SkillsUI: FC = () => {
  return (
    <section className="bg-[url('/bg_md.png')] bg-cover mt-6 min-h-[36rem] overflow-hidden">
      <div className="min-h-96 py-6 max-md:max-w-[90%]   w-full md:max-w-[768px] lg:max-w-[1024px] mx-auto flex flex-col gap-6">
        <motion.h2
          initial={{ y: 10, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="css-fnt-style text-slate-900 text-xl sm:text-2xl md:text-3xl"
        >
          Skills
        </motion.h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {skills.map((t, i) => (
            <motion.div
              key={i}
              initial={{ y: i>0? (i-1) * 15 : 10, opacity: 0 ,scale:0 }}
              whileInView={{ y: 0, opacity: 1 ,scale:1}}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="flex items-center gap-3 cursor-pointer bg-white rounded-md p-2 md:px-4 shadow-sm shadow-black/5 transition-all duration-300 hover:scale-105 hover:shadow-md hover:brightness-105"
            >
              <figure>
                <Image
                  src={t.icon}
                  alt={t.icon}
                  width={32}
                  height={32}
                  className="md:size-12 transition-all duration-300 hover:scale-110"
                />
              </figure>
              <div className="grid -space-y-1">
                <span className="text-md font-semibold">{t.title}</span>
                <p className="text-sm">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsUI;
