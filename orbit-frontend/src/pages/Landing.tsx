import { OrbitIcon } from "../icons/OrbitIcon";
import { Button } from "../components/Button";
import { FeatureSection } from "../components/FeaturedSection";
import { Footer } from "../components/Footer";
import { WhoIsOrbitFor } from "../components/OrbitForSection";
import { LandingCTA } from "../components/FinalCTA";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <nav className="flex items-center justify-between px-10 py-5 shadow-sm">
        <div className="flex items-center gap-1 text-2xl font-bold text-[#EFB100]">
          <OrbitIcon/>
          <span>Orbit</span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="primary"
            text="Try Orbit for free"
            onClick={() => (window.location.href = "/signup")}
          />
          <Button
            variant="secondary"
            text="Log in"
            onClick={() => (window.location.href = "/signin")}
          />
        </div>
      </nav>

      <section className="flex flex-col md:flex-row items-center justify-between px-10 md:px-20 py-20 md:py-28 gap-10">
        <div className="flex flex-col gap-6 max-w-xl">
          <h1 className="text-5xl font-bold text-gray-900 leading-tight">
            Organize your digital universe with <span className="text-[#EFB100]">Orbit</span>.
          </h1>
          <p className="text-lg text-gray-600">
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

        <div className="flex justify-center md:justify-end w-full">
          <img
            src="../src/assets/dashboard.png"
            alt="Orbit workspace preview"
            className="
              w-full
              max-w-[900px]
              h-auto
              rounded-xl
              shadow-lg
              object-contain
            "
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


