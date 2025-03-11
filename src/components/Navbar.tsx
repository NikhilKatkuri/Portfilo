"use client"
import { useSuperContext } from "@/Context/SuperContext";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Navbar: FC = () => {
  const {Ischat,setIschat}=useSuperContext()
  return (
    <header className="py-4 px-4 sm:px-6 md:px-8 lg:px-12 bg-white/50 backdrop-blur-sm z-20 sticky top-0 w-full flex items-center justify-between">
        <Link href="/" className="text-slate-900 css-fnt-style text-2xl md:text-3xl">NIKHIL</Link>
        <div className="flex items-center gap-3">
            <button onClick={()=>{setIschat(!Ischat)}} className="bg-green-500/10 p-2 rounded-full active:scale-95">
            <Image src="/ai.svg" alt="_Cherry_" width={20} height={20} className="md:size-6" />
            </button>
        </div>
    </header>
  );
};

export default Navbar;