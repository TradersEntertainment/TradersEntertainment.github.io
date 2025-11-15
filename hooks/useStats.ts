import { useReadContract, useAccount } from 'wagmi';
import { ROULETTE_ADDRESS, ROULETTE_ABI, SWAP_COLLECTOR_ADDRESS, SWAP_COLLECTOR_ABI } from '@/lib/contracts';
import { useState, useEffect } from 'react';

export function useStats() {
  const { address } = useAccount();

  const { data: houseBalance } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'houseBalance',
  });

  const { data: collectedFees } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'collectedFees',
  });

  const { data: totalBuyback } = useReadContract({
    address: SWAP_COLLECTOR_ADDRESS,
    abi: SWAP_COLLECTOR_ABI,
    functionName: 'totalBuyback',
  });

  const [userStats, setUserStats] = useState({
    gamesPlayed: 0,
    totalWagered: BigInt(0),
    totalWon: BigInt(0),
    totalLost: BigInt(0),
    winRate: 0,
  });

  return {
    houseBalance,
    collectedFees,
    totalBuyback,
    userStats,
  };
}
