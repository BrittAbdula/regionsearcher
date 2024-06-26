import regionData from '@/data/r.json';
import MSearch from "@/components/mSearch";
import { metadata } from './layout';
import { AnimatedBeamMultipleOutputDemo } from '@/components/multi';


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const description = "Discover the efficiency of the One-Click Multi-Region Searcher, a tool that offers quick and easy global search across multiple regions simultaneously, saving you time and effort."
  const canonical = `/`;

  return {
    metadataBase: new URL('https://regionsearcher.com'),
    title: {
      absolute: "One-Click Multi-Region Searcher: Quick, Easy, Time-Saving Global Search Tool",
      default: "",
      template: "%s | regionsearcher"
    },
    description: description,
    alternates: {
      canonical,
    }
  };
}

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


export default async function Home() {
  async function getStaticProps() {
    // 读取数据文件
    const geographicRegions: GeographicRegion[] = Object.entries(regionData).map(([key, value]) => ({
      Geographic_region: value.Geographic_region,
      regions: value.regions,
    }));
    return geographicRegions;
  };
  const geographicRegions = await getStaticProps();

  return (
    <main className="flex flex-col min-h-[100dvh] divide-y">
      <MSearch geographicRegions={geographicRegions} />

      <section className="w-full py-12 md:py-24 lg:py-32" id="features">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Region Searcher Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Global Coverage"
              description="Search across multiple regions and countries simultaneously."
              icon="🌍"
            />
            <FeatureCard
              title="Language Translation"
              description="Automatically translate your search query into local languages."
              icon="🗣️"
            />
            <FeatureCard
              title="Customizable Regions"
              description="Select specific regions or countries to focus your search."
              icon="🎛️"
            />
          </div>
        </div>
      </section>

      <section className="w-full grid grid-row py-12 md:py-24 lg:py-32 bg-gray-50" id="about">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">About Region Searcher</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Region Searcher is an advanced tool designed to enhance your global search experience.
            By allowing you to search across multiple regions simultaneously, we break down language
            and geographical barriers, providing you with comprehensive results from around the world.
            Whether you are conducting market research, looking for international news, or exploring
            global trends, our Multi-Region Search tool is your gateway to truly global information.
          </p>
        </div>
        <div className="container mx-auto px-4 flex justify-center items-center py-6 md:py-24 lg:py-16">
          <AnimatedBeamMultipleOutputDemo />
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32 flex flex-col md:flex-row items-center justify-center text-center md:text-left" id="demo">
          <p className="m-8 w-96">Quickly open multi-regional and multi-language Google search results pages to make market insights at your fingertips.</p>
          <img src="/regionsearcher.webp" alt="Region Searcher" className="max-w-md w-full h-auto mb-4 md:mb-0 md:mr-4 rounded-md" />
      </section>





      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="faq">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <FAQItem
              question="How does Region Searcher work?"
              answer="Region Searcher allows you to input a search query and select multiple regions or countries. The system then searches across all selected regions, translating your query if necessary, and aggregates the results from various local search engines and databases."
            />
            <FAQItem
              question="Can I customize which regions to include in my search?"
              answer="Yes, you can select specific regions or countries to include in your search. This allows you to focus on areas that are most relevant to your needs."
            />
            <FAQItem
              question="Is the search query automatically translated?"
              answer="You have the option to enable automatic translation of your search query. When enabled, your query will be translated into the local languages of the selected regions for more comprehensive results."
            />
          </div>
        </div>
      </section>

      <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
        <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              <a className="relative hidden w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-neutral-900 px-3 py-1.5 text-white  dark:bg-white dark:text-black lg:inline-flex"
                target="_blank"
                href="https://chromewebstore.google.com/detail/aitdk-seo-extension-traff/hhfkpjffbhledfpkhhcoidplcebgdgbk"
              >
                <svg viewBox="0 0 256 256" width="1.2em" height="1.2em"><path fill="#FFF" d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223c0-39.335-31.886-71.223-71.221-71.223c-39.335 0-71.222 31.888-71.222 71.223c0 39.335 31.887 71.223 71.222 71.223"></path><path fill="#229342" d="M35.89 92.997c-5.313-9.203-11.558-18.862-18.736-28.977a127.98 127.98 0 0 0 110.857 191.981c11.78-16.523 19.78-28.437 23.996-35.74c8.099-14.028 18.573-34.112 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.017c-17.453-32.548-29.68-54.887-36.683-67.015"></path><path fill="#FBC116" d="M128.008 255.996A127.972 127.972 0 0 0 256 127.997A127.983 127.983 0 0 0 238.837 64c-24.248-2.39-42.143-3.585-53.686-3.585c-13.088 0-32.139 1.195-57.152 3.585l-.014.01a63.993 63.993 0 0 1 55.444 31.987a63.993 63.993 0 0 1-.001 64.01z"></path><path fill="#1A73E8" d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67c0-27.986-22.685-50.67-50.67-50.67c-27.983 0-50.669 22.686-50.669 50.67s22.686 50.67 50.67 50.67"></path><path fill="#E33B2E" d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99l.015.008a63.993 63.993 0 0 1 55.415-96.014z"></path></svg>
                Add to Chrome
              </a>            </h2>
          </div>
        </div>

      </section>
    </main>
  );
}

// 特性卡片组件
const FeatureCard: React.FC<{ title: string; description: string; icon: string }> = ({ title, description, icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

// FAQ 项目组件
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
  <div className="mb-6">
    <h3 className="text-xl font-semibold mb-2">{question}</h3>
    <p className="text-gray-600">{answer}</p>
  </div>
);