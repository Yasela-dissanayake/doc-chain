require("@nomicfoundation/hardhat-ethers");
require("dotenv").config();

module.exports = {
  solidity: "0.8.28",
  networks: {
    sepolia: {
      url: process.env.ETHEREUM_NODE_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
