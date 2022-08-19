import fs from "fs";
import { ethers, network } from "hardhat";
import {
  developmentChains,
  proposalsFile,
  VOTING_PERIOD,
} from "../helper-hardhat-config";
import { GovernorContract } from "../typechain-types";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;
async function main(proposalIndex: number) {
  const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
  const proposalId = proposals[network.config.chainId!][proposalIndex];

  const voteWay = 1;
  const governor: GovernorContract = await ethers.getContract(
    "GovernorContract"
  );
  const reason = "I like it!";
  console.log(`Proposal is is : ${proposalId}`);
  const votesResponse = await governor.castVoteWithReason(
    proposalId,
    voteWay,
    reason
  );

  await votesResponse.wait(1);
  if (developmentChains.includes(network.name)) {
    await moveBlocks(VOTING_PERIOD + 1);
  }
  console.log("Voted!");
}

main(index)
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit();
  });
