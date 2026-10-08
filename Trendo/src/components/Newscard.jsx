import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function NewsCard({ news }) {
  // Fallback object matching JSON structure
  const article = news || {
    title: 'No Title Available',
    snippet: '',
    source: 'Unknown',
    totalScore: 0,
    assignCategory: 'General',
    link: '#',
    details: {
      controversy: 0,
      walletImpact: 0,
      shockValue: 0,
    },
  };

  // Safely extract details (handles both 'details' and legacy 'scores')
  const scoreDetails = article.details || article.scores || {};

  return (
    <div className="w-full flex flex-col justify-between h-full bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-100 p-6">
      <div>
        {/* Header Badges */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 font-semibold text-xs rounded-full tracking-wide">
            {article.source}
          </span>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 font-bold text-xs rounded-full border border-amber-200">
            Total Score: {article.totalScore ?? 0}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 leading-snug mb-2 hover:text-blue-600 transition-colors">
          <a href={article.link} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        {/* Snippet */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
          {article.snippet}
        </p>
      </div>

      {/* Score Breakdown Section */}
      <div>
        <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-gray-50 rounded-xl mb-4 border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              Controversy
            </span>
            <span className="text-base font-bold text-red-500 mt-0.5">
              {scoreDetails.controversy ?? 0}
            </span>
          </div>

          <div className="flex flex-col items-center text-center border-x border-gray-200">
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              Wallet Impact
            </span>
            <span className="text-base font-bold text-emerald-600 mt-0.5">
              {scoreDetails.walletImpact ?? 0}
            </span>
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">
              Shock Value
            </span>
            <span className="text-base font-bold text-purple-600 mt-0.5">
              {scoreDetails.shockValue ?? 0}
            </span>
          </div>
        </div>

        {/* Action Button */}
        <a
          href={article.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-xl transition-colors duration-200 gap-2"
        >
          <span>Read Full Article</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}


