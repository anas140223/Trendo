
const path = require('path');                                                                         require('dotenv').config({ path: path.join(__dirname, '../.env') });
const { Groq } = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Sends a batch array of articles to Groq AI in a single API call.
 * @param {Array} articlesBatch - Array of article objects containing id, title, and snippet.
 * @returns {Promise<Array>} Array of scored objects from Groq.
 */
async function analyzeBatchWithGroq(articlesBatch) {
  if (!articlesBatch || articlesBatch.length === 0) {
    return [];
  }

  const prompt = `
You are an expert news categorization and scoring engine. 
Analyze the following list of news articles and assign scores from 0 to 100 for each metric:
1. controversy (0 to 100)
2. walletImpact (0 to 100)
3. shockValue (0 to 100)

Calculate:
- "totalScore": Math.round((controversy * 0.3) + (walletImpact * 0.4) + (shockValue * 0.3))
- "isQualified": true if totalScore > 20, else false
- "assignCategory": Pick the dominant category between "Controversy & Legal", "Personal Finance & Market", or "Market Shock & Volatility".

Return ONLY a valid JSON object with a top-level key "results" containing an array matching this exact structure:
{
  "results": [
    {
      "id": "item_id",
      "assignCategory": "Category Name",
      "totalScore": 0,
      "isQualified": false,
      "details": {
        "controversy": 0,
        "walletImpact": 0,
        "shockValue": 0
      }
    }
  ]
}

Articles to process:
${JSON.stringify(articlesBatch)}
`;

  try {
    const completion = await groq.chat.completions.create({
      model: 'qwen/qwen3.6-27b',
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.1,
    });

    const parsedResponse = JSON.parse(completion.choices[0].message.content);
    return parsedResponse.results || [];
  } catch (err) {
    console.error("Groq Batch Scoring Error:", err.message);
    return [];
  }
}

module.exports = { analyzeBatchWithGroq };



