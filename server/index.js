const express = require('express');
const cors = require('cors');
const { fetchPolymarketData, fetchKalshiData, fetchOpinionLabsData, 
        fetch42SpaceData, fetchProbableData, fetchPredictData } = require('./services/marketServices');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 获取所有平台数据
app.get('/api/markets', async (req, res) => {
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

    res.json(results);
  } catch (error) {
    console.error('Error fetching market data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
  console.log(`健康检查: http://localhost:${PORT}/api/health`);
  console.log(`市场数据API: http://localhost:${PORT}/api/markets`);
});

