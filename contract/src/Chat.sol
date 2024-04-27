// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/utils/Strings.sol";
import {ENS} from "./ENS.sol";

error ChatSystem__SenderNotEnsOwner();

/// @title A simple chatting systme
/// @author @SuperDevFavour
/// @notice A simple chat system for sending messages
contract ChatSystem {
    //user should be able to send message
    //Only Users with an ens can send message
    //app should be able to get all messages
    //chat system should be able to register or login
    using Strings for uint256;
    address private immutable i_ensAddress; //ensAddress
    mapping(string => mapping(string => uint256)) private s_ensToEnsCoversionId; //holds the Ids message a user;
    mapping(uint256 => Message[]) private s_conversationIdToMessages; //holds the messages for a conversation Id;
    uint256 private conversationId = 1;
    mapping(string => uint256[]) private s_addressToConversationIds;
    mapping(uint256 => string[2]) private s_idToparicipants;

    event MessageSent(
        string indexed _author,
        string indexed _receiver,
        uint256 _messageId
    );

    // The Message Data type
    struct Message {
        string author;
        string receiver;
        string message;
        string imageUrl;
        string createdAt;
    }

    constructor(address _ensAddress) {
        i_ensAddress = _ensAddress;
    }

    function hasEns(
        string calldata _ensName,
        address _sender
    ) public view returns (bool) {
        (address _owner, ) = ENS(i_ensAddress).getEnsDetails(_ensName);
        return _owner == _sender;
    }

    function _getConversationId(
        string calldata _sender,
        string calldata _receiver
    ) internal view returns (uint256) {
        return
            s_ensToEnsCoversionId[_sender][_receiver] > 0
                ? s_ensToEnsCoversionId[_sender][_receiver]
                : s_ensToEnsCoversionId[_receiver][_sender];
    }

    function sendMessage(
        string calldata _author,
        string calldata _receiver,
        string memory _message,
        string memory _imageUrl
    ) external {
        if (!hasEns(_author, msg.sender)) {
            revert ChatSystem__SenderNotEnsOwner();
        }
        uint256 _time = block.timestamp;

        if (_getConversationId(_author, _receiver) <= 0) {
            s_ensToEnsCoversionId[_author][_receiver] = conversationId;
            s_addressToConversationIds[_author].push(conversationId);
            s_addressToConversationIds[_receiver].push(conversationId);
            s_idToparicipants[conversationId] = [_author, _receiver];
            conversationId += 1;
        }

        Message[] storage _messages = s_conversationIdToMessages[
            _getConversationId(_author, _receiver)
        ];
        _messages.push(
            Message(_author, _receiver, _message, _imageUrl, _time.toString())
        );
        emit MessageSent(_author, _receiver, _messages.length - 1);
    }

    function getMessages(
        string calldata _author,
        string calldata _receiver
    ) external view returns (Message[] memory _messages) {
        _messages = s_conversationIdToMessages[
            _getConversationId(_author, _receiver)
        ];
    }

    function getUserConversationIds(
        string calldata _ensName
    ) external view returns (uint256[] memory) {
        return s_addressToConversationIds[_ensName];
    }

    function getParicipant(
        uint256 _id
    ) external view returns (string[2] memory) {
        return s_idToparicipants[_id];
    }
}

//0x25c66802f4463A04F73eD49deE8DF05Ce05B2C67
