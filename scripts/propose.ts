import fs from "fs";
import { ethers, network } from "hardhat";
import { GovernorContract } from "..//typechain-types";
import {
  developmentChains,
  FUNC,
  NEW_STORE_VALUE,
  proposalsFile,
  PROPOSAL_DESCRIPTION,
  VOTING_DELAY,
} from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";

export async function propose(
  args: any[],
  functionToCall: string,
  proposalDescription: string
) {
  const governor: GovernorContract = await ethers.getContract(
    "GovernorContract"
  );
  const box = await ethers.getContract("Box");
  const encodedFunctionCall = box.interface.encodeFunctionData(
    functionToCall,
    args
  );
  console.log(`Proposing ${functionToCall} on ${box.address} with ${args}`);
  console.log(`Proposal Description: \n ${proposalDescription}`);

  const proposeTx = await governor.propose(
    [box.address],
    [0],
    [encodedFunctionCall],
    proposalDescription
  );
  const proposeReceipt = await proposeTx.wait(1);
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_DELAY + 1);
  }
  const proposalId = proposeReceipt.events![0].args!.proposalId;
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  proposals[network.config.chainId!.toString()].push(proposalId.toString());
  fs.writeFileSync(proposalsFile, JSON.stringify(proposals));
}

propose([NEW_STORE_VALUE], FUNC, PROPOSAL_DESCRIPTION)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit();
  });
