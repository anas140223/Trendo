const {REGIONAL_FILTERS}= require('../keywords/keywords.js')
const Groq = require('groq-sdk')
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });


function evaluateKeyword(text, keywordSet= new Set()){

let count = 0;
  const matchedKeywords = new Set();
  
  if (!text || !keywordSet) {
    return { count: 0, matchedKeywords: [] };
  }

  // Iterate properly through Set items
  for (const keyword of keywordSet) {
    if (!keyword) continue;

    // Escape regex special characters in case keywords contain symbols
    const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    
    // Match exact word boundaries ignoring case ('gi')
    const regex = new RegExp(`\\b${escapedKeyword}\\b`, 'gi');
    const matches = text.match(regex);

    if (matches && matches.length > 0) {
      count += matches.length;
      matchedKeywords.add(keyword); // Keep original keyword representation
    }
  }

  return {
    count,
    matchedKeywords: Array.from(matchedKeywords)
  };
}


function analyzeRegionalTopic(title, snippet, region, limit){
const fulltext = `${title} ${snippet}.trim()`
const targetRegion = region.toUpperCase()

const filterConfig = REGIONAL_FILTERS[targetRegion]
  const controversy = evaluateKeyword(fulltext, filterConfig.controversy);
  const walletImpact = evaluateKeyword(fulltext, filterConfig.walletImpact);
  const shockValue = evaluateKeyword(fulltext, filterConfig.shockValue);
  const categories = [
    { name: 'Controversy', ...controversy },
    { name: 'Wallet Impact', ...walletImpact },
    { name: 'Shock Value', ...shockValue }
  ];
  const eligibleCategories = categories.filter(item => item.count >= limit)
let assignCategory = null
  if(eligibleCategories.length > 0){
    eligibleCategories.sort((a,b)=> b.count - a.count)
    assignCategory= eligibleCategories[0].name
  }
  const totalScore = controversy.count + walletImpact.count + shockValue.count;

  return {
    region: targetRegion,
    isQualified: assignCategory !== null,
    assignCategory,
    totalScore,
    details: {
      controversy,
      walletImpact,
      shockValue
    }
  };
}
//console.log(analyzeRegionalTopic('US Army Secretary Driscoll Resigns After Clash With Hegseth - Bloomberg.com','Modi Urges ‘Friend’ Putin to End War in Ukraine at SCO TalksEarlier, Modi held his first meeting with Iranian President Masoud Pezeshkian since the start of the war' ,'US', 5))
module.exports= {
  analyzeRegionalTopic } 
