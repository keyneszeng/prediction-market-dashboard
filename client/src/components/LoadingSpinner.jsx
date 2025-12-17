function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
      <p className="ml-4 text-white text-lg">加载中...</p>
    </div>
  )
}

export default LoadingSpinner


