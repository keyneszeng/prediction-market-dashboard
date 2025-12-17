const axios = require('axios');

// 平台主页URL
const PLATFORM_URLS = {
  polymarket: 'https://polymarket.com',
  kalshi: 'https://kalshi.com',
  opinionLabs: 'http://opinion.trade/',
  space42: 'https://www.42.space/',
  probable: 'https://probable.markets/',
  predict: 'https://predict.fun/'
};

// 模拟数据生成函数（实际应用中需要替换为真实的API调用）
function generateMockData(platform, searchTerm) {
  const events = [
    { id: 1, title: '2024年美国总统选举', volume: 1250000, yesPrice: 0.65, noPrice: 0.35 },
    { id: 2, title: '比特币价格突破10万美元', volume: 850000, yesPrice: 0.42, noPrice: 0.58 },
    { id: 3, title: 'AI技术突破AGI', volume: 320000, yesPrice: 0.28, noPrice: 0.72 },
    { id: 4, title: '全球经济衰退', volume: 680000, yesPrice: 0.55, noPrice: 0.45 },
    { id: 5, title: '气候变化协议达成', volume: 450000, yesPrice: 0.38, noPrice: 0.62 }
  ];

  // 如果有关键词，过滤相关事件
  let filteredEvents = events;
  if (searchTerm) {
    filteredEvents = events.filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return {
    platform,
    url: PLATFORM_URLS[platform],
    events: filteredEvents,
    totalVolume: filteredEvents.reduce((sum, e) => sum + e.volume, 0),
    eventCount: filteredEvents.length,
    lastUpdated: new Date().toISOString()
  };
}

// Polymarket数据获取
async function fetchPolymarketData(searchTerm = '') {
  try {
    const query = `
      query {
        markets(first: 10, order: "volume", desc: true) {
          edges {
            node {
              id
              question
              volume
              yesPrice
              noPrice
            }
          }
        }
      }
    `;
    const response = await axios.post('https://gamma-api.polymarket.com/', { query });
    const markets = response.data.data.markets.edges.map(edge => edge.node);
    const events = markets.map(market => ({
      id: market.id,
      title: market.question,
      volume: parseFloat(market.volume),
      yesPrice: parseFloat(market.yesPrice),
      noPrice: parseFloat(market.noPrice)
    }));
    return {
      platform: 'polymarket',
      url: PLATFORM_URLS.polymarket,
      events: events.filter(event => !searchTerm || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      totalVolume: events.reduce((sum, e) => sum + e.volume, 0),
      eventCount: events.length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Polymarket API error:', error.message);
    return generateMockData('polymarket', searchTerm);
  }
}

// Kalshi数据获取
async function fetchKalshiData(searchTerm = '') {
  try {
    const response = await axios.get('https://trading-api.kalshi.com/trade-api/v2/markets');
    const markets = response.data.markets || [];
    const events = markets.map(market => ({
      id: market.id,
      title: market.title,
      volume: parseFloat(market.volume),
      yesPrice: parseFloat(market.yes_price),
      noPrice: parseFloat(market.no_price)
    }));
    return {
      platform: 'kalshi',
      url: PLATFORM_URLS.kalshi,
      events: events.filter(event => !searchTerm || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      totalVolume: events.reduce((sum, e) => sum + e.volume, 0),
      eventCount: events.length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Kalshi API error:', error.message);
    return generateMockData('kalshi', searchTerm);
  }
}

// Opinion Labs数据获取
async function fetchOpinionLabsData(searchTerm = '') {
  try {
    const response = await axios.get('https://proxy.opinion.trade:8443/openapi/markets');
    const markets = response.data.markets || [];
    const events = markets.map(market => ({
      id: market.id,
      title: market.question,
      volume: parseFloat(market.volume),
      yesPrice: parseFloat(market.yes_price),
      noPrice: parseFloat(market.no_price)
    }));
    return {
      platform: 'opinionLabs',
      url: PLATFORM_URLS.opinionLabs,
      events: events.filter(event => !searchTerm || event.title.toLowerCase().includes(searchTerm.toLowerCase())),
      totalVolume: events.reduce((sum, e) => sum + e.volume, 0),
      eventCount: events.length,
      lastUpdated: new Date().toISOString()
    };
  } catch (error) {
    console.error('Opinion Labs API error:', error.message);
    return generateMockData('opinionLabs', searchTerm);
  }
}

// 42 Space数据获取
async function fetch42SpaceData(searchTerm = '') {
  try {
    // TODO: 实现真实的42 Space API调用
    return generateMockData('space42', searchTerm);
  } catch (error) {
    console.error('42 Space API error:', error.message);
    return generateMockData('space42', searchTerm);
  }
}

// Probable数据获取
async function fetchProbableData(searchTerm = '') {
  try {
    // TODO: 实现真实的Probable API调用
    return generateMockData('probable', searchTerm);
  } catch (error) {
    console.error('Probable API error:', error.message);
    return generateMockData('probable', searchTerm);
  }
}

// Predict数据获取
async function fetchPredictData(searchTerm = '') {
  try {
    // TODO: 实现真实的Predict API调用
    return generateMockData('predict', searchTerm);
  } catch (error) {
    console.error('Predict API error:', error.message);
    return generateMockData('predict', searchTerm);
  }
}

module.exports = {
  fetchPolymarketData,
  fetchKalshiData,
  fetchOpinionLabsData,
  fetch42SpaceData,
  fetchProbableData,
  fetchPredictData,
  PLATFORM_URLS
};


