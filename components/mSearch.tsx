'use client'
import React, { useEffect, useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

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

type Props = {
  geographicRegions: GeographicRegion[];
};

const MSearch: React.FC<Props> = ({ geographicRegions }) => {
  const allRegions = geographicRegions.flatMap((regionGroup) =>
    regionGroup.regions.map((region) => ({ ...region, groupId: regionGroup.Geographic_region }))
  );

  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [translateSearch, setTranslateSearch] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedRegions = localStorage.getItem('selectedRegions');
    if (storedRegions) {
      setSelectedRegions(JSON.parse(storedRegions));
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('selectedRegions', JSON.stringify(selectedRegions));
    }
  }, [selectedRegions, isClient]);

  function handleSelectRegion(id: string) {
    setSelectedRegions((prev) => {
      if (prev.includes(id)) {
        return prev.filter((region) => region !== id);
      }
      return [...prev, id];
    });
  }

  function handleButtonClick() {
    selectedRegions.forEach((region) => {
      const tdl = allRegions.find((r) => r.id === region)?.tld;
      const gl = allRegions.find((r) => r.id === region)?.country;
      const hl = allRegions.find((r) => r.id === region)?.lang;
      const q = encodeURIComponent((document.getElementById('searchinput') as HTMLInputElement).value);
      const v = '&gl=' + gl + '&hl=' + hl;
      const searchUrl = tdl ? `https://www.google.${tdl}/search?q=${q}${v}` : `https://www.google.com/search?q=${q}${v}`;
      window.open(searchUrl, "_blank");
    });
  }

  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Multi-Region Search</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            One-click to open the global search perspective
          </p>
        </div>

        <div className="max-w-3xl mx-auto mb-12">
          <form onSubmit={(e) => {e.preventDefault(); handleButtonClick();}} target="_blank" className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center w-full border rounded-full shadow px-4 py-2 bg-white">
              <i className="fas fa-search text-gray-500 mr-2"></i>
              <input id="searchinput" type="text" className="flex-grow focus:outline-none" placeholder="Enter your search query" />
              <i className="fas fa-microphone text-blue-500 ml-2"></i>
              <i className="fas fa-camera text-blue-500 ml-2"></i>
            </div>
            <div className="flex items-center gap-4">
              <Button type="submit" className="rounded-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">
                Region Search
              </Button>
            </div>
              <div className="flex items-center">
                <Checkbox
                  id="translate"
                  checked={translateSearch}
                  onCheckedChange={() => setTranslateSearch(!translateSearch)}
                  className="mr-2"
                />
                <label htmlFor="translate" className="text-sm cursor-pointer">Translate Keywords for Regions</label>
              </div>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {geographicRegions.map((regionGroup, idx) => (
            <div key={idx} className="mb-4 last:mb-0">
              <h2 className="text-2xl font-semibold mb-4 text-left border-b pb-2">{regionGroup.Geographic_region}</h2>
              <div className="flex flex-wrap justify-start gap-4">
                {regionGroup.regions.map((region) => (
                  <div
                    key={region.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors duration-200 w-48 ${
                      selectedRegions.includes(region.id) ? 'bg-blue-100' : 'hover:bg-gray-100'
                    }`}
                    onClick={() => handleSelectRegion(region.id)}
                  >
                    <Checkbox
                      checked={selectedRegions.includes(region.id)}
                      onCheckedChange={() => handleSelectRegion(region.id)}
                      id={region.id}
                      className="cursor-pointer mr-3"
                    />
                    <img className="w-6 h-4 mr-3" src={region.img_src} alt={region.name} />
                    <div className="flex flex-col flex-grow overflow-hidden">
                      <label className="font-medium cursor-pointer text-sm whitespace-nowrap overflow-hidden text-ellipsis" htmlFor={region.id}>{region.region}</label>
                      <label className="text-xs cursor-pointer text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis" htmlFor={region.id}>{region.language}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MSearch;