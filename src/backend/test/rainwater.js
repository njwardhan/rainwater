const { expect } = require("chai");

describe("Smoke Test", function () {
    it("Should display the correct name", async function () {
        // Create the smart contract object to test from
        const TestContract = await ethers.getContractFactory("rainwater");
        const contract = await TestContract.deploy();

        // Get output from functions
        const name = await contract.name();
        expect(name).to.equal("RainWater");
    });
});