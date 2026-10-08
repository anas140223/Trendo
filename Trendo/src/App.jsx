import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Country from './components/Country.jsx';
import Newscard from './components/Newscard.jsx';

// Region dictionary to map UI selections to JSON region codes
const countryMap = {
  USA: 'US',
  UK: 'UK',
  GCC: 'GCC',
  Europe: 'Europe',
  Aus: 'Aus',
};


export default function App() {
  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [allNews, setAllNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch news data from public/UsaNewsjson/news_data.json on mount
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        // Path relative to public directory
        const response = await fetch('/UsaNewsjson/news_data.json');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setAllNews(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching JSON data:', err.message || err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Filter news based on active selected country/region
  const filteredNews = allNews.filter((item) => {
    if (!item?.region) return false;
    const targetRegion = countryMap[selectedCountry] || selectedCountry;
    return item.region.toLowerCase() === targetRegion.toLowerCase();
  });

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
          {/* Country Selector */}
          <Country
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />

          {/* Results Summary Bar */}
          <div className="pt-6 pb-4 px-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Top News for <span className="text-blue-600">{selectedCountry}</span>
            </h2>
            <span className="text-sm font-medium text-gray-500">
              {filteredNews.length} {filteredNews.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          {/* Loading Indicator */}
          {isLoading && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg font-medium">Loading news articles...</p>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl my-4 text-center">
              Failed to load news: {error}
            </div>
          )}

          {/* Article Grid or Empty Fallback */}
          {!isLoading && !error && (
            filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
                {filteredNews.map((news, index) => (
                  <Newscard key={news.id || index} news={news} />
                ))}
              </div>
            ) : (
              <div className="w-full text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
                <p className="text-gray-500 text-lg">
                  No news available for <span className="font-semibold">{selectedCountry}</span> yet.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

