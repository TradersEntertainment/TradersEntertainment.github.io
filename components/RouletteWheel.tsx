'use client';

import { useState, useEffect } from 'react';
import { useRoulette, useGameEvents } from '@/hooks/useRoulette';
import { useSwap } from '@/hooks/useSwap';
import { formatEther, parseEther } from 'viem';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function RouletteWheel() {
  const { tokenBalance } = useSwap();
  const { minBet, maxBet, approveBet, submitBet, isApproving, isBetting, betHash } = useRoulette();
  const [amount, setAmount] = useState('');
  const [selectedColor, setSelectedColor] = useState<boolean | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ won: boolean; isBlack: boolean } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [history, setHistory] = useState<boolean[]>([]);
  const [streak, setStreak] = useState(0);

  useGameEvents((data) => {
    const args = data.args as any;
    const won = args.payout > 0n;
    const isBlack = args.result;

    setIsSpinning(false);
    setResult({ won, isBlack });
    setHistory(prev => [isBlack, ...prev.slice(0, 9)]);

    if (won) {
      setShowConfetti(true);
      setStreak(prev => prev + 1);
      setTimeout(() => setShowConfetti(false), 5000);
    } else {
      setStreak(0);
    }

    setTimeout(() => setResult(null), 3000);
  });

  const handleSpin = async () => {
    if (!amount || !selectedColor !== null || isSpinning) return;

    const betAmount = parseEther(amount);

    if (minBet && betAmount < minBet) {
      alert(`Minimum bet is ${formatEther(minBet)} tokens`);
      return;
    }

    if (maxBet && betAmount > maxBet) {
      alert(`Maximum bet is ${formatEther(maxBet)} tokens`);
      return;
    }

    try {
      await approveBet(betAmount);
      setTimeout(async () => {
        await submitBet(betAmount, selectedColor as boolean);
        setIsSpinning(true);
      }, 2000);
    } catch (error) {
      console.error('Bet failed:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {showConfetti && <Confetti recycle={false} numberOfPieces={500} />}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-8 shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Roulette
          </h2>
          {streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-block px-4 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold"
            >
              🔥 {streak} Win Streak!
            </motion.div>
          )}
        </div>

        <div className="mb-8">
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 mb-4">
            <label className="text-sm text-gray-400 mb-2 block">Bet Amount</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                disabled={isSpinning}
                className="bg-gray-800 text-2xl font-semibold outline-none flex-1 text-white rounded-lg px-4 py-3 border border-gray-700 focus:border-purple-500 transition-colors"
              />
              <button
                onClick={() => tokenBalance && setAmount(formatEther(tokenBalance as bigint))}
                disabled={isSpinning}
                className="px-4 py-3 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors disabled:opacity-50"
              >
                MAX
              </button>
            </div>
            {minBet && maxBet && (
              <div className="text-xs text-gray-500 mt-2">
                Min: {formatEther(minBet)} | Max: {formatEther(maxBet)}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedColor(true)}
              disabled={isSpinning}
              className={`py-8 rounded-xl font-bold text-2xl transition-all ${
                selectedColor === true
                  ? 'bg-black text-white border-4 border-purple-500 shadow-lg shadow-purple-500/50'
                  : 'bg-black/50 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
              } disabled:opacity-50`}
            >
              BLACK
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setSelectedColor(false)}
              disabled={isSpinning}
              className={`py-8 rounded-xl font-bold text-2xl transition-all ${
                selectedColor === false
                  ? 'bg-red-600 text-white border-4 border-pink-500 shadow-lg shadow-pink-500/50'
                  : 'bg-red-600/50 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
              } disabled:opacity-50`}
            >
              RED
            </motion.button>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSpin}
            disabled={!amount || selectedColor === null || isSpinning || isApproving || isBetting}
            className="w-full py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-bold text-2xl hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50"
          >
            {isApproving ? 'APPROVING...' : isBetting || isSpinning ? 'SPINNING...' : 'SPIN'}
          </motion.button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className={`p-6 rounded-xl mb-6 text-center ${
                result.won
                  ? 'bg-green-500/20 border border-green-500'
                  : 'bg-red-500/20 border border-red-500'
              }`}
            >
              <div className="text-3xl font-bold mb-2">
                {result.won ? '🎉 YOU WON!' : '😢 YOU LOST'}
              </div>
              <div className="text-xl">
                Result: <span className={result.isBlack ? 'text-white' : 'text-red-500'}>
                  {result.isBlack ? 'BLACK' : 'RED'}
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
          <div className="text-sm text-gray-400 mb-2">Recent Results</div>
          <div className="flex gap-2">
            {history.length === 0 ? (
              <div className="text-gray-600 text-sm">No games played yet</div>
            ) : (
              history.map((isBlack, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full ${
                    isBlack ? 'bg-black border-2 border-white' : 'bg-red-600 border-2 border-white'
                  }`}
                />
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
