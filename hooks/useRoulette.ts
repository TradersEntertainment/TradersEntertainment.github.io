import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useWatchContractEvent } from 'wagmi';
import { ROULETTE_ADDRESS, ROULETTE_ABI, GAME_TOKEN_ADDRESS, GAME_TOKEN_ABI } from '@/lib/contracts';
import { parseEther } from 'viem';

export function useRoulette() {
  const { data: minBet } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'minBet',
  });

  const { data: maxBet } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'maxBet',
  });

  const { data: houseBalance } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'houseBalance',
  });

  const { data: paused } = useReadContract({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    functionName: 'paused',
  });

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: placeBet, data: betHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: isBetting } = useWaitForTransactionReceipt({
    hash: betHash,
  });

  const approveBet = async (amount: bigint) => {
    approve({
      address: GAME_TOKEN_ADDRESS,
      abi: GAME_TOKEN_ABI,
      functionName: 'approve',
      args: [ROULETTE_ADDRESS, amount],
    });
  };

  const submitBet = async (amount: bigint, isBlack: boolean) => {
    placeBet({
      address: ROULETTE_ADDRESS,
      abi: ROULETTE_ABI,
      functionName: 'placeBet',
      args: [amount, isBlack],
    });
  };

  return {
    minBet,
    maxBet,
    houseBalance,
    paused,
    approveBet,
    submitBet,
    isApproving,
    isBetting,
    betHash,
  };
}

export function useGameEvents(onGamePlayed?: (data: any) => void) {
  useWatchContractEvent({
    address: ROULETTE_ADDRESS,
    abi: ROULETTE_ABI,
    eventName: 'GamePlayed',
    onLogs(logs) {
      if (onGamePlayed && logs.length > 0) {
        onGamePlayed(logs[0]);
      }
    },
  });
}
