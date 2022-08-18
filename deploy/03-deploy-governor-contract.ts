import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { GovernanceToken, TimeLock } from "../typechain-types";
import {
  developmentChains,
  networkConfig,
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
} from "../helper-hardhat-config";
// import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const governanceToken = await get("GovernanceToken");
  const timeLock = await get("TimeLock");

  log("-------------------------------------------");
  log("Deploying governor contract");
  // const waitConfirmations = networkConfig[chainId]["waitConfirmations"] || 1;

  const governorContract = await deploy("GovernorContract", {
    from: deployer,
    args: [
      governanceToken.address,
      timeLock.address,
      VOTING_DELAY,
      VOTING_PERIOD,
      QUORUM_PERCENTAGE,
    ],
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
  console.log(
    `Deployed Governor Contract to address: ${governorContract.address}`
  );

  log("-----------------------------------------");
};
