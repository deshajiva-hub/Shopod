export default function RecommendedSection() {
  return (
    <section className="max-w-6xl mx-auto px-4 py-6">
      {/* Section title */}
      <h3 className="font-semibold text-lg mb-4">
        Recommended For You
      </h3>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl shadow border overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <div className="h-36 bg-gray-200" />

              {/* Time badge */}
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                up 40 mins
              </span>
            </div>

            {/* Content */}
            <div className="p-3">
              <h4 className="font-semibold text-sm mb-1">
                Spicy Veg Burger Combo
              </h4>

              {/* Rating */}
              <div className="flex items-center text-xs text-gray-500 mb-1">
                <span className="text-yellow-400 mr-1">★★★★★</span>
                <span>Indian</span>
              </div>

              {/* Price */}
              <p className="text-xs text-gray-500 mb-2">
                ₹1,255 for 1
              </p>

              {/* Bottom row */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-green-600 font-medium">
                  Flat 20% off
                </span>

                <button className="text-sm font-semibold text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-50 transition">
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
