const _testToken = artifacts.require("testToken");
const dutchAuction = artifacts.require("Dutch_Auction");

module.exports = async function(deployer) {
  
  await deployer.deploy( _testToken );
  const testToken = await _testToken.deployed();

  await deployer.deploy( dutchAuction, testToken.address, "0x3198B200AD37aD8c3588DE80d9b41Aa6540A76De");
  
};
