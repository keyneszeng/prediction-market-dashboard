import { useState, useEffect, useCallback } from 'react'

function SearchBar({ onSearch, loading }) {
  const [inputValue, setInputValue] = useState('')

  // 防抖函数
  const debounce = useCallback((func, delay) => {
    let timeoutId
    return (...args) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }, [])

  // 防抖搜索
  const debouncedSearch = useCallback(
    debounce((value) => {
      onSearch(value)
    }, 500), // 500ms 防抖
    [onSearch, debounce]
  )

  useEffect(() => {
    debouncedSearch(inputValue)
  }, [inputValue, debouncedSearch])

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(inputValue)
  }

  const handleClear = () => {
    setInputValue('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入事件或关键词搜索..."
          className="w-full px-6 py-4 text-lg rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          disabled={loading}
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-20 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            disabled={loading}
          >
            ✕
          </button>
        )}
        <button
          type="submit"
          disabled={loading}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '搜索中...' : '搜索'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar


