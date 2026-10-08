const axios = require('axios');
const cheerio = require('cheerio');
const { JSDOM } = require('jsdom');
const { Readability } = require('@mozilla/readability');


// Helper function to check if a date string matches today's date
const isToday = (dateString) => {
  if (!dateString) return false;
  const itemDate = new Date(dateString);
  const today = new Date();

  return (
    itemDate.getUTCDate() === today.getUTCDate() &&
    itemDate.getUTCMonth() === today.getUTCMonth() &&
    itemDate.getUTCFullYear() === today.getUTCFullYear()
  );
};

async function fetchArticleSnippet(url, pubDate) {
 //  If the article is not from today, skip fetching immediately
  if (!isToday(pubDate)) {
    return '';
  }

  try {
    // Send request with a standard browser User-Agent to avoid instant 403 blocks
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1'
      },
      timeout: 8000,
      maxRedirects: 5               // Keep timeout short so one slow site doesn't hang the API
    });

    const dom = new JSDOM(data, { url });
    const reader = new Readability(dom.window.document);
    const article = reader.parse();

    if (article && article.textContent) {
      // Clean whitespace and get first 100 words
      const cleanText = article.textContent.replace(/\s+/g, ' ').trim();
      const words = cleanText.split(' ');
      return words.slice(0, 100).join(' ');
    }

    return '';
  } catch (error) {
    console.error(`Scrape failed for ${url}:`, error.message);
    return '';
  }
}


// testScraper.js


//async function test() {
//  console.log('--- TEST 1: Testing Article From TODAY ---');
  // Pass today's date so the function executes the scraper
//  const todayDate = new Date().toISOString(); 
//  const testUrl = 'https://www.cnbc.com/2026/09/04/teslas-stock-drops-as-cybercab-update-underwhelms-nhtsa-probe.html'; // Replace with a live article URL

//  console.log(`Fetching from: ${testUrl}...`);
//  const snippetToday = await fetchArticleSnippet(testUrl, todayDate);
  
//  console.log('\nResulting Snippet (First 100 words):');
//  console.log(snippetToday || '[EMPTY / BLOCKED / NO TEXT FOUND]');
//  console.log(`Word Count: ${snippetToday ? snippetToday.split(' ').length : 0}`);

//  console.log('\n--- TEST 2: Testing Article From YESTERDAY ---');
  // Pass an old date to verify it skips fetching
//console.warn();
//  const oldDate = '2020-01-01T00:00:00.000Z';
//  const snippetOld = await fetchArticleSnippet(testUrl,oldDate);
  
//  console.log(`Resulting Snippet for old date: "${snippetOld}" (Expected: "")`);
//}

//test();
module.exports ={ fetchArticleSnippet }


