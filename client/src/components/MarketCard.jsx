function MarketCard({ platform, data }) {
  if (!data || data.error) {
    return (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-white">{platform}</h2>
          <span className="text-red-400 text-sm">连接失败</span>
        </div>
        <p className="text-gray-400 text-sm">
          {data?.error || '无法获取数据'}
        </p>
      </div>
    )
  }

  const handleCardClick = () => {
    if (data.url) {
      window.open(data.url, '_blank')
    }
  }

  return (
    <div
      onClick={handleCardClick}
      className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/15 hover:border-purple-400/50 transition-all cursor-pointer transform hover:scale-105"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{platform}</h2>
        <span className="text-green-400 text-sm">● 在线</span>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">事件数量</span>
          <span className="text-white font-semibold">{data.eventCount || 0}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">总交易量</span>
          <span className="text-white font-semibold">
            ${(data.totalVolume / 1000).toFixed(1)}K
          </span>
        </div>
      </div>

      {data.events && data.events.length > 0 ? (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {data.events.map((event) => (
            <div
              key={event.id}
              className="bg-black/20 rounded-lg p-3 border border-white/10"
            >
              <h3 className="text-white text-sm font-semibold mb-2 truncate">
                {event.title}
              </h3>
              <div className="flex justify-between items-center mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs text-gray-400">是</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: `${event.yesPrice * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-semibold">
                      {(event.yesPrice * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">否</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-red-500 h-2 rounded-full"
                        style={{ width: `${event.noPrice * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white font-semibold">
                      {(event.noPrice * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-xs text-gray-400 mt-2">
                交易量: ${(event.volume / 1000).toFixed(1)}K
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm text-center py-4">
          暂无相关事件
        </p>
      )}

      <div className="mt-4 pt-4 border-t border-white/10">
        <p className="text-xs text-gray-400 text-center">
          点击卡片跳转到 {platform} 主页
        </p>
      </div>
    </div>
  )
}

export default MarketCard


