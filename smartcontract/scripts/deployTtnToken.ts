import hre from "hardhat";

async function main() {
  const Ttn = await hre.ethers.getContractFactory("TtnToken");
  const ttn = await Ttn.deploy();

  await ttn.deployed();

  console.log("Ttn deploy to:", ttn.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});