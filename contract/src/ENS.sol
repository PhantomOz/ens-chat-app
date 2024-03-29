// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

error ENS__NameAlreadyTaken();
error ENS__NameDoesNotExist();

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

    function getEnsDetails(
        string calldata _ensName
    ) external view returns (address _owner, string memory _imageURI) {
        if (s_ensToDetails[_ensName].owner == address(0)) {
            revert ENS__NameDoesNotExist();
        }
        _owner = s_ensToDetails[_ensName].owner;
        _imageURI = s_ensToDetails[_ensName].imageURI;
    }
}

//0x01E16d124f32859E006638f3c886Fd09C2BB5b9E
