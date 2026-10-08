const Parser = require('rss-parser')
const {analyzeBatchWithGemini}= require('../Engines/analyseWithGemini.js')
const parser = new Parser({
  header:{'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
 'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
 'Accept-Language': 'en-US,en;q=0.9' },
  timeout: 5000,
})

const Sources ={
  AustralianFinancialReview:{name:'Australian Financial Review (AFR)', url:'https://www.afr.com/rss/feed.xml'},
 ABCNewsBusiness:{name: 'ABC News Business', url:'https://www.abc.net.au/news/feed/51120/rss.xml'},
  TheAustralianBusiness:{name:'The Australian Business', url:'https://www.theaustralian.com.au/business/feed/'},
  newscomauFinance:{name:'news.com.au Finance', url:'https://www.news.com.au/content-feeds/latest-news-finance/'}
};

const getAusContent = async(req,res)=>{
   const targetRegion = req.query.region || 'AUS';
  try{                                      
  // 1. Updated path targeting frontend public directory
   const folderPath = path.resolve(__dirname, '../../Trendo/public/AusNewsjson');
    const filePath = path.join(folderPath, 'news_data.json');
   
   // Ensure the destination folder exists
   if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });                                                        }
   
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
  const ausNews = Object.values(Sources).map(async (source)=>{
    try{
    const feed = await parser.parseURL(source.url)

   return  feed.items.map((item, index)=>({
      id: `_${index}_${Date.now()}`,
      title: item.title || '',
      snippet: item.contentSnippet || item.snippet || item.title || '',
      link: item.link,
      source: source.source,
      pubDate:item.pubDate
     }))
    }catch(err){
      console.error(`Error fetching RSS feed for ${source.name}:`, err.message);
        return [];
    }
  })  
  
    const results = await Promise.all(ausNews)
    const allArticles = results.flat()
    if(allArticles.length === 0){
      res.status(200).json({})
    }
     let geminiscore = null;
    try {
    console.log("Sending articles to Groq:", allArticles.length);
   geminiScore = await processInBatchesWithDelay(allArticles, analyzeBatchWithGemini, 10, 72000 );
    console.log("Groq Response Sample:", JSON.stringify(geminiscore?.slice(0, 1), null, 2));
   } catch (err) {
    console.error("Groq Analysis Failed Entirely:", err); // Log full error object, not just err.message
   geminiscore = null;
   }
    const finalArticles= allArticles.map((article)=>{
      const aiResult = geminiscore.find((res)=> res.id === article.id)
      return{
        id: article.id,
        title:article.title,
        snippet:article.snippet,
        link:article.link,
        source:article.source,
        region: targetRegion.toUpperCase(),
        isQualified: aiResult ? aiResult.isQualified : false,
        assignCategory: aiResult ? aiResult.assignCategory : "General Business",
        totalScore: aiResult ? aiResult.totalScore : 0,
        details: aiResult ? aiResult.details : { controversy: 0, walletImpact: 0, shockValue: 0 }
      }
    })
    fs.writeFileSync(filePath, JSON.stringify(finalArticles, null, 2), 'utf-8');
       return res.status(200).json(finalArticles);
  }catch(error){
    console.error(error)
    res.status(500).json({sucess:false, message:'failed to get news feed', error:error })
  }
}
module.exports ={ getAusContent };

