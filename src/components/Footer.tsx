import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Footer: FC = () => {
  return (
    <footer className="bg-[#171717] py-4 px-4 flex flex-col items-center">
      <div className="w-full flex flex-col gap-4 sm:flex-row sm:justify-between py-6">
        <div>
          <h1 className="css-fnt-style text-white text-2xl">NIKHIL</h1>
          <h2 className="text-gray-300  text-sm">Nikhil Katkuri</h2>
          <Link href="mailto:knikhil07k@gmail.com">
            <code className="text-gray-300 text-sm cursor-pointer">
              knikhil07k@gmail.com
            </code>
          </Link>
        </div>
        <div className="flex items-center gap-4 py-2">
          <button className="bg-white p-1.5 rounded-full overflow-hidden active:scale-95  shadow">
            <Link target="_blank" href="https://github.com/NikhilKatkuri">
              <Image
                src="/github.svg"
                alt="Git-Hub"
                width={32}
                height={32}
                className="size-4"
              />
            </Link>
          </button>
          <button className="bg-white p-1.5 rounded-full overflow-hidden active:scale-95 shadow">
            <Link target="_blank" href="https://www.linkedin.com/in/katkurinikhil">
              <Image
                src="/linkedin.svg"
                alt="Linkedin"
                width={32}
                height={32}
                className="size-4"
              />
            </Link>
          </button>
          <button className="bg-white p-1.5 rounded-full overflow-hidden active:scale-95 shadow">
            <Link href="mailto:knikhil07k@gmail.com">
              <Image
                src="/mail.svg"
                alt="Google-mail"
                width={32}
                height={32}
                className="size-4"
              />
            </Link>
          </button>
        </div>
      </div>
      <span className="text-gray-300 text-xs">
        &copy; {new Date().getFullYear()}, Designed and Developed by{" "}
        <span className="font-semibold">Nikhil Katkuri</span>
      </span>
    </footer>
  );
};

export default Footer;
