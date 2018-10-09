const contracts = require('guesser-contracts');
const contract = require('truffle-contract');

class OwnerBasedTermsProxy {
  constructor(web3) {
    this.web3 = web3;
    this.OwnerBasedTermsProxy = contract(contracts.OwnerBased);
    this.OwnerBasedTermsProxy.setProvider(this.web3.eth.currentProvider.host);
    this.instance = null;
  }

  async init() {
    try {
      this.instance = await this.OwnerBasedTermsProxy.deployed();
    } catch (err) {
      throw err;
    }
  }

  async network() {
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

  getTermsHash(content) {
    let hex = this.web3.utils.utf8ToHex(content)
    let bytesArr = []
    bytesArr.push(hex)

    return this.instance.getTermsHash.call(bytesArr);
  }

  betsNumber() {
    return this.instance.betsNumber.call();
  }

  async setTermsHash(hash, sender) {
    let bytesArr = []
    bytesArr.push(hash)
    await this.instance.setTermsHash(
      bytesArr,
      { from: sender },
    );
  }
}

module.exports = OwnerBasedTermsProxy;
