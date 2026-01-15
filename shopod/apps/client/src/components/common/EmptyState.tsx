"use client";

export default function EmptyState({ title = "No items found", message = "Try searching for something else!" }: { title?: string, message?: string }) {
    return (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="text-6xl mb-6 grayscale opacity-20">🛒</div>
            <h3 className="text-xl font-black text-gray-800 mb-2">{title}</h3>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest leading-relaxed">{message}</p>
        </div>
    );
}
