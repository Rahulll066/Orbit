import { OrbitIcon } from "../icons/OrbitIcon";
import { Button } from "../components/Button";
import { FeatureSection } from "../components/FeaturedSection";
import { Footer } from "../components/Footer";

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
            className="w-[90%] md:w-[850px] h-[400px] rounded-xl shadow-lg"
          />
        </div>
      </section>

      <section>
       <div>
          <FeatureSection
            tag="Collect effortlessly"
            title="Save everything you need in one place"
            description="With Orbit, you can capture YouTube videos, Tweets, and Docs instantly — all in a clean, unified workspace."
            image="/assets/feature-1.png"
          />

          <FeatureSection
            tag="Stay organized"
            title="Build your perfect workspace"
            description="Categorize and manage your saved content visually — focus on what matters most, without the clutter."
            image="/assets/feature-2.png"
          />

          <FeatureSection
            tag="Access anywhere"
            title="Your Orbit, always with you"
            description="Sync your workspace across devices. Access your saved links anytime, anywhere."
            image="/assets/feature-3.png"
          />

          <FeatureSection
            tag="Share easily"
            title="Collaborate and share instantly"
            description="Generate public links and let your team or friends explore your Orbit with one click."
            image="/assets/feature-4.png"
          />
        </div>
      </section>
      <Footer/>
    </div>
  );
}


