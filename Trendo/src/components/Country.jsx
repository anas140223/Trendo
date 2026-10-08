import React from 'react';

const countries = ['USA', 'UK', 'GCC', 'Europe', 'Aus'];

export default function Country({ selectedCountry, onSelectCountry }) {
  return (
    <div className="w-full flex items-center justify-between gap-2 p-4">
      {countries.map((country) => (
        <button
          key={country}
          onClick={() => onSelectCountry(country)}
          className={`w-full py-2.5 px-4 rounded-lg shadow font-medium transition-colors duration-200 ${
            selectedCountry === country
              ? 'bg-blue-600 text-white'
              : 'bg-gray-700 hover:bg-gray-800 text-white'
          }`}
        >
          {country}
        </button>
      ))}
    </div>
  );
}


