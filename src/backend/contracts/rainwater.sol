// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "hardhat/console.sol";

contract rainwater {
    string public name = "RainWater";
    uint public imageCount = 0;

    // Store Images
    mapping(uint => Image) public images;
    
    // database to store data of each image entry
    struct Image { 
        uint id; // id of each uploaded image
        string hash; // IPFS hash for each image
        string description; // Description about the image
        uint tipAmount; // the amount of tip associated with that image
        address payable author; // the creator of the image post who might get tipped for it
    }

    // Event to take a note whenever a new image is created
    event ImageCreated (  
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    event ImageTipped (
        uint id,
        string hash,
        string description,
        uint tipAmount,
        address payable author
    );

    // Create Images
    function uploadImage(string memory _hash, string memory _description) external payable {
        // Some key requirements that the hash or description is not empty and that the uploader is valid
        require(bytes(_hash).length > 0);
        require(bytes(_description).length > 0);
        require(msg.sender != address(0x0));
        
        // Increment the image count
        imageCount++;
        
        // Add image to the contract
        images[imageCount] = Image(imageCount, _hash, _description, 0, payable(msg.sender));  

        // Trigger the event on image creation
        emit ImageCreated(imageCount, _hash, _description, 0, payable(msg.sender));
    }

    // Tip Images
    function tipImageAuthor(uint _id) public payable {
        // Require that the id a valid one
        require(_id > 0 && _id <= imageCount);

        // Fetch the image that has to be tipped
        Image memory _image = images[_id];

        // msg.value denotes the amount of Ether that was sent in while giving a call to THIS FUNCTION.
        // So that whole amount is to be transferred to the author of the image
        address payable _author = _image.author;
        _author.transfer(msg.value);

        // Upgrade the tip amount associated with the fetched image
        _image.tipAmount += msg.value;

        // Update the image back into the mapping
        images[_id] = _image;

        // Trigger the event when image is tipped
        emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
    }
}
