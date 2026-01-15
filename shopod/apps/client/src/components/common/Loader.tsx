"use client";

export default function Loader() {
    return (
        <div className="flex flex-col items-center justify-center p-12">
            <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.2em] animate-pulse">Loading Magic...</p>
        </div>
    );
}
