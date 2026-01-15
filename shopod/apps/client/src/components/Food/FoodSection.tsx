export default function FoodSection() {
  return (
    <section className="max-w-6xl mx-auto p-4">
      <h3 className="font-semibold mb-3">Top restaurants near you</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl shadow">
            <div className="h-40 bg-gray-200 rounded-t-xl" />
            <div className="p-4">
              <h4 className="font-semibold">Restaurant Name</h4>
              <p className="text-sm text-gray-500">
                North Indian • ₹200 for two
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
