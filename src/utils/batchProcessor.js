// utils/batchProcessor.js

/**
 * Utility function to pause execution
 * @param {number} ms - Milliseconds to delay
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Processes an array of items in batches with a delay between calls.
 * 
 * @param {Array} items - Full list of items to process
 * @param {Function} processFn - Async function to run on each batch (e.g., analyzeBatchWithGroq)
 * @param {number} batchSize - Number of items per batch (default: 10)
 * @param {number} delayMs - Delay in milliseconds between batches (default: 72000 = 1.2 min)
 * @returns {Promise<Array>} - Combined results array from all batches
 */
const processInBatchesWithDelay = async (
  items,
  processFn,
  batchSize = 10,
  delayMs = 72000
) => {
  const allResults = [];
  const totalBatches = Math.ceil(items.length / batchSize);

  console.log(`[Batch Processor] Starting processing for ${items.length} total items (${totalBatches} batches).`);

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    const batchNum = Math.floor(i / batchSize) + 1;

    console.log(`[Batch Processor] Running batch ${batchNum}/${totalBatches} (${batch.length} items)...`);

    try {
      const batchResult = await processFn(batch);

      if (Array.isArray(batchResult)) {
        allResults.push(...batchResult);
      } else if (batchResult) {
        allResults.push(batchResult);
      }
    } catch (err) {
      console.error(`[Batch Processor] Batch ${batchNum} failed:`, err.message);
    }

    // Delay if there are remaining batches to process
    if (i + batchSize < items.length) {
      console.log(`[Batch Processor] Waiting ${delayMs / 1000} seconds before next batch...`);
      await sleep(delayMs);
    }
  }

  return allResults;
};

module.exports = { processInBatchesWithDelay };

