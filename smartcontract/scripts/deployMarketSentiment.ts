import hre from "hardhat";

async function main() {
  const MarketSentiment = await hre.ethers.getContractFactory("MarketSentiment");
  const marketsentiment = await MarketSentiment.deploy();

  await marketsentiment.deployed();

  console.log("MarketSentiment deploy to:", marketsentiment.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});