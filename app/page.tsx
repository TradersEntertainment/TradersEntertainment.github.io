'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="text-8xl mb-8"
          >
            🎰
          </motion.div>
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Base Roulette Casino
          </h1>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Experience the thrill of roulette on Base network. Play with tokens, win big, and enjoy seamless DeFi integration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6"
          >
            <div className="text-4xl mb-4">💱</div>
            <h3 className="text-xl font-bold mb-2 text-purple-400">Swap</h3>
            <p className="text-gray-400 text-sm">
              Exchange ETH for game tokens with minimal slippage
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-pink-500/20 p-6"
          >
            <div className="text-4xl mb-4">🎲</div>
            <h3 className="text-xl font-bold mb-2 text-pink-400">Play Roulette</h3>
            <p className="text-gray-400 text-sm">
              Place your bets on black or red and win 1.98x
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-cyan-500/20 p-6"
          >
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-bold mb-2 text-cyan-400">Track Stats</h3>
            <p className="text-gray-400 text-sm">
              Monitor your performance and platform statistics
            </p>
          </motion.div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link href="/swap">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg shadow-lg shadow-purple-500/50"
            >
              Get Tokens
            </motion.button>
          </Link>
          <Link href="/roulette">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gray-800 border border-purple-500/50 rounded-xl font-semibold text-lg hover:bg-gray-700"
            >
              Play Now
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
