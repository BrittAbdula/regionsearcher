"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";

const SCROLL_BOUNDARY = 120;

export function SiteHeader() {
  const [scrollY, setScrollY] = useState(0);
  const fixedNavRef = useRef<HTMLElement>(null);

  const { theme } = useTheme();

  const getBreakpoint = (width: number) => {
    if (width < 640) return "xs";
    if (width < 768) return "sm";
    if (width < 1024) return "md";
    if (width < 1280) return "lg";
    if (width < 1536) return "xl";
    return "2xl";
  };

  const [breakpoint, setBreakpoint] = useState("xl"); // Default to 'xl' or any other default value

  useEffect(() => {
    // This function will only run in the client-side environment
    const handleResize = () => {
      setBreakpoint(getBreakpoint(window.innerWidth));
    };

    // Set the initial value when the component mounts
    handleResize();

    // Optionally, update the breakpoint on window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const active =
    scrollY >= SCROLL_BOUNDARY ||
    breakpoint === "xs" ||
    breakpoint === "sm" ||
    breakpoint === "md";

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={fixedNavRef}
      className="mx-auto flex w-full max-w-5xl items-center justify-between bg-transparent px-10 py-7 dark:bg-transparent"
    >
      <div className="hidden flex-row items-center justify-center gap-2 lg:flex">
        <a href="#" className="flex h-8 w-8">
          <img src="/icon.png" className="h-full w-full" />
        </a>
        <a href="#">Region Searcher</a>
      </div>
      {/* <h1 className="hidden lg:flex">Logo</h1> */}
      <div className="fixed inset-x-0 top-6 z-50 flex items-center justify-center">
        <motion.div
          initial={{ x: 0 }}
          animate={{
            boxShadow: active
              ? theme === "dark"
                ? "0 0 0 1px rgba(255,255,255,.08), 0 1px 2px -1px rgba(255,255,255,.08), 0 2px 4px rgba(255,255,255,.04)"
                : "0 0 0 1px rgba(17,24,28,.08), 0 1px 2px -1px rgba(17,24,28,.08), 0 2px 4px rgba(17,24,28,.04)"
              : "none",
          }}
          transition={{
            ease: "linear",
            duration: 0.05,
            delay: 0.05,
          }}
          className={cn(
            "supports-backdrop-blur:bg-white/90 mx-4 flex w-full items-center justify-center overflow-hidden rounded-full bg-white bg-white/40 px-3 py-2.5 backdrop-blur-md transition-all dark:bg-black/20 lg:w-auto lg:p-1.5 lg:py-2",
          )}
        >
          <ul className="flex h-full w-full flex-row justify-between gap-6 lg:flex-row lg:justify-start lg:gap-1">
            <li className="flex items-center justify-center px-2 py-0.5">
              <a href="#" className="flex h-8 w-8 lg:hidden">
                <img src="/icon.png" className="h-full w-full" />
              </a>
              <a href="#" className="hidden lg:flex">
                Home
              </a>
            </li>
            <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
              <a href="#features">Features</a>
            </li>
            <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
              <a href="#about">About</a>
            </li>
            <li className="hidden items-center justify-center px-2 py-0.5 lg:flex">
              <a href="#faq">FAQ</a>
            </li>
            <AnimatePresence>
              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: active ? "auto" : 0,
                }}
                transition={{
                  ease: "easeOut",
                  duration: 0.25,
                  delay: 0.05,
                }}
              >
                <AnimatePresence>
                  {active && (
                    <motion.a
                      initial={{ x: "125%" }}
                      animate={{ x: "0" }}
                      exit={{
                        x: "125%",
                        transition: { ease: "easeOut", duration: 2.2 },
                      }}
                      transition={{ ease: "easeOut", duration: 0.5 }}
                      className="relative inline-flex w-fit shrink-0 items-center justify-center gap-x-1.5 overflow-hidden whitespace-nowrap rounded-full bg-neutral-900 px-3 py-1.5 text-white outline-none dark:bg-white dark:text-black md:hidden"
                      href="/"
                    >
                      Home
                    </motion.a>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </ul>
        </motion.div>
      </div>

      <a className={cn(
        "relative inline-flex w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-neutral-900 px-3 py-1.5 text-white dark:bg-white dark:text-black lg:inline-flex",
        "z-50 hover:opacity-80 transition-opacity duration-200 ease-in-out hidden md:inline-block" // 添加这行
      )}
        target="_blank"
        href="https://chromewebstore.google.com/detail/aitdk-seo-extension-traff/hhfkpjffbhledfpkhhcoidplcebgdgbk"
        rel="noopener noreferrer" // 添加这个属性以提高安全性
      >
        <svg viewBox="0 0 256 256" width="1.2em" height="1.2em"><path fill="#FFF" d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223c0-39.335-31.886-71.223-71.221-71.223c-39.335 0-71.222 31.888-71.222 71.223c0 39.335 31.887 71.223 71.222 71.223"></path><path fill="#229342" d="M35.89 92.997c-5.313-9.203-11.558-18.862-18.736-28.977a127.98 127.98 0 0 0 110.857 191.981c11.78-16.523 19.78-28.437 23.996-35.74c8.099-14.028 18.573-34.112 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.017c-17.453-32.548-29.68-54.887-36.683-67.015"></path><path fill="#FBC116" d="M128.008 255.996A127.972 127.972 0 0 0 256 127.997A127.983 127.983 0 0 0 238.837 64c-24.248-2.39-42.143-3.585-53.686-3.585c-13.088 0-32.139 1.195-57.152 3.585l-.014.01a63.993 63.993 0 0 1 55.444 31.987a63.993 63.993 0 0 1-.001 64.01z"></path><path fill="#1A73E8" d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67c0-27.986-22.685-50.67-50.67-50.67c-27.983 0-50.669 22.686-50.669 50.67s22.686 50.67 50.67 50.67"></path><path fill="#E33B2E" d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99l.015.008a63.993 63.993 0 0 1 55.415-96.014z"></path></svg>
        Add to Chrome
      </a>
    </header>
  );
}
