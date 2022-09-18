const { expect } = require("chai");
const { ethers } = require("hardhat");
const { assertHardhatInvariant } = require("hardhat/internal/core/errors");

describe("RainWater", function () {
    let contract;
    let deployer, author, tipper;

    beforeEach(async () => {
        // Create the smart contract object to test from, also get signers
        const rainwater = await ethers.getContractFactory("rainwater");
        [deployer, author, tipper] = await ethers.getSigners();
        contract = await rainwater.deploy();
    });

    describe("Deployment", function() {
        it("deploys successfully", async function () {
            const address = await contract.address;
            expect(address).to.not.equal(0x0);
            expect(address).to.not.equal('');
            expect(address).to.not.equal(null);
            expect(address).to.not.equal(undefined);
        });
    
        it("has a name", async function () {
            const name = await contract.name();
            expect(name).to.equal("RainWater");
        });
    });

    describe("Images", function () {
        const hash = 'abc12345njw';
        const ImageDescription = 'Hello World!';
        let result, count;

        beforeEach(async() => {
            result = await contract.connect(author).uploadImage(hash, ImageDescription);
            count = await contract.imageCount();
        })
        
        it("requirements for image creation", async function() {
            // Failure cases where hash or description empty, caught
            await expect (contract.connect(author).uploadImage('', ImageDescription)).to.be.reverted;
            await expect (contract.connect(author).uploadImage(hash, '')).to.be.reverted;
        });

        it("creates images", async function() {
            // Successful creation of an image, tallied via event log
            // let result = await contract.connect(author).uploadImage(hash, ImageDescription);
            let eventLog = await (await result.wait()).events[0]
            expect(eventLog.args[0].toNumber()).to.equal(1, 'correct image id');
            expect(eventLog.args[1]).to.equal(hash, 'correct image hash');
            expect(eventLog.args[2]).to.equal(ImageDescription, 'correct image description');
            expect(eventLog.args[3].toNumber()).to.equal(0, 'correct tip amount');
            expect(eventLog.args[4]).to.equal(author.address, 'correct author');
        });

        it("lists images", async function () {
            // Lists the item from the stored image mapping
            const image = await contract.images(count); 
            expect(image.id.toNumber()).to.equal(1, 'correct image id');
            expect(image.hash).to.equal(hash, 'correct image hash');
            expect(image.description).to.equal(ImageDescription, 'correct image description');
            expect(image.tipAmount.toNumber()).to.equal(0, 'correct tip amount');
            expect(image.author).to.equal(author.address, 'correct author');
        });
    });

    describe("Tipping", function() {
       //
    });
}) 

