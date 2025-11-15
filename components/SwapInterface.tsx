'use client';

import { useState } from 'react';
import { useSwap } from '@/hooks/useSwap';
import { formatEther, parseEther } from 'viem';
import { motion } from 'framer-motion';

export default function SwapInterface() {
  const { ethBalance, tokenBalance, tokenSymbol } = useSwap();
  const [amount, setAmount] = useState('');
  const [isETHtoToken, setIsETHtoToken] = useState(true);
  const [slippage, setSlippage] = useState('0.5');

  const handleSwap = async () => {
    if (!amount) return;
    console.log('Swap:', amount, isETHtoToken ? 'ETH to Token' : 'Token to ETH');
  };

  const handleMax = () => {
    if (isETHtoToken && ethBalance) {
      setAmount(ethBalance.formatted);
    } else if (!isETHtoToken && tokenBalance) {
      setAmount(formatEther(tokenBalance as bigint));
    }
  };

  const switchDirection = () => {
    setIsETHtoToken(!isETHtoToken);
    setAmount('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-purple-500/20 p-6 shadow-2xl">
        <h2 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Swap
        </h2>

        <div className="space-y-4">
          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">From</span>
              <span className="text-sm text-gray-400">
                Balance: {isETHtoToken
                  ? ethBalance?.formatted.slice(0, 8)
                  : tokenBalance ? formatEther(tokenBalance as bigint).slice(0, 8) : '0'
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
                className="bg-transparent text-2xl font-semibold outline-none flex-1 text-white"
              />
              <button
                onClick={handleMax}
                className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors"
              >
                MAX
              </button>
              <div className="px-3 py-1 bg-gray-800 rounded-lg font-semibold">
                {isETHtoToken ? 'ETH' : tokenSymbol}
              </div>
            </div>
          </div>

          <div className="flex justify-center -my-2 relative z-10">
            <button
              onClick={switchDirection}
              className="bg-gray-800 border-4 border-gray-900 rounded-xl p-2 hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-400">To</span>
              <span className="text-sm text-gray-400">
                Balance: {!isETHtoToken
                  ? ethBalance?.formatted.slice(0, 8)
                  : tokenBalance ? formatEther(tokenBalance as bigint).slice(0, 8) : '0'
                }
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-semibold text-gray-500">0.0</div>
              <div className="ml-auto px-3 py-1 bg-gray-800 rounded-lg font-semibold">
                {!isETHtoToken ? 'ETH' : tokenSymbol}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 rounded-xl p-4 border border-gray-700">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Slippage Tolerance</span>
              <div className="flex gap-2">
                {['0.5', '1.0', '2.0'].map((value) => (
                  <button
                    key={value}
                    onClick={() => setSlippage(value)}
                    className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                      slippage === value
                        ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                    }`}
                  >
                    {value}%
                  </button>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={handleSwap}
            disabled={!amount}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/50"
          >
            Swap
          </button>
        </div>
      </div>
    </motion.div>
  );
}
