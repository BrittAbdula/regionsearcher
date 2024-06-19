'use client'
import React, { useState } from "react";
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
  const [selectedRegions, setSelectedRegions] = useState<{ [key: string]: boolean }>({});
  console.log(geographicRegions)

  function handleCheckboxChange(id: string) {
    setSelectedRegions((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  }

  function handleButtonClick() {
    const selectedRegionData = geographicRegions.flatMap((regionGroup) =>
      regionGroup.regions.filter((region) => selectedRegions[region.id])
    );
    console.log(selectedRegionData);
  }

  return (
      <section className="w-full py-12 md:py-24 lg:py-16 ">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Multi-Region Search</h1>
          <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed my-4">
            One-click to open the global search perspective
          </p>
        </div>
        <div className="text-center mt-8">
          <div className="flex items-center border rounded-full shadow px-4 py-2 max-w-lg mx-auto">
            <i className="fas fa-search text-gray-500"></i>
            <input type="text" className="flex-grow ml-2 focus:outline-none" />
            <i className="fas fa-microphone text-blue-500"></i>
            <i className="fas fa-camera text-blue-500 ml-2"></i>
            <Button className="rounded-full bg-slate-600" onClick={handleButtonClick}>
              Region Search
            </Button>
          </div>
        </div>
        <div className="grid py-4 md:py-12 lg:py-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
          {geographicRegions.map((regionGroup, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <h2 className="text-2xl font-semibold mb-8">{regionGroup.Geographic_region}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {regionGroup.regions.map((region, index) => (
                  <div key={region.id} className={`flex items-center py-2 gap-2 ${index >= 8 ? 'md:col-start-1' : ''}`}>
                    <Checkbox
                      checked={!!selectedRegions[region.id]}
                      onChange={() => handleCheckboxChange(region.id)}
                      id={region.id}
                    />
                    <img className="w-6 h-4" src={region.img_src} alt={region.name} />
                    <div className="flex flex-col">
                      <label className="font-medium" htmlFor={region.id}>{region.region}</label>
                      <label className="text-xs" htmlFor={region.id}>{region.language}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

  );
};

export default MSearch;