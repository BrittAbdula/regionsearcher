"use client";

import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import React, { forwardRef, useRef } from "react";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white p-3 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";


export function AnimatedBeamMultipleOutputDemo({
  className,
}: {
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);

  return (
    <div
      className={cn(
        "relative flex w-full max-w-[500px] items-center justify-center overflow-hidden rounded-lg border bg-background p-10 md:shadow-xl",
        className,
      )}
      ref={containerRef}
    >
      <div className="flex h-full w-full flex-row items-stretch justify-between gap-10">
        <div className="flex flex-col justify-center">
          <Circle ref={div7Ref}>
            <Icons.user />
          </Circle>
        </div>
        <div className="flex flex-col justify-center">
          <Circle ref={div6Ref} className="h-16 w-16">
            <img src="/icon.png" />
          </Circle>
        </div>
        <div className="flex flex-col justify-center gap-2">
          <Circle ref={div1Ref}>
            <Icons.googleDrive />
          </Circle>
          <Circle ref={div2Ref}>
            <Icons.googleDocs />
          </Circle>
          <Circle ref={div3Ref}>
            <Icons.whatsapp />
          </Circle>
          <Circle ref={div4Ref}>
            <Icons.messenger />
          </Circle>
          <Circle ref={div5Ref}>
            <Icons.notion />
          </Circle>
        </div>
      </div>

      {/* AnimatedBeams */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div3Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div4Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div5Ref}
        toRef={div6Ref}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        toRef={div7Ref}
        duration={3}
      />
    </div>
  );
}

const Icons = {
  notion: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1235 650" width="100" height="100">
      <rect width="1235" height="650" fill="#b22234"/>
      <rect y="72.7" width="1235" height="72.7" fill="#fff"/>
      <rect y="145.4" width="1235" height="72.7" fill="#b22234"/>
      <rect y="218.1" width="1235" height="72.7" fill="#fff"/>
      <rect y="290.8" width="1235" height="72.7" fill="#b22234"/>
      <rect y="363.5" width="1235" height="72.7" fill="#fff"/>
      <rect y="436.2" width="1235" height="72.7" fill="#b22234"/>
      <rect y="508.9" width="1235" height="72.7" fill="#fff"/>
      <rect y="581.6" width="1235" height="72.7" fill="#b22234"/>
      <rect width="494.6" height="363.5" fill="#3c3b6e"/>
      <g fill="#fff">
        <g id="stars">
          <g id="row1">
            <polygon points="49.4,18.2 57.4,32.6 73.5,35.3 61.4,47.1 64.1,63.5 49.4,54.6 34.7,63.5 37.4,47.1 25.3,35.3 41.4,32.6 "/>
            <polygon points="148.3,18.2 156.3,32.6 172.4,35.3 160.3,47.1 163,63.5 148.3,54.6 133.6,63.5 136.3,47.1 124.2,35.3 140.3,32.6 "/>
            <polygon points="247.2,18.2 255.2,32.6 271.3,35.3 259.2,47.1 261.9,63.5 247.2,54.6 232.5,63.5 235.2,47.1 223.1,35.3 239.2,32.6 "/>
            <polygon points="346.1,18.2 354.1,32.6 370.2,35.3 358.1,47.1 360.8,63.5 346.1,54.6 331.4,63.5 334.1,47.1 322,35.3 338.1,32.6 "/>
            <polygon points="445,18.2 453,32.6 469.1,35.3 457,47.1 459.7,63.5 445,54.6 430.3,63.5 433,47.1 420.9,35.3 437,32.6 "/>
          </g>
          <g id="row2">
            <polygon points="98.9,36.4 106.9,50.8 123,53.5 110.9,65.3 113.6,81.7 98.9,72.8 84.2,81.7 86.9,65.3 74.8,53.5 90.9,50.8 "/>
            <polygon points="197.8,36.4 205.8,50.8 221.9,53.5 209.8,65.3 212.5,81.7 197.8,72.8 183.1,81.7 185.8,65.3 173.7,53.5 189.8,50.8 "/>
            <polygon points="296.7,36.4 304.7,50.8 320.8,53.5 308.7,65.3 311.4,81.7 296.7,72.8 282,81.7 284.7,65.3 272.6,53.5 288.7,50.8 "/>
            <polygon points="395.6,36.4 403.6,50.8 419.7,53.5 407.6,65.3 410.3,81.7 395.6,72.8 380.9,81.7 383.6,65.3 371.5,53.5 387.6,50.8 "/>
          </g>
          <use xlinkHref="#row1" y="54.6"/>
          <use xlinkHref="#row2" y="109.2"/>
          <use xlinkHref="#row1" y="163.8"/>
          <use xlinkHref="#row2" y="218.4"/>
          <use xlinkHref="#row1" y="273"/>
        </g>
      </g>
    </svg>
  ),
  openai: () => (
    <svg
      width="100"
      height="100"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z" />
    </svg>
  ),
  googleDrive: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100" height="100">
      <rect width="1200" height="800" fill="#fff"/>
      <circle cx="600" cy="400" r="160" fill="#c60c30"/>
      <path d="M600 240a160 160 0 0 0-160 160h320a160 160 0 0 0-160-160z" fill="#003478"/>
      <path d="M600 560a160 160 0 0 0 160-160H440a160 160 0 0 0 160 160z" fill="#c60c30"/>
      <g fill="#000">
        <path d="M234 204l20-20 50 50-20 20zm30-30l20-20 50 50-20 20zm30-30l20-20 50 50-20 20zM976 204l-20-20-50 50 20 20zm-30-30l-20-20-50 50 20 20zm-30-30l-20-20-50 50 20 20z"/>
      </g>
      <g fill="#000">
        <path d="M234 596l20 20 50-50-20-20zm30 30l20 20 50-50-20-20zm30 30l20 20 50-50-20-20zM976 596l-20 20-50-50 20-20zm-30 30l-20 20-50-50 20-20zm-30 30l-20 20-50-50 20-20z"/>
      </g>
    </svg>
  ),
  whatsapp: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 20" width="100" height="100">
      <rect width="30" height="20" fill="#de2910"/>
      <g fill="#ffde00">
        <polygon points="2,2 4,6 0,4 4,4 0,6"/>
        <polygon points="7,1 8,3 6,3"/>
        <polygon points="9,3 10,5 8,5"/>
        <polygon points="9,6 10,8 8,8"/>
        <polygon points="7,8 8,10 6,10"/>
      </g>
    </svg>
  ),
  googleDocs: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="100" height="100">
      <rect width="1200" height="800" fill="#ffce00"/>
      <rect width="1200" height="533.33" fill="#d00"/>
      <rect width="1200" height="266.67" fill="#000"/>
    </svg>
  ),
  zapier: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100" height="100">
      <rect width="300" height="600" fill="#0055a4"/>
      <rect x="300" width="300" height="600" fill="#fff"/>
      <rect x="600" width="300" height="600" fill="#ef4135"/>
    </svg>
  ),
  messenger: () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="100" height="100">
      <rect width="900" height="600" fill="#fff"/>
      <circle cx="450" cy="300" r="180" fill="#bc002d"/>
    </svg>
  ),
  user: () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000000"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
};
