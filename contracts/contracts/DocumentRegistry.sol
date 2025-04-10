// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    struct Document {
        string docType;
        uint256 timestamp;
        address owner;
        string ipfsHash;
    }

    mapping(uint256 => Document) public documents; // documentId -> Document

    uint256 public nextDocumentId;

    event DocumentRegistered(
        uint256 documentId,
        string docType,
        address owner,
        string ipfsHash
    );

    function registerDocument(
        string memory _docType,
        address _owner,
        string memory _ipfsHash
    ) public returns (uint256) {
        uint256 documentId = nextDocumentId++;
        documents[documentId] = Document({
            docType: _docType,
            timestamp: block.timestamp,
            owner: _owner,
            ipfsHash: _ipfsHash
        });
        emit DocumentRegistered(documentId, _docType, _owner, _ipfsHash);
        return documentId;
    }

    function transferOwnership(uint256 documentId, address newOwner) public {
        require(
            msg.sender == documents[documentId].owner,
            "Only the owner can transfer ownership"
        );
        documents[documentId].owner = newOwner;
    }
}
