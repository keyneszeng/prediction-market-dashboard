import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import MarketCard from './components/MarketCard'
import SearchBar from './components/SearchBar'
import LoadingSpinner from './components/LoadingSpinner'

function App() {
  const [markets, setMarkets] = useState({})
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchMarketData = useCallback(async (query = '') => {
    setLoading(true)
    try {
      const response = await axios.get('http://localhost:3001/api/markets', {
        params: { query }
      })
      setMarkets(response.data)
      setLastUpdated(new Date())
    } catch (error) {
      console.error('Error fetching market data:', error)
      if (error.code === 'ECONNREFUSED') {
        alert('无法连接到服务器，请确保后端服务器正在运行在 http://localhost:3001')
      } else if (error.response) {
        alert(`服务器错误: ${error.response.status} - ${error.response.statusText}`)
      } else {
        alert(`获取数据失败: ${error.message}`)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMarketData(searchTerm)
    // 每30秒自动刷新数据
    const interval = setInterval(() => {
      fetchMarketData(searchTerm)
    }, 30000)
    return () => clearInterval(interval)
  }, [searchTerm, fetchMarketData])

  const handleSearch = (term) => {
    setSearchTerm(term)
    fetchMarketData(term)
  }

  const platformNames = {
    polymarket: 'Polymarket',
    kalshi: 'Kalshi',
    opinionLabs: 'Opinion Labs',
    space42: '42 Space',
    probable: 'Probable',
    predict: 'Predict'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">
            预测市场仪表盘
          </h1>
          <p className="text-gray-300 text-lg">
            实时聚合多个预测市场平台数据
          </p>
          {lastUpdated && (
            <p className="text-gray-400 text-sm mt-2">
              最后更新: {lastUpdated.toLocaleTimeString('zh-CN')}
            </p>
          )}
        </header>

        <SearchBar onSearch={handleSearch} loading={loading} />

        {loading && <LoadingSpinner />}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {Object.entries(markets).map(([key, data]) => (
            <MarketCard
              key={key}
              platform={platformNames[key] || key}
              data={data}
            />
          ))}
        </div>

        {!loading && Object.keys(markets).length === 0 && (
          <div className="text-center text-gray-400 mt-12">
            <p>暂无数据，请检查服务器连接</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App

