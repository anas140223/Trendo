const Parser = require('rss-parser')
const {analyzeBatchWithGemini}= require('../Engines/analyseWithGemini.js')
const parser = new Parser({
  header:{
    'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
   'Accept': 'application/rss+xml, application/xml, text/xml',
  },
  timeout:5000,
});

const Sources = {
  zawya: {
    name: 'Zawya',
    domain: 'zawya.com',
    rss: 'https://www.bing.com/news/search?q=site:zawya.com&format=rss'
  },
  arabianbusiness: {
    name: 'Arabian Business',
    domain: 'arabianbusiness.com',
    rss: 'https://www.bing.com/news/search?q=site:arabianbusiness.com&format=rss'
  },
  gulfbusiness: {
    name: 'Gulf Business',
    domain: 'gulfbusiness.com',
    rss: 'https://www.bing.com/news/search?q=site:gulfbusiness.com&format=rss'
  },
  theNationalUae: {
    name: 'The National UAE',
    domain: 'thenationalnews.com',
    rss: 'https://www.bing.com/news/search?q=site:thenationalnews.com&format=rss'
  },
  tradearabia: {
    name: 'TradeArabia',
    domain: 'tradearabia.com',
    rss: 'https://www.bing.com/news/search?q=site:tradearabia.com&format=rss'
  },
  Argaam: {
    name: 'Argaam',
    domain: 'argaam.com',
    rss: 'https://www.bing.com/news/search?q=site:argaam.com&format=rss'
  }
};


const getGccContent = async(req,res)=>{
  try {
    const targetRegion = req.query.region || 'gcc';
    // 1. Updated path targeting frontend public directory
   const folderPath = path.resolve(__dirname, '../../Trendo/public/gccNewsjson');
    const filePath = path.join(folderPath, 'news_data.json');
   
    // Ensure the destination folder exists
    if (!fs.existsSync(folderPath){
     fs.mkdirSync(folderPath, { recursive: true });                                                           }
   
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

    const gccNews = Object.values(Sources).map(async (source)=>{
      const feed = await parser.parseURL(source.rss)
    try {
      return feed.items.map((item, index)=>({
        id:`_${index}_${Date.now()}`,
        title:item.title,
        snippet:item.contentSnippet || item.content || item.summary || '',  
        link:item.link,
        source:source.name,
        pubDate:item.pubDate
      }))
      
    } catch (error) {
      console.error(error)
    }
        })
      
  
    const results = await Promise.all(gccNews)
    const allArtiles = results.flat()
    if(allArtiles.length === 0){
      res.status(200).json({})
    }
   let geminiscore = null;
   76 try {
   77   console.log("Sending articles to Groq:", allArtiles.length);
   78   geminiscore = await processInBatchesWithDelay(allArtiles, analyzeBatchWithGemini, 10, 72000 );
   79   console.log("Groq Response Sample:", JSON.stringify(geminiscore?.slice(0, 1), null, 2));
   80 } catch (err) {
   81   console.error("Groq Analysis Failed Entirely:", err); // Log full error object, not just err.message
   82   geminiscore = null;
   83 }
    
    const finalArticles = allArtiles.map((article)=>{
      const aiResult = geminiscore.find((res)=>res.id === article.id)
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
      fs.writeFileSync(filePath, JSON.stringify(finalArticles, null, 2), 'utf-8'
    res.status(200).json(finalArticles)
   
  } catch (error) {
    console.error(error)
    res.status(500).json({
      sucess: false,
      message:'not getting feeds',
      error:error

    })
    
  }
}



module.exports={ getGccContent }
