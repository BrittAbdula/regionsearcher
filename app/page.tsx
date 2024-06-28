import regionData from '@/data/r.json';
import MSearch from "@/components/mSearch";
import Features from '@/components/features';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  const description = "Discover the efficiency of the One-Click Multi-Region Searcher, a tool that offers quick and easy global search across multiple regions simultaneously, saving you time and effort."
  const canonical = `/`;

  return {
    metadataBase: new URL('https://regionsearcher.com/'),
    title: {
      absolute: "Region Searcher: Quick, Easy, Time-Saving Global Search Tool",
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
      <Features />
      
    </main>
  );
}
