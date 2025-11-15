'use client';

import { useStats } from '@/hooks/useStats';
import { formatEther } from 'viem';
import { motion } from 'framer-motion';

export default function StatsBoard() {
  const { houseBalance, collectedFees, totalBuyback, userStats } = useStats();

  const stats = [
    {
      label: 'House Balance',
      value: houseBalance ? formatEther(houseBalance).slice(0, 10) : '0',
      color: 'purple',
    },
    {
      label: 'Collected Fees',
      value: collectedFees ? formatEther(collectedFees).slice(0, 10) : '0',
      color: 'pink',
    },
    {
      label: 'Total Buyback',
      value: totalBuyback ? formatEther(totalBuyback).slice(0, 10) : '0',
      color: 'cyan',
    },
  ];

  const userStatsData = [
    { label: 'Games Played', value: userStats.gamesPlayed },
    { label: 'Win Rate', value: `${userStats.winRate}%` },
    { label: 'Total Wagered', value: formatEther(userStats.totalWagered).slice(0, 8) },
    { label: 'Total Won', value: formatEther(userStats.totalWon).slice(0, 8) },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <div>
          <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Platform Statistics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl"
              >
                <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
                <div className={`text-3xl font-bold text-${stat.color}-400`}>
                  {stat.value}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6 text-white">Your Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {userStatsData.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-4"
              >
                <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-white">Recent Games</h3>
          <div className="text-gray-400 text-center py-8">
            No recent games to display
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-purple-500/20 p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4 text-white">Leaderboard</h3>
          <div className="text-gray-400 text-center py-8">
            Leaderboard coming soon
          </div>
        </div>
      </motion.div>
    </div>
  );
}
