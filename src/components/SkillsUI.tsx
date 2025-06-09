"use client";

import { FC } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import skills, { Skill, SkillCategory } from "@/helpers/Skills";

// Animation variants for cleaner, reusable animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0, scale: 0.95 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const SkillsUI: FC = () => {
  return (
    <section
      className="py-12 px-4 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-5xl mx-auto">
        <motion.h2
          id="skills-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold text-center css-fnt-style tracking-wider text-gray-900 dark:text-white mb-8"
        >
          Skills
        </motion.h2>

        {skills.map((category: SkillCategory) => (
          <div key={category.category} className="mb-10">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4"
            >
              {category.category}
            </motion.h3>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {category.skills.map((skill: Skill) => (
                <motion.div
                  key={skill.title}
                  variants={itemVariants}
                  className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
                  role="article"
                  aria-label={`Skill: ${skill.title}`}
                >
                  <Image
                    src={skill.icon}
                    alt={`${skill.title} icon`}
                    width={40}
                    height={40}
                    className="w-10 h-10 object-contain"
                    priority={false}
                    unoptimized={skill.icon.includes("upload.wikimedia")}
                  />
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {skill.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {skill.desc}
                    </p>
                    {skill.proficiency && (
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-slate-950 h-2 rounded-full transition-all ease-in-out duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsUI;
