
import { AnimatedBeamMultipleOutputDemo } from '@/components/multi';
import NikeSearchCarousel from '@/components/NikeSearchCarousel';


// 在文件顶部定义主题颜色
const colors = {
    primary: 'bg-blue-600',
    secondary: 'bg-gray-100',
    accent: 'bg-yellow-400',
    text: 'text-gray-800',
    textLight: 'text-gray-600',
  };

export default function Features() {
    return (
        <>

        <section className="w-full py-16 md:py-24 lg:py-32 bg-gray-100" id="features">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-12 text-center text-gray-800">Powerful Region Searcher Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    <FeatureCard
                        title="Worldwide Search Precision"
                        description="Instantly search across multiple countries and regions. Our tool enables you to conduct multi-location SEO research, simulate searches from different countries, compare results across various regions simultaneously, and customize your search experience by country or location."
                        icon="🌍"
                        benefit="Perfect for global market analysis, localization efforts, and understanding regional search behaviors."
                    />
                    <FeatureCard
                        title="Smart Multilingual Search"
                        description="Effortlessly bridge language barriers with auto-translated queries, multi-language searches, region-specific results in your preferred language, and insights into local search trends across different linguistic markets."
                        icon="🗣️"
                        benefit="Ideal for international marketing, localization testing, and global content strategy."
                    />
                    <FeatureCard
                        title="Precision-Targeted Regional Search"
                        description="Tailor your search with pinpoint accuracy. Handpick specific countries or regions, create custom multi-country search lists, toggle between single and multiple location searches, and fine-tune your SEO strategy with location-specific insights."
                        icon="🎛️"
                        benefit="Essential for targeted market research, regional content optimization, and localized SEO campaigns."
                    />
                </div>
            </div>
            <NikeSearchCarousel />

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

            <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50" id="demo">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center justify-between">
                        <div className="lg:w-1/2 mb-8 lg:mb-0 lg:pr-12">
                            <h2 className="text-3xl font-bold mb-6 text-center lg:text-left">Global Insights at Your Fingertips</h2>
                            <p className="text-lg mb-6 text-center lg:text-left">
                                Instantly access multi-regional, multi-language search results and uncover global market insights with a single click.
                            </p>
                            <ul className="list-disc list-inside text-lg mb-6 text-left">
                                <li>Explore multiple markets simultaneously</li>
                                <li>Break language barriers with auto-translation</li>
                                <li>Access localized search results and trends</li>
                                <li>Compare international markets effortlessly</li>
                                <li>Make data-driven global decisions</li>
                            </ul>
                            <p className="text-lg mb-6 text-center lg:text-left font-semibold">
                                Transform your perspective from local to global. Unlock worldwide opportunities with our Multi-Region Search Tool.
                            </p>
                            <div className="text-center lg:text-left">
                                <a href="#" className="inline-block bg-neutral-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-neutral-700 transition duration-300">
                                    Try Region Searcher Now
                                </a>
                            </div>
                        </div>
                        <div className="lg:w-1/2 flex justify-center">
                            <div className="w-full max-w-md">
                                <img
                                    src="/monthly-growth-data-for-different-countries.png"
                                    alt="Monthly Growth Data for Different Countries"
                                    className="w-full h-auto rounded-lg shadow-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${colors.secondary} py-16`} id="faq">
                <div className="container mx-auto px-4">
                    <h2 className={`text-3xl font-bold mb-12 text-center ${colors.text}`}>Frequently Asked Questions</h2>
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">What is RegionSearcher?</h3>
                            <p>RegionSearcher is a powerful tool designed to help you conduct multi-regional and multi-language searches across various countries simultaneously. It provides instant access to localized search results, enabling you to gain global market insights efficiently.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">How does it work?</h3>
                            <p>RegionSearcher utilizes advanced algorithms to simulate searches from different geographic locations. It automatically translates your queries into relevant languages and retrieves search results as if you were physically present in those regions. This allows you to see search results tailored to specific countries or regions, all from a single interface.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">What can you use it for?</h3>
                            <p>RegionSearcher has numerous applications, including:</p>
                            <ul className="list-disc list-inside mt-2">
                                <li>Market research across multiple countries</li>
                                <li>Competitor analysis in different regions</li>
                                <li>SEO optimization for international audiences</li>
                                <li>Understanding regional search trends and user behaviors</li>
                                <li>Localization and content strategy planning</li>
                                <li>Product and service adaptation for global markets</li>
                            </ul>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">Which countries and languages does RegionSearcher support?</h3>
                            <p>RegionSearcher currently supports over 40 countries and regions, covering major languages including English, Spanish, Chinese, Arabic, French, German, Japanese, and Russian. We are continuously expanding our coverage and plan to include all global regions in the future. Our goal is to provide comprehensive insights for markets worldwide, and we regularly update our supported locations to meet user needs.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">How many regions can I compare simultaneously?</h3>
                            <p>Currently, RegionSearcher allows you to search and view results from multiple regions. We&apos;re excited to announce that we&apos;ll soon be launching a new feature that enables side-by-side SERP (Search Engine Results Page) comparisons for two different regions on the same screen. This update will make it even easier to analyze and compare search results across different locations.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">Is RegionSearcher&apos;s data real-time?</h3>
                            <p>Yes, RegionSearcher provides real-time data. When you conduct a search, our system retrieves the most current results available from each selected region, ensuring you have access to up-to-date information for your analysis.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">Is using RegionSearcher legal? Does it violate search engine terms of service?</h3>
                            <p>RegionSearcher operates within legal boundaries and is designed to comply with search engine terms of service. We use legitimate methods to access publicly available information. However, we recommend users review and comply with the terms of service of the search engines they are querying through our tool.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">How does RegionSearcher protect user privacy and data security?</h3>
                            <p>We take privacy and security seriously. RegionSearcher employs industry-standard encryption for all data transmissions. We do not store user queries or results beyond the necessary processing time. Our systems are regularly audited for security compliance, and we adhere to strict data protection regulations.</p>
                        </div>
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h3 className="text-xl font-semibold mb-3">Is there a free trial? What do the paid plans include?</h3>
                            <p>Currently, all features of RegionSearcher are completely free to use. We believe in providing value to our users and allowing everyone to experience the benefits of our tool. In the future, we plan to introduce premium features based on the added value they provide. These upcoming paid features will be designed to offer enhanced capabilities for more advanced users and businesses with specific needs. We&apos;ll make sure to keep our users informed about any new premium features and pricing plans as they become available.</p>
                        </div>
                    </div>
                </div>
            </section>



            <section className="w-full py-12 md:py-24 lg:py-32" id="contact">
                <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
                    <div className="space-y-3 ">
                        <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                            <a className="relative hidden w-fit items-center justify-center gap-x-1.5 overflow-hidden rounded-full bg-neutral-900 px-3 py-1.5 text-white  dark:bg-white dark:text-black lg:inline-flex"
                                target="_blank"
                                href="https://chromewebstore.google.com/detail/region-searcher/kepemcmfokkadammjlcknhpnmakajmkn"
                            >
                                <svg viewBox="0 0 256 256" width="1.2em" height="1.2em"><path fill="#FFF" d="M128.003 199.216c39.335 0 71.221-31.888 71.221-71.223c0-39.335-31.886-71.223-71.221-71.223c-39.335 0-71.222 31.888-71.222 71.223c0 39.335 31.887 71.223 71.222 71.223"></path><path fill="#229342" d="M35.89 92.997c-5.313-9.203-11.558-18.862-18.736-28.977a127.98 127.98 0 0 0 110.857 191.981c11.78-16.523 19.78-28.437 23.996-35.74c8.099-14.028 18.573-34.112 31.423-60.251v-.015a63.993 63.993 0 0 1-110.857.017c-17.453-32.548-29.68-54.887-36.683-67.015"></path><path fill="#FBC116" d="M128.008 255.996A127.972 127.972 0 0 0 256 127.997A127.983 127.983 0 0 0 238.837 64c-24.248-2.39-42.143-3.585-53.686-3.585c-13.088 0-32.139 1.195-57.152 3.585l-.014.01a63.993 63.993 0 0 1 55.444 31.987a63.993 63.993 0 0 1-.001 64.01z"></path><path fill="#1A73E8" d="M128.003 178.677c27.984 0 50.669-22.685 50.669-50.67c0-27.986-22.685-50.67-50.67-50.67c-27.983 0-50.669 22.686-50.669 50.67s22.686 50.67 50.67 50.67"></path><path fill="#E33B2E" d="M128.003 64.004H238.84a127.973 127.973 0 0 0-221.685.015l55.419 95.99l.015.008a63.993 63.993 0 0 1 55.415-96.014z"></path></svg>
                                Add to Chrome
                            </a>
                        </h2>
                    </div>
                </div>

            </section>

        </>
    );
}


// 特性卡片组件
const FeatureCard = ({ title, description, icon, benefit }: { title: string; description: string; icon: string; benefit: string }) => (
    <div className={`${colors.secondary} rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-105`}>
        <div className="text-5xl mb-4">{icon}</div>
        <h3 className={`text-xl font-semibold mb-3 ${colors.text}`}>{title}</h3>
        <p className={`${colors.textLight} mb-4`}>{description}</p>
        <p className={`text-sm font-medium ${colors.text}`}>{benefit}</p>
    </div>
);

// FAQ 项目组件
const FAQItem: React.FC<{ question: string; answer: string }> = ({ question, answer }) => (
    <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{question}</h3>
        <p className="text-gray-600">{answer}</p>
    </div>
);