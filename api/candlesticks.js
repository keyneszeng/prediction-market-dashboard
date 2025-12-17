const { fetchKalshiCandlesticks } = require('../server/services/marketServices');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { seriesTicker, eventTicker } = req.query;

  if (!seriesTicker || !eventTicker) {
    return res.status(400).json({ error: 'Missing seriesTicker or eventTicker' });
  }

  try {
    const candlesticks = await fetchKalshiCandlesticks(seriesTicker, eventTicker);
    res.status(200).json(candlesticks);
  } catch (error) {
    console.error('Error fetching candlesticks:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}