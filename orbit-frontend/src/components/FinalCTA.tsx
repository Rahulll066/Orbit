export function LandingCTA() {
  return (
    <section className="px-10 md:px-20 py-28 bg-yellow-100 text-center">
      <h2 className="text-4xl font-bold text-black mb-6">
        Your digital workspace deserves better
      </h2>

      <p className="text-lg text-black/80 max-w-2xl mx-auto mb-10">
        Stop losing important links. Start building a focused, organized Orbit for your work and learning.
      </p>

      <div className="flex justify-center">
        <button
          onClick={() => (window.location.href = "/signup")}
          className="bg-yellow-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-gray-900 transition"
        >
          Create your Orbit — Free
        </button>
      </div>
    </section>
  );
}
