const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class BetKernel {
  constructor(web3) {
    this.web3 = web3;
    this.betKernel = contract(contracts.BetKernel);
    this.betKernel.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.betKernel.deployed();
    } catch (err) {
      throw err;
    }
  }

  network() {
    return this.web3.eth.net.getNetworkType();
  }

  address() {
    return this.instance.address;
  }

  // Registry Setter
  async setBetRegistry(address, sender) {
    try {
      await this.instance.setBetRegistry(
        address,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }

  betRegistry() {
    return this.instance.betRegistry.call();
  }

  paused() {
    return this.instance.paused.call();
  }

  // Bet Kernel

  async placeBet(betHash, option, number, sender) {
    try {
      const playerBetHash = this.instance.placeBet.call(
        betHash,
        option,
        number,
        { from: sender },
      );
      await this.instance.placeBet(
        betHash,
        option,
        number,
        { from: sender },
      );

      return playerBetHash;
    } catch (err) {
      throw err;
    }
  }

  async getProfits(betHash, playerBetHash, sender) {
    try {
      await this.instance.getProfits(
        betHash,
        playerBetHash,
        { from: sender },
      );
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BetKernel;