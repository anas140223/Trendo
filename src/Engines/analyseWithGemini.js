const { GoogleGenAI, Type } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: 'AQ.Ab8RN6LmclJhpkGevws3NiXC-p2ldxdngbvNuPZtvpsq99m3yA' });

async function analyzeBatchWithGemini(articlesBatch) {
  if (!articlesBatch || articlesBatch.length === 0) return [];

  // Minify input
  const minifiedArticles = articlesBatch.map((a) => ({
    id: a.id,
    title: a.title,
    snippet: (a.snippet || '').slice(0, 150),
  }));

  const prompt = `
Analyze these articles and assign scores (0 to 100) for controversy, walletImpact, and shockValue.
Calculate:
- totalScore: Math.round((controversy * 0.3) + (walletImpact * 0.4) + (shockValue * 0.3))
- isQualified: true if totalScore > 20
- assignCategory: "Controversy & Legal", "Personal Finance & Market", or "Market Shock & Volatility".

Articles:
${JSON.stringify(minifiedArticles)}
`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            results: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  assignCategory: { type: Type.STRING },
                  totalScore: { type: Type.INTEGER },
                  isQualified: { type: Type.BOOLEAN },
                  details: {
                    type: Type.OBJECT,
                    properties: {
                      controversy: { type: Type.INTEGER },
                      walletImpact: { type: Type.INTEGER },
                      shockValue: { type: Type.INTEGER },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    const parsedData = JSON.parse(response.text);
    return parsedData?.results || [];
  } catch (err) {
    console.error("Gemini AI Error:", err.message);
    return [];
  }
}

module.exports = { analyzeBatchWithGemini };

