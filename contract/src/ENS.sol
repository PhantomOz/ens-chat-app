// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error ENS__NameAlreadyTaken();

/// @title Ens Domain
/// @author @SuperDevFavour
/// @notice An Ens Domain contract
contract ENS {
    mapping(string => ENSDetails) public s_ensToDetails;

    event ENSRegistered(address indexed _owner, string indexed _ensName);

    struct ENSDetails {
        address owner;
        string imageURI;
    }

    function registerEnsName(
        string memory _ensName,
        string memory _imageURI
    ) public {
        if (s_ensToDetails[_ensName].owner != address(0)) {
            revert ENS__NameAlreadyTaken();
        }

        s_ensToDetails[_ensName] = ENSDetails(msg.sender, _imageURI);

        emit ENSRegistered(msg.sender, _ensName);
    }
}
