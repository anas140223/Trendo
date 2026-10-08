
const Parser = require('rss-parser')
const axios = require('axios');
const parser = new Parser({
  xml2js: {
    strict: false // Prevents parsing failure on minor malformed XML attributes in Bing RSS
  },
  
});
const SOURCES = {
  ReutersEurope: {
    name: 'Reuters Europe',
    domain: 'reuters.com/world/europe',
    rss: 'https://www.bing.com/news/search?q=site%3areuters.com+europe&format=rss'
  },
  BloombergEurope: {
    name: 'Bloomberg Europe',
    domain: 'bloomberg.com/europe',
    rss: 'https://www.bing.com/news/search?q=site%3abloomberg.com+europe&format=rss'
  },
  EuronewsBusiness: {
    name: 'Euronews Business',
    domain: 'euronews.com/business',
    rss: 'https://www.euronews.com/rss?level=theme&name=business'
  },
  HandelsblattGermany: {
    name: 'Handelsblatt (Germany)',
    domain: 'handelsblatt.com',
    rss: 'https://www.handelsblatt.com/contentexport/feed/top-themen'
  },
  LesEchosFrance: {
    name: 'Les Echos',
    domain: 'lesechos.fr',
    rss: 'https://www.lesechos.fr/rss/rss_une.xml'
  }
}
;
;
// 1. Updated path targeting frontend public directory
    const folderPath = path.resolve(__dirname, '../../Trendo/public/EuroNewsjson');
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
    }                                                                                                }



const getEurocontent = async (req,res)=>{
   const rawFeedsPromises = SOURCES.map(async (src) => {
   try {
   const feed = await parser.parseURL(src.url);
   return feed.items.map((item, index) => ({
    id: `${src.source.toLowerCase().replace(/\s+/g, '_')}_${index}_${Date.now()}`,
    title: item.title || '',
    snippet: item.contentSnippet || item.snippet || item.title || '',
    link: item.link || '',
    source: src.source,
    pubDate: item.pubDate || ''
  }));
   } catch (err) {
    console.error(`Error fetching feed from ${src.source}:`, err.message);
    return [];
   }
    });
   
    const rawFeeds = await Promise.all(rawFeedsPromises);
    const articlesToProcess = rawFeeds.flat();
   if (articlesToProcess.length === 0) {
   return res.status(200).json([]);
    }
    // 4. Run AI analysis/scoring
    // 4. Run AI analysis/scoring
    let geminiScore = null;
   try {
     console.log("Sending articles to Groq:", articlesToProcess.length);
     geminiScore = await processInBatchesWithDelay(articlesToProcess, analyzeBatchWithGemini, 10, 72000);
   console.log("Groq Response Sample:", JSON.stringify(geminiScore?.slice(0, 1), null, 2));
   } catch (err) {
  console.error("Groq Analysis Failed Entirely:", err); 
  geminiScore = null;
   }
                                                                                                                                                 // 5. Map processed articles
   const finalArticles = articlesToProcess.map((article) => {
   const aiResult = Array.isArray(geminiScore) ? geminiScore.find((res)=> res.id === article.id) : null
   return {
   id: article.id,
   title: article.title,
    snippet: article.snippet,
    link: article.link,
    source: article.source,
   region: targetRegion.toUpperCase(),
   isQualified: aiResult ? aiResult.isQualified : false,
   assignCategory: aiResult ? aiResult.assignCategory : 'General Business',
    totalScore: aiResult ? aiResult.totalScore : 0,
   details: aiResult ? aiResult.details : { controversy: 0, walletImpact: 0, shockValue: 0 }
  } 
   });

   // 6. Write new output file to disk
  fs.writeFileSync(filePath, JSON.stringify(finalArticles, null, 2), 'utf-8');
  
  return res.status(200).json(finalArticles);
  
  } catch (err) {
  console.error("Controller Error:", err);
  return res.status(500).json({ error: "Internal Server Error" });
  }
 };
module.exports = { getEurocontent }
