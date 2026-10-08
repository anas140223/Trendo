const Parser = require('rss-parser');
const { analyzeBatchWithGemini } = require('../Engines/analyseWithGemini.js')
const {processInBatchesWithDelay} = require('../utils/batchProcessor.js')
const path = require('path');
const fs = require('fs');
const parser = new Parser({
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
  },
});


const SOURCES = {
  FinancialTimes: {
    name: 'FinancialTimes',
    domain: 'ft.com',
    Url: 'https://www.ft.com/news-feed?format=rss'
  },
  BBCBusiness: {
    name: 'Bbcbusiness',
    domain: 'bbc.com/news/business',
    Url: 'http://newsrss.bbc.co.uk/rss/newsonline_uk_edition/business/rss.xml'
  },
  skyNewsBusiness: {
    name: 'SkyNewsBusiness',
    domain: 'news.sky.com/business',
    Url: 'http://feeds.skynews.com/feeds/rss/business.xml'
  },
  CityAM: {
    name: 'CityAm',
    domain: 'cityam.com',
    Url: 'https://www.cityam.com/feed/'
  },
  TheTelegraphBusiness: {
    name: 'TheTelegraphBusiness',
   domain: 'telegraph.co.uk/business',
   Url: 'https://www.bing.com/news/search?q=site:telegraph.co.uk/business&format=rss'
  }
};
 const folderPath = path.resolve(__dirname, '../../Trendo/public/UkNewsjson');
 const filePath = path.join(folderPath, 'news_data.json');
   
    // Ensure the destination folder exists
   if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
   }
   
    // 2. Cache management: 12-hour expiration check
   if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const now = Date.now();
    const fileAgeMs = now - stats.mtimeMs;
   const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
   
   if (fileAgeMs > TWELVE_HOURS_MS) {
   // Exceeded 12 hours -> remove old cache to force refetch
   fs.unlinkSync(filePath);
   } else {
    // Cache valid -> return existing JSON file content directly
   const cachedData = fs.readFileSync(filePath, 'utf-8');
    return res.status(200).json(JSON.parse(cachedData));
   }
   }

const getUkcontent = async (req,res)=>{
  const targetRegion = req.query.region || 'US';
  try{
    const feedPromises = Object.values(SOURCES).map(async (source) => {
      try {
        const feed = await parser.parseURL(source.Url);
        return feed.items.map((item) => ({
          id: item.guid || item.link,
          title: item.title,
          snippet: item.contentSnippet || item.summary || '',
          link: item.link,
          pubDate: item.pubDate,
          source: source.name,
          region: 'UK'
        }));
      } catch (err) {
        console.error(`Error fetching RSS feed for ${source.name}:`, err.message);
        return [];
      }

})
    const results = await Promise.all(feedPromises);
    const aggregatedArticles = results.flat();

    if(aggregatedArticles.length === 0){
      res.status(200).json({})
    }
    let geminiscore = null;
    try {
    console.log("Sending articles to Gemnini:", aggregatedArticles.length);
    const geminiscore = await processInBatchesWithDelay(aggregatedArticles, analyzeBatchWithGemini,10,72000 )
      console.log("Gemnini Response Sample:", JSON.stringify(geminiscore?.slice(0, 1), null, 2));                      } catch (err) {
     console.error("Gemnini Analysis Failed Entirely:", err); // Log full error object, not just err.message
    geminiscore = null;
   }


    const finalArticles = aggregatedArticles.map((article)=>{
      const aiResult = geminiscore.find((res) => res.id === article.id)
      return {
         id: article.id,
      title: article.title,
      snippet: article.snippet,
      link: article.link,
      source: article.source,
      region: targetRegion.toUpperCase(),
      isQualified: aiResult ? aiResult.isQualified : false,
      assignCategory: aiResult ? aiResult.assignCategory : "General Business",
      totalScore: aiResult ? aiResult.totalScore : 0,
      details: aiResult ? aiResult.details : { controversy: 0, walletImpact: 0, shockValue: 0 }
      }
    })
    fs.writeFileSync(filePath, JSON.stringify(finalArticles, null, 2), 'utf-8');

    return res.status(200).json(finalArticles)
} catch(error){
  console.error("Controller Error:", error);
   return res.status(500).json({ error: "Internal Server Error" })
}
}
module.exports={ getUkcontent }
