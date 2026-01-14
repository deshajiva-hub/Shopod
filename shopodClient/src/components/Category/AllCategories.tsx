import { Share2, ShoppingBasket, Egg, Soup, Milk, Coffee, SprayCan, Leaf } from "lucide-react";

export default function CategoryGrid() {
  const categories = [
    { title: "Food", icon: <Share2 size={24} className="text-orange-500" /> },
    { title: "Fruits & Vegetables", icon: <ShoppingBasket size={24} className="text-green-500" /> },
    { title: "Meat & Fish Eggs", icon: <Egg size={24} className="text-red-500" /> },
    { title: "Dairy, Bread & Eggs", icon: <Milk size={24} className="text-blue-500" /> },
    { title: "Sauces & Spreads", icon: <Soup size={24} className="text-yellow-600" /> },
    { title: "Cold Drinks & Juices", icon: <Coffee size={24} className="text-purple-500" /> },
    { title: "Cleaning Essentials", icon: <SprayCan size={24} className="text-teal-500" /> },
    { title: "Organic & Healthy Living", icon: <Leaf size={24} className="text-green-700" /> },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <h3 className="font-bold text-xl mb-6 text-gray-800">All Categories</h3>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-4">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="flex flex-col items-center justify-center bg-white p-4 rounded-xl shadow-sm border border-transparent hover:border-blue-500 hover:shadow-md transition-all cursor-pointer h-32 text-center group"
          >
            <div className="mb-3 p-3 bg-gray-50 rounded-full group-hover:bg-blue-50 transition-colors">
              {cat.icon}
            </div>
            <span className="text-xs font-semibold text-gray-700 leading-tight">
              {cat.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
