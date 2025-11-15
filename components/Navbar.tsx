'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useSwap } from '@/hooks/useSwap';
import { formatEther } from 'viem';

export default function Navbar() {
  const pathname = usePathname();
  const { ethBalance, tokenBalance, tokenSymbol } = useSwap();

  const navItems = [
    { name: 'Swap', path: '/swap' },
    { name: 'Roulette', path: '/roulette' },
    { name: 'Stats', path: '/stats' },
  ];

  return (
    <nav className="border-b border-purple-500/20 bg-gray-900/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <span className="text-xl">🎰</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Base Roulette
              </span>
            </Link>
            <div className="flex gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-4 py-2 rounded-lg transition-all ${
                    pathname === item.path
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/50'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            {tokenBalance && (
              <div className="hidden sm:flex items-center gap-4 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700">
                <div className="text-right">
                  <div className="text-xs text-gray-400">Balance</div>
                  <div className="text-sm font-semibold text-purple-400">
                    {parseFloat(formatEther(tokenBalance as bigint)).toFixed(2)} {tokenSymbol}
                  </div>
                </div>
                {ethBalance && (
                  <div className="text-right border-l border-gray-700 pl-4">
                    <div className="text-xs text-gray-400">ETH</div>
                    <div className="text-sm font-semibold text-cyan-400">
                      {parseFloat(ethBalance.formatted).toFixed(4)}
                    </div>
                  </div>
                )}
              </div>
            )}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
