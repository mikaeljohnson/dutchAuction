const draca = artifacts.require("ProjectDraca");

module.exports = function(deployer) {
  deployer.deploy(draca, "a","b","c","0x641E8274ce7513e2df215FcAD97515165019C497");
};
