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
    // 使用官方 Gamma Markets API (REST API)
    const response = await axios.get('https://gamma-api.polymarket.com/markets?closed=false&limit=50&offset=0&order=volume&ascending=false');
    const markets = response.data || [];
    
    const events = markets.map(market => ({
      id: market.id,
      title: market.question,
      volume: parseFloat(market.volume || 0),
      yesPrice: parseFloat(market.outcomes?.[0]?.price || 0),
      noPrice: parseFloat(market.outcomes?.[1]?.price || 0)
    }));
    
    // 过滤搜索词
    const filteredEvents = searchTerm ? 
      events.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase())) : 
      events;
    
    return {
      platform: 'polymarket',
      url: PLATFORM_URLS.polymarket,
      events: filteredEvents,
      totalVolume: filteredEvents.reduce((sum, e) => sum + e.volume, 0),
      eventCount: filteredEvents.length,
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
    // 使用官方 Trade API v2 (REST API)
    const response = await axios.get('https://api.elections.kalshi.com/trade-api/v2/events?status=open&with_nested_markets=true&limit=50');
    const eventsData = response.data.events || [];
    
    // 将事件下的市场扁平化为事件列表
    const allMarkets = [];
    eventsData.forEach(event => {
      if (event.markets && Array.isArray(event.markets)) {
        event.markets.forEach(market => {
          allMarkets.push({
            id: market.ticker,
            title: market.title,
            volume: parseFloat(market.volume || 0),
            yesPrice: parseFloat(market.yes_ask || 0),
            noPrice: parseFloat(market.no_ask || 0)
          });
        });
      }
    });
    
    // 按交易量排序，取前50
    allMarkets.sort((a, b) => b.volume - a.volume);
    const topMarkets = allMarkets.slice(0, 50);
    
    // 过滤搜索词
    const filteredMarkets = searchTerm ? 
      topMarkets.filter(market => market.title.toLowerCase().includes(searchTerm.toLowerCase())) : 
      topMarkets;
    
    return {
      platform: 'kalshi',
      url: PLATFORM_URLS.kalshi,
      events: filteredMarkets,
      totalVolume: filteredMarkets.reduce((sum, e) => sum + e.volume, 0),
      eventCount: filteredMarkets.length,
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
    // 使用官方 Opinion OpenAPI
    const apiKey = process.env.OPINION_LABS_API_KEY; // 从环境变量获取 API Key
    const headers = apiKey ? { apikey: apiKey } : {};
    const response = await axios.get('https://proxy.opinion.trade:8443/openapi/market?status=activated&sortBy=5&limit=50', { headers });
    const markets = response.data || [];
    const events = markets.map(market => ({
      id: market.marketId,
      title: market.marketTitle,
      volume: parseFloat(market.volume || 0),
      yesPrice: parseFloat(market.yesPrice || 0),
      noPrice: parseFloat(market.noPrice || 0)
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


