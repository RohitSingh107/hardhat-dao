import { ethers } from "hardhat";

export interface networkConfigItemInterface {
  name: string;
  vrfCoordinatorV2?: string;
  waitConfirmations?: number;
  gasLane: string;
  subsciptionId?: string;
  callbackGasLimit?: string;
  mintFee?: string;
  ethUsdPriceFeed?: string;
}

export interface networkConfigInterface {
  [key: number]: networkConfigItemInterface;
}

export const networkConfig: networkConfigInterface = {
  4: {
    name: "rinkeby",
    vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
    waitConfirmations: 6,
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    subsciptionId: "8726",
    callbackGasLimit: "500000",
    mintFee: "10000000000000000", // 0.01 ETH
    ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e",
  },
  31337: {
    name: "hardhat",
    gasLane:
      "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    callbackGasLimit: "500000",
    mintFee: "10000000000000000", // 0.01 ETH
  },
};

export const developmentChains = ["hardhat", "localhost"];

export const MIN_DELAY = 3600;
export const VOTING_PERIOD = 5;
export const VOTING_DELAY = 1;
export const QUORUM_PERCENTAGE = 4;
export const ADDRESS_ZERO = "0x0000000000000000000000000000000000000000";

export const NEW_STORE_VALUE = 77;
export const FUNC = "store";
export const PROPOSAL_DESCRIPTION = "Proposal #1 store 77 in the Box!";
export const proposalsFile = "proposals.json";
