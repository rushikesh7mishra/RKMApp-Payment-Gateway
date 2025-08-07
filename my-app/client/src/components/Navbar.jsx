import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { motion } from "framer-motion";

export default function Navbar() {
  const isPremium = Cookies.get("isPremium") === "true";

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="backdrop-blur-md bg-black/30 shadow-md text-white px-6 py-4 flex justify-between items-center fixed top-0 w-full z-50"
    >
      <h1 className="text-2xl font-extrabold tracking-wide">
        RKM<span className="text-blue-400">App</span>{" "}
        {isPremium && <span className="text-yellow-400 text-sm">(Premium)</span>}
      </h1>
      <div className="space-x-6 text-lg">
        <Link to="/" className="hover:text-blue-300 transition">Home</Link>
        <Link to="/premium" className="hover:text-blue-300 transition">Premium</Link>
      </div>
    </motion.nav>
  );
}
