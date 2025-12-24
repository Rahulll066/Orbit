export function WhoIsOrbitFor() {
  return (
    <section className="px-10 md:px-20 py-28 bg-gray-50">
      
      {/* Heading */}
      <div className="text-center mb-20">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Who is <span className="text-[#EFB100]">Orbit</span> for?
        </h1>

        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Orbit is built for anyone who works with links, ideas, and resources every day —
          and wants clarity instead of chaos.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Students */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                          bg-yellow-100 text-2xl mb-6">
            🎓
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Students
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Organize DSA resources, notes, videos, and practice links without losing track.
          </p>
        </div>

        {/* Developers */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                          bg-blue-100 text-2xl mb-6">
            💻
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Developers
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Keep tutorials, GitHub repos, documentation, and references in one workspace.
          </p>
        </div>

        {/* Creators */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                          bg-pink-100 text-2xl mb-6">
            🎨
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Creators
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Save inspiration, posts, videos, and ideas without breaking your flow.
          </p>
        </div>

        {/* Researchers */}
        <div className="group bg-white p-8 rounded-2xl shadow-sm border 
                        hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
          <div className="w-12 h-12 flex items-center justify-center rounded-xl 
                          bg-green-100 text-2xl mb-6">
            🔍
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-900">
            Researchers
          </h3>
          <p className="text-gray-600 leading-relaxed">
            Structure articles, papers, and references — and share them effortlessly.
          </p>
        </div>

      </div>
    </section>
  );
}

