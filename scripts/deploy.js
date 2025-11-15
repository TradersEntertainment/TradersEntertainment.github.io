const hre = require("hardhat");

async function main() {
  console.log("Deploying contracts to Base network...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deployer address:", deployer.address);

  const GameToken = await hre.ethers.getContractFactory("GameToken");
  const gameToken = await GameToken.deploy();
  await gameToken.waitForDeployment();
  const gameTokenAddress = await gameToken.getAddress();
  console.log("GameToken deployed to:", gameTokenAddress);

  const RouletteGame = await hre.ethers.getContractFactory("RouletteGame");
  const rouletteGame = await RouletteGame.deploy(gameTokenAddress);
  await rouletteGame.waitForDeployment();
  const rouletteAddress = await rouletteGame.getAddress();
  console.log("RouletteGame deployed to:", rouletteAddress);

  const swapRouter = "0x2626664c2603336E57B271c5C0b26F421741e481";
  const weth = "0x4200000000000000000000000000000000000006";
  const treasury = deployer.address;

  const SwapFeeCollector = await hre.ethers.getContractFactory("SwapFeeCollector");
  const swapFeeCollector = await SwapFeeCollector.deploy(
    gameTokenAddress,
    swapRouter,
    weth,
    treasury
  );
  await swapFeeCollector.waitForDeployment();
  const swapFeeCollectorAddress = await swapFeeCollector.getAddress();
  console.log("SwapFeeCollector deployed to:", swapFeeCollectorAddress);

  console.log("\nDeployment complete!");
  console.log("\nAdd these to your .env.local:");
  console.log(`NEXT_PUBLIC_GAME_TOKEN_ADDRESS=${gameTokenAddress}`);
  console.log(`NEXT_PUBLIC_ROULETTE_ADDRESS=${rouletteAddress}`);
  console.log(`NEXT_PUBLIC_SWAP_COLLECTOR_ADDRESS=${swapFeeCollectorAddress}`);

  console.log("\nInitializing contracts...");
  const fundAmount = hre.ethers.parseEther("100000");
  await gameToken.approve(rouletteAddress, fundAmount);
  await rouletteGame.fundHouse(fundAmount);
  console.log("House funded with 100,000 tokens");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
