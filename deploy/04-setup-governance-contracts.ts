import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  GovernanceToken,
  TimeLock,
  GovernorContract,
} from "../typechain-types";
import {
  VOTING_DELAY,
  VOTING_PERIOD,
  QUORUM_PERCENTAGE,
  ADDRESS_ZERO,
} from "../helper-hardhat-config";
// import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  const governor = await ethers.getContract("GovernorContract");
  const timeLock: TimeLock = await ethers.getContract("TimeLock");

  log("-------------------------------------------");
  log("Setting up roles...`");
  const proposerRole = await timeLock.PROPOSER_ROLE();
  const executorRole = await timeLock.EXECUTOR_ROLE();
  const adminRole = await timeLock.TIMELOCK_ADMIN_ROLE();

  const proposeTx = await timeLock.grantRole(proposerRole, governor.address);
  await proposeTx.wait();
  const executorTx = await timeLock.grantRole(executorRole, ADDRESS_ZERO);
  await executorTx.wait(1);
  const revokeTx = await timeLock.revokeRole(adminRole, deployer);
  await revokeTx.wait(1);

  //   const governorContract = await deploy("GovernorContract", {
  //     from: deployer,
  //     args: [
  //       governanceToken.address,
  //       timeLock.address,
  //       VOTING_DELAY,
  //       VOTING_PERIOD,
  //       QUORUM_PERCENTAGE,
  //     ],
  //     log: true,
  //     // waitConfirmations: waitConfirmations,
  //   });

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
