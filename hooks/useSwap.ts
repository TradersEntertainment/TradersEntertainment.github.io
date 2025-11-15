import { useAccount, useBalance, useReadContract } from 'wagmi';
import { GAME_TOKEN_ADDRESS, GAME_TOKEN_ABI } from '@/lib/contracts';

export function useSwap() {
  const { address } = useAccount();

  const { data: ethBalance } = useBalance({
    address: address,
  });

  const { data: tokenBalance } = useReadContract({
    address: GAME_TOKEN_ADDRESS,
    abi: GAME_TOKEN_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
  });

  const { data: tokenName } = useReadContract({
    address: GAME_TOKEN_ADDRESS,
    abi: GAME_TOKEN_ABI,
    functionName: 'name',
  });

  const { data: tokenSymbol } = useReadContract({
    address: GAME_TOKEN_ADDRESS,
    abi: GAME_TOKEN_ABI,
    functionName: 'symbol',
  });

  return {
    ethBalance,
    tokenBalance,
    tokenName,
    tokenSymbol,
    userAddress: address,
  };
}
