// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/// @title A simple chatting systme
/// @author @SuperDevFavour
/// @notice A simple chat system for sending messages
contract ChatSystem {
    //user should be able to send message
    //Only Users with an ens can send message
    //app should be able to get all messages
    //chat system should be able to register or login
    address private immutable i_ensAddress; //ensAddress
    mapping(string => mapping(string => Message[])) private s_ensToEnsMessages; //holds all messages sent to a user;

    // The Message Data type
    struct Message {
        string author;
        string message;
        string imageUrl;
        uint256 createdAt;
    }

    constructor(address _ensAddress) {
        i_ensAddress = _ensAddress;
    }
}
