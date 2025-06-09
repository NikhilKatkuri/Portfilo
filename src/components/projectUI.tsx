//code for ProjectUI
import "../app/globals.css";

export default function ProjectUI() {
  const techStack = ["Node.js", "Git CLI", "GitHub API", "JavaScript", "pkg"];
  const badgeClasses = [
    "badge-amber",
    "badge-purple",
    "badge-green",
    "badge-blue",
  ];
  return (
    <>
      <section className="min-h-96 py-12 px-3 w-full max-w-[1024px] bg-white mx-auto">
        <div className="max-w-5xl h-auto mx-auto ">
          <div className="flex flex-col ">
            <div className="flex flex-col">
              {/* head */}
              <div className="flex  items-baseline sm:gap-2 gap-1">
                <h2 className="text-2xl  lg:text-3xl font-bold text-slate-950">
                  Git-Lite CLI
                </h2>
                <p className="text-base lg:text-xl text-black/40 font-semibold">
                  - GitHub Automation Tool
                </p>
              </div>
              {/* !head */}
              {/* body */}
              <div className="flex flex-col gap-6 my-6">
                {/* skills */}
                <div className="flex items-center py-2 gap-3  flex-wrap">
                  {techStack.map((text, index) => {
                    const colorClass =
                      badgeClasses[index % badgeClasses.length];
                    return (
                      <p
                        className={`px-4 h-8 rounded-full text-sm flex items-center font-medium ${colorClass}`}
                        key={index}
                      >
                        {text}
                      </p>
                    );
                  })}
                </div>
                {/* !skills */}
                <div className="flex flex-col items-center max-w-xl text-base gap-2 font-normal text-gray-800">
                  <p>
                    Git-Lite CLI is a Node.js-powered command-line tool that
                    simplifies GitHub repo management for beginners and pros
                    alike.
                  </p>
                  <p>
                    Automate your GitHub workflow in seconds using easy commands
                    and secure API integration.
                  </p>
                </div>
                <div className="w-auto">
                  <button
                    onClick={() => {
                      window.open(
                        "https://www.npmjs.com/package/git-lite-cli",
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }}
                    className="px-10 py-3 rounded-lg bg-black text-white font-semibold flex items-center gap-2 shadow-md
             hover:bg-gray-900 active:scale-95 transition-transform duration-150 ease-in-out
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                    aria-label="Visit Git-Lite CLI Documentation on npm"
                  >
                    Visit Documentation
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {/* !body */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
