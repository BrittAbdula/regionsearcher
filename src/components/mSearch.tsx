'use client'
import React, { useEffect, useState, useRef } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { CheckCircle } from 'lucide-react';
import TrendChart from '@/components/TrendChart';

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

  const [searchinput, setSearchinput] = useState('');
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [translateSearch, setTranslateSearch] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [generatedLinks, setGeneratedLinks] = useState<{ id: string, url: string, query: string }[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [trendData, setTrendData] = useState<{ country: string; value: number }[]>([]);


  useEffect(() => {
    setIsClient(true);
    const storedRegions = localStorage.getItem('selectedRegions');
    if (storedRegions) {
      setSelectedRegions(JSON.parse(storedRegions));
    }

    const focusTimer = setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);

    return () => clearTimeout(focusTimer);
  }, []);

  useEffect(() => {
    if (isClient) {
      localStorage.setItem('selectedRegions', JSON.stringify(selectedRegions));
      preSearch();
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


  function generateLink(region: Region, query: string) {
    const tdl = region.tld;
    const gl = region.country;
    const hl = region.lang;
    const encodedQ = encodeURIComponent(query);
    const v = '&gl=' + gl + '&hl=' + hl;
    const searchUrl = tdl ? `https://www.google.${tdl}/search?q=${encodedQ}${v}` : `https://www.google.com/search?q=${encodedQ}${v}`;
    return { id: region.id, url: searchUrl, query: query };
  }

  async function preSearch() {
    const searchInput = document.getElementById('searchinput') as HTMLInputElement;
    const q = searchInput.value.trim();
    const selectedRegionObjects = selectedRegions.map(id =>
      allRegions.find(region => region.id === id)!
    );
    let queries: { id: string, query: string }[];

    queries = selectedRegionObjects.map(region => ({ id: region.id, query: q }));

    const links = queries.map(({ id, query }) => {
      const region = allRegions.find(r => r.id === id);
      return region ? generateLink(region, query) : null;
    }).filter(Boolean) as { id: string, url: string, query: string }[];

    setGeneratedLinks(links);

  }

  async function handleSearch() {
    setIsSearching(true);
    try {
      const searchInput = document.getElementById('searchinput') as HTMLInputElement;
      const q = searchInput.value.trim();

      if (!q) {
        alert("Please Enter a Search Query");
        searchInput.focus();
        return;
      }

      const selectedRegionObjects = selectedRegions.map(id =>
        allRegions.find(region => region.id === id)!
      );
      let queries: { id: string, query: string }[];

      if (translateSearch) {
        try {
          const response = await fetch('/api/tk', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchInput: q, regions: selectedRegionObjects }),
          });

          if (!response.ok) {
            throw new Error('Network response was not ok');
          }

          const data = await response.json();
          queries = data.translations;
        } catch (error) {
          console.error('Error:', error);
          queries = selectedRegionObjects.map(region => ({ id: region.id, query: q }));
        }
      } else {
        queries = selectedRegionObjects.map(region => ({ id: region.id, query: q }));
      }

      const links = queries.map(({ id, query }) => {
        const region = allRegions.find(r => r.id === id);
        return region ? generateLink(region, query) : null;
      }).filter(Boolean) as { id: string, url: string, query: string }[];

      setGeneratedLinks(links);



      links.forEach((link) => {
        window.open(link.url, '_blank');
      });
    } finally {
      setIsSearching(false);
    }

    // 获取趋势数据
    // await fetchTrendData(q);
  }

  const onClear = () => {
    setGeneratedLinks([]);
    setSearchinput('');
  }

  function tryOpenWindow(url: string) {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  }

  async function fetchTrendData(query: string) {
    // 这里应该是一个真实的API调用来获取谷歌趋势数据
    // 为了演示，我们使用模拟数据
    const mockData = selectedRegions.map(regionId => {
      const region = allRegions.find(r => r.id === regionId);
      return {
        country: region?.region || '',
        value: Math.floor(Math.random() * 100)
      };
    });
    setTrendData(mockData);
  }


  if (!isClient) {
    return null; // or a loading spinner
  }

  return (
    <section className="w-full py-8 md:py-12 lg:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter sm:text-5xl mb-4">Multi-Region Search</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            One Click to Open Google Search Results Pages in Multiple Locations
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="w-full">
            <div className="flex flex-col md:flex-row items-stretch md:items-center w-full border border-gray-300 rounded-lg md:rounded-full shadow-md hover:shadow-lg focus-within:shadow-lg bg-white transition-shadow duration-200">
              <div className="flex items-center flex-grow p-4 md:py-3 md:px-6">
                <i className="fas fa-search text-gray-400 mr-4 text-xl"></i>
                <input
                  id="searchinput"
                  ref={searchInputRef}
                  type="text"
                  className="flex-grow text-lg focus:outline-none bg-transparent h-10 md:h-12"
                  value={searchinput}
                  onChange={(e) => { setSearchinput(e.target.value); preSearch() }}
                  placeholder="Enter your search query"
                />
              </div>

              <div className="flex items-center justify-between md:justify-end p-3 md:p-2 md:pr-4 border-t md:border-t-0 md:border-l border-gray-300">
                <div className="flex items-center justify-center">
                  <Checkbox
                    id="translate"
                    checked={translateSearch}
                    onCheckedChange={() => setTranslateSearch(!translateSearch)}
                    className="mr-2 h-4 w-4"
                  />
                  <label htmlFor="translate" className="text-sm cursor-pointer whitespace-nowrap">Translate Keywords for Regions</label>
                </div>
              </div>
            </div>

            <div className="flex justify-center m-8">
              <Button
                type="submit"
                disabled={isSearching}
                className={`rounded-sm md:rounded-full bg-neutral-600 hover:bg-neutral-800 text-white px-8 py-6 text-base font-medium transition-all duration-200 shadow-md hover:shadow-lg ${isSearching ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isSearching ? (
                  <div className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  'Region Search'
                )}
              </Button>
            </div>
          </form>
        </div>

        {searchinput && <section className="w-full bg-gray-50 pb-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto mt-8 bg-white rounded-lg shadow-lg p-8 relative">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {generatedLinks.map((link, index) => {
                  const region = allRegions.find(r => r.id === link.id);
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition duration-300 ease-in-out transform hover:scale-105 bg-gray-50 hover:bg-white"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="relative w-12 h-8">
                          <Image
                            src={region?.img_src || ''}
                            alt={region?.region || ''}
                            fill
                            className="rounded object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">{region?.region}</p>
                          <p className="text-sm text-gray-600">{region?.language}</p>
                          <p className="text-indigo-600 hover:text-indigo-800 text-sm mt-1">
                            {link.query.length > 50 ? link.query.slice(0, 50) + '...' : link.query}
                          </p>
                        </div>
                      </div>
                    </a>
                  );
                })}
              </div>

              {/* <h2 className="text-2xl font-bold mb-2 text-gray-800">Search Results for &apos;{searchinput}&apos;</h2> */}
              {/* <p className="text-sm text-gray-600 mt-6">We&apos;ve opened the first result for you. Click on other results to view them.</p> */}
              <p className="text-sm text-gray-600 mt-6">
                We&apos;ve opened the first result for you. To open multiple results at once, try our &quot;Region Searcher&quot; extension. <a target="_blank"
                  href="https://chromewebstore.google.com/detail/region-searcher/kepemcmfokkadammjlcknhpnmakajmkn" className="text-blue-600 underline">Learn more</a>
              </p>
              <div className="flex justify-center items-center mt-6">
                <Button
                  onClick={onClear}
                  className="rounded-sm md:rounded-full bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Clear Results
                </Button>
              </div>
              {/* {trendData.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-bold mb-4">Google Trends Data</h3>
                  <TrendChart data={trendData} />
                </div>
              )} */}
            </div>
          </div>
        </section>}


        <div className="bg-white rounded-lg shadow-md p-8 md:px-16">
          {geographicRegions.map((regionGroup, idx) => (
            <div key={idx} className="mb-6 last:mb-0">
              <h2 className="text-xl md:text-2xl font-semibold mb-4 text-left border-b pb-2">{regionGroup.Geographic_region}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {regionGroup.regions.map((region) => (
                  <div
                    key={region.id}
                    className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors duration-200 ${selectedRegions.includes(region.id) ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => {
                      handleSelectRegion(region.id);
                    }}
                  >
                    <CheckCircle
                      className={`w-5 h-5 mr-3 ${selectedRegions.includes(region.id) ? 'text-green-500' : 'text-gray-300'}`}
                    />
                    <div className="relative w-6 h-4 mr-3">
                      <Image
                        src={region.img_src}
                        alt={region.name || ''}
                        fill
                        className='object-cover rounded-md'
                      />
                    </div>
                    <div className="flex flex-col flex-grow overflow-hidden">
                      <span className="font-medium text-sm whitespace-nowrap overflow-hidden text-ellipsis">{region.region}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap overflow-hidden text-ellipsis">{region.language}</span>
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