import { network, ethers } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { GovernanceToken } from "../typechain-types";
// import { developmentChains, networkConfig } from "../helper-hardhat-config";
// import { verify } from "../utils/verify";

module.exports = async (hre: HardhatRuntimeEnvironment) => {
  const { getNamedAccounts, deployments } = hre;
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  // const chainId: number = network.config.chainId!;
  //
  log("-------------------------------------------");

  // const waitConfirmations = networkConfig[chainId]["waitConfirmations"] || 1;

  const governanceToken = await deploy("GovernanceToken", {
    from: deployer,
    args: [],
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
    `Deployed governance token to address: ${governanceToken.address}`
  );

  await delegate(governanceToken.address, deployer);
  console.log("Delegated!");
  log("-----------------------------------------");
};

const delegate = async (
  governanceTokenAddress: string,
  delegatedAccount: string
) => {
  const governanceToken: GovernanceToken = await ethers.getContractAt(
    "GovernanceToken",
    governanceTokenAddress
  );
  const tx = await governanceToken.delegate(delegatedAccount);
  await tx.wait();
  console.log(
    `Chechpoint ${await governanceToken.numCheckpoints(delegatedAccount)}`
  );
};
