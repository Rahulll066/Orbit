export function LandingCTA() {
  return (
    <section className="px-4 sm:px-10 md:px-20 py-12 sm:py-20 md:py-28 bg-yellow-100 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-4 sm:mb-6">
        Your digital workspace deserves better
      </h2>

      <p className="text-sm sm:text-base md:text-lg text-black/80 max-w-2xl mx-auto mb-6 sm:mb-10">
        Stop losing important links. Start building a focused, organized Orbit for your work and learning.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => (window.location.href = "/signup")}
          className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base rounded-md font-semibold transition"
        >
          Create your Orbit — Free
        </button>
      </div>
    </section>
  );
}
