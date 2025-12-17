const { fetchPolymarketData, fetchKalshiData, fetchOpinionLabsData,
        fetch42SpaceData, fetchProbableData, fetchPredictData } = require('../server/services/marketServices');

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { query } = req.query;
    const searchTerm = query || '';

    const [polymarket, kalshi, opinionLabs, space42, probable, predict] = await Promise.allSettled([
      fetchPolymarketData(searchTerm),
      fetchKalshiData(searchTerm),
      fetchOpinionLabsData(searchTerm),
      fetch42SpaceData(searchTerm),
      fetchProbableData(searchTerm),
      fetchPredictData(searchTerm)
    ]);

    const results = {
      polymarket: polymarket.status === 'fulfilled' ? polymarket.value : { error: polymarket.reason?.message || 'Failed to fetch' },
      kalshi: kalshi.status === 'fulfilled' ? kalshi.value : { error: kalshi.reason?.message || 'Failed to fetch' },
      opinionLabs: opinionLabs.status === 'fulfilled' ? opinionLabs.value : { error: opinionLabs.reason?.message || 'Failed to fetch' },
      space42: space42.status === 'fulfilled' ? space42.value : { error: space42.reason?.message || 'Failed to fetch' },
      probable: probable.status === 'fulfilled' ? probable.value : { error: probable.reason?.message || 'Failed to fetch' },
      predict: predict.status === 'fulfilled' ? predict.value : { error: predict.reason?.message || 'Failed to fetch' }
    };

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}