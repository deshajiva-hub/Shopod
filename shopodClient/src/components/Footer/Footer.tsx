export default function FooterNav() {
  return (
    <footer
      className="mt-10 text-white"
      style={{
        background: "linear-gradient(90deg, #1264CA 0%, #189BEB 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-8">
        
        {/* Top section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h3 className="font-bold text-lg">Shopod</h3>

          <nav className="flex gap-6 text-sm">
            <button className="hover:underline hover:opacity-90">
              About
            </button>
            <button className="hover:underline hover:opacity-90">
              Help
            </button>
            <button className="hover:underline hover:opacity-90">
              Careers
            </button>
            <button className="hover:underline hover:opacity-90">
              Contact
            </button>
          </nav>
        </div>

        {/* Divider */}
        <div className="my-6 h-px bg-white/30" />

        {/* Bottom section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm gap-2">
          <p className="opacity-90">© 2026 Shopod Demo</p>

          <div className="flex gap-4">
            <span className="cursor-pointer hover:scale-110 transition">
              🌐
            </span>
            <span className="cursor-pointer hover:scale-110 transition">
              📘
            </span>
            <span className="cursor-pointer hover:scale-110 transition">
              📸
            </span>
            <span className="cursor-pointer hover:scale-110 transition">
              🐦
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
