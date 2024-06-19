import { Icons } from "@/components/icons";
import OrbitingCircles from "@/components/magicui/orbiting-circles";
import TextReveal from "@/components/magicui/text-reveal";
import WordRotate from "@/components/magicui/word-rotate";
import { ProjectCard } from "@/components/project-card";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  GlobeIcon,
  MailIcon,
  PhoneIcon,
  Youtube,
} from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input"
import { AnimatedBeamMultipleOutputDemo } from "@/components/multi";
import BlurIn from "@/components/magicui/blur-in";
import { Checkbox } from "@/components/ui/checkbox"
import regionData from '@/data/r.json';
import MSearch from "@/components/mSearch";


type Region = {
  region: string;
  language: string;
  img_src: string;
  id: string;
  name?: string;
  tld?: string;
  country?: string;
  lang?: string;
};

type GeographicRegion = {
  Geographic_region: string;
  regions: Region[];
};


export default async function Component() {
  async function getStaticProps() {
    // 读取数据文件
    const geographicRegions: GeographicRegion[] = Object.entries(regionData).map(([key, value] ) => ({
      Geographic_region: value.Geographic_region,
      regions: value.regions,
    }));
    return geographicRegions;
  };
  const geographicRegions = await getStaticProps();

  return (
    <main className="flex flex-col min-h-[100dvh] divide-y">
      <MSearch geographicRegions={geographicRegions}/>

      <section className="w-full py-12 md:py-24 lg:py-32 items-center justify-center" id="projects">
        <AnimatedBeamMultipleOutputDemo />
      </section>

      <section id="projects"></section>

      <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Get in Touch
            </h2>
            <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Have a project in mind or just want to say hello? Fill out the
              form below and I&apos;ll get back to you as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
