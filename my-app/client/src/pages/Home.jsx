import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <div className="text-center max-w-xl">
        <h2 className="text-5xl font-bold mb-4">Welcome to RKMApp</h2>
        <p className="text-lg text-gray-300">
          Unlock premium features and stand out from the crowd.
          Upgrade for just <span className="text-green-400 font-bold">$30</span>.
        </p>
      </div>
    </motion.div>
  );
}
