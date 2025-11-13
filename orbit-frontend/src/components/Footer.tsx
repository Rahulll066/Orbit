import { OrbitIcon } from "../icons/OrbitIcon";

export function Footer() {
  return (
    <footer className="bg-yellow-100 text-black-900 py-12 px-20 mt-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-1 mb-4">
            <OrbitIcon/>
            <h2 className="text-xl font-bold text-yellow-500">Orbit</h2>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed">
            Stay organized, Stay in Orbit. Your all-in-one space for saving,
            sharing, and managing your digital world.
          </p>
        </div>

        {/* Product */}
        <div>
          <h3 className="text-black font-semibold mb-4">Product</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Features</a></li>
            <li><a href="#" className="hover:text-yellow-400">Pricing</a></li>
            <li><a href="#" className="hover:text-yellow-400">Integrations</a></li>
            <li><a href="#" className="hover:text-yellow-400">FAQs</a></li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-black font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">Docs</a></li>
            <li><a href="#" className="hover:text-yellow-400">Community</a></li>
            <li><a href="#" className="hover:text-yellow-400">Blog</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-black font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-yellow-400">hello@orbit.com</a></li>
            <li><a href="#" className="hover:text-yellow-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-yellow-400">Terms of Use</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Orbit. All rights reserved.
      </div>
    </footer>
  );
}
