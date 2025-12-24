import { OrbitIcon } from "../icons/OrbitIcon";
import { Button } from "../components/Button";
import { FeatureSection } from "../components/FeaturedSection";
import { Footer } from "../components/Footer";
import { WhoIsOrbitFor } from "../components/OrbitForSection";
import { LandingCTA } from "../components/FinalCTA";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex flex-col sm:flex-row items-center justify-between px-4 sm:px-10 py-4 sm:py-5 shadow-sm gap-4 sm:gap-0">
        <div className="flex items-center gap-1 text-2xl font-bold text-[#EFB100]">
          <OrbitIcon/>
          <span>Orbit</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 w-full sm:w-auto">
          <Button
            variant="primary"
            text="Try Orbit for free"
            onClick={() => (window.location.href = "/signup")}
            fullWidth
          />
          <Button
            variant="secondary"
            text="Log in"
            onClick={() => (window.location.href = "/signin")}
            fullWidth
          />
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 md:px-20 py-10 sm:py-20 md:py-28 gap-6 sm:gap-10">
        <div className="flex flex-col gap-4 sm:gap-6 max-w-xl w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Organize your digital universe with <span className="text-[#EFB100]">Orbit</span>.
          </h1>
          <p className="text-base sm:text-lg text-gray-600">
            Bring all your links, videos, and documents into one clean, focused workspace.
            Simple, fast, and beautifully organized — built for creators, learners, and teams.
          </p>
          <div className="mt-4">
            <Button
              variant="primary"
              text="Create your Orbit"
              onClick={() => (window.location.href = "/signup")}
            />
          </div>
        </div>

        <div className="flex justify-center w-full">
          <img
            src="https://ik.imagekit.io/0tglkhk4r/Orbit/dashboard.png"
            alt="Orbit workspace preview"
            className="w-full max-w-[400px] sm:max-w-[600px] md:max-w-[900px] h-auto rounded-lg sm:rounded-xl shadow-lg object-contain"
          />
        </div>
      </section>

      <WhoIsOrbitFor />

      <section className="flex flex-col gap-20 py-20 bg-white">
      <FeatureSection
        tag="From chaos to clarity"
        title="Your links shouldn’t live everywhere"
        description="Bookmarks, chats, notes, and tabs — important resources get scattered fast. Orbit brings everything into one calm, focused workspace."
        image="https://ik.imagekit.io/0tglkhk4r/Orbit/orbitimg1.jpg"
        reverse={false}
      />

      <FeatureSection
        tag="Think in folders"
        title="Organize content the way your brain works"
        description="Create folders for DSA, projects, research, or inspiration. Every link lives exactly where you expect it to."
        image="https://ik.imagekit.io/0tglkhk4r/Orbit/orbitimg2.png"
        reverse={true}
      />

      <FeatureSection
        tag="Preview instantly"
        title="See content without leaving your flow"
        description="Preview YouTube videos, X posts, Docs, and more — directly inside Orbit. No new tabs. No distractions."
        image="https://ik.imagekit.io/0tglkhk4r/Orbit/orbitimg3.jpg"
        reverse={false}
      />

      <FeatureSection
        tag="Share smarter"
        title="One link to share everything"
        description="Generate a public Orbit link and share your curated workspace with friends, teammates, or the world."
        image="https://ik.imagekit.io/0tglkhk4r/Orbit/orbitimgg4.jpg.webp"
        reverse={true}
      />
      </section>

      <LandingCTA />

      <Footer/>
    </div>
  );
}


