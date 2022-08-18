import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { TimeLock } from "../typechain-types";
import {
  developmentChains,
  networkConfig,
  MIN_DELAY,
} from "../helper-hardhat-config";
// import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  // const chainId: number = network.config.chainId!;
  //

  // const waitConfirmations = networkConfig[chainId]["waitConfirmations"] || 1;

  log("-----------------------------------------");
  log("Deploying TimeLock...");
  const timeLock = await deploy("TimeLock", {
    from: deployer,
    args: [MIN_DELAY, [], []],
    log: true,
    // waitConfirmations: waitConfirmations,
  });

  //   if (
  //     !developmentChains.includes(network.name) &&
  //     process.env.ETHERSCAN_API_KEY
  //   ) {
  //     log("Verifying...");
  //     await verify(governanceToken.address, []);
  //   }
  console.log(`Deployed TimeLock to address: ${timeLock.address}`);
  log("-----------------------------------------");
};
