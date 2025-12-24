export function WhoIsOrbitFor() {
  return (
    <section className="px-4 sm:px-10 md:px-20 py-12 sm:py-20 md:py-28 bg-gray-50">
      
      {/* Heading */}
      <div className="text-center mb-10 sm:mb-16 md:mb-20">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
          Who is <span className="text-[#EFB100]">Orbit</span> for?
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Orbit is built for anyone who works with links, ideas, and resources every day —
          and wants clarity instead of chaos.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-10">

        {/* Students */}
        <div className="group bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl shadow-sm border hover:shadow-lg sm:hover:shadow-xl hover:sm:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-yellow-100 text-xl sm:text-2xl mb-4 sm:mb-6">
            🎓
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
            Students
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Organize DSA resources, notes, videos, and practice links without losing track.
          </p>
        </div>

        {/* Developers */}
        <div className="group bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl shadow-sm border hover:shadow-lg sm:hover:shadow-xl hover:sm:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-blue-100 text-xl sm:text-2xl mb-4 sm:mb-6">
            💻
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
            Developers
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Keep tutorials, GitHub repos, documentation, and references in one workspace.
          </p>
        </div>

        {/* Creators */}
        <div className="group bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl shadow-sm border hover:shadow-lg sm:hover:shadow-xl hover:sm:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-pink-100 text-xl sm:text-2xl mb-4 sm:mb-6">
            🎨
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
            Creators
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Save inspiration, posts, videos, and ideas without breaking your flow.
          </p>
        </div>

        {/* Researchers */}
        <div className="group bg-white p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-2xl shadow-sm border hover:shadow-lg sm:hover:shadow-xl hover:sm:-translate-y-1 transition-all duration-300">
          <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-lg sm:rounded-xl bg-green-100 text-xl sm:text-2xl mb-4 sm:mb-6">
            🔍
          </div>
          <h3 className="text-base sm:text-lg md:text-xl font-semibold mb-2 sm:mb-3 text-gray-900">
            Researchers
          </h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Structure articles, papers, and references — and share them effortlessly.
          </p>
        </div>

      </div>
    </section>
  );
}

