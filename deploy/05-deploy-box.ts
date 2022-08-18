import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { Box, TimeLock } from "../typechain-types";
// import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log("-------------------------------------------");
  console.log("Deploying Box...");

  // const waitConfirmations = networkConfig[chainId]["waitConfirmations"] || 1;

  const box = await deploy("Box", {
    from: deployer,
    args: [],
    log: true,
    // waitConfirmations: waitConfirmations,
  });

  const timeLock: TimeLock = await ethers.getContract("TimeLock");
  const boxContract: Box = await ethers.getContractAt("Box", box.address);
  const transferOwnerTx = await boxContract.transferOwnership(timeLock.address);
  await transferOwnerTx.wait(1);
  log("All Done!");

  // if (
  //   !developmentChains.includes(network.name) &&
  //   process.env.ETHERSCAN_API_KEY
  // ) {
  //   log("Verifying...");
  //   await verify(box.address, []);
  // }
  log("-----------------------------------------");
};

module.exports.tags = ["all", "main"];
