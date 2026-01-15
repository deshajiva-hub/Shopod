"use client";
export default function StoreCard() {
    return (
        <div className="min-w-[280px] bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer group">
            <div className="h-40 bg-gray-200" />
            <div className="p-4">
                <h3 className="font-black text-gray-800 text-lg group-hover:text-primary transition-colors leading-tight">Gourmet Garden</h3>
                <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Organic • 2.5 km • 35 Mins</p>
                <div className="flex items-center gap-2 mt-3">
                    <span className="text-xs font-black bg-green-500 text-white px-1.5 py-0.5 rounded">4.2 ★</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">500+ Ratings</span>
                </div>
            </div>
        </div>
    );
}
