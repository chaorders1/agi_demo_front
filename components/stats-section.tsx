export function StatsSection() {
  return (
    <div className="grid grid-cols-3 gap-8 mb-12">
      <div>
        <div className="text-4xl font-bold text-emerald-600 mb-2">99.8%</div>
        <div className="text-gray-600 font-medium">Detection Rate</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-gray-700 mb-2">2.5M</div>
        <div className="text-gray-600 font-medium">Images Processed</div>
      </div>
      <div>
        <div className="text-4xl font-bold text-gray-700 mb-2">15k</div>
        <div className="text-gray-600 font-medium">Creators</div>
      </div>
    </div>
  )
}
