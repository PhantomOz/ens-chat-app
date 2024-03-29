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

    function hasEns(string calldata _ensName) public view returns (bool) {
        (address _owner, ) = ENS(i_ensAddress).getEnsDetails(_ensName);
        return _owner == msg.sender;
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
        if (!hasEns(_author)) {
            revert ChatSystem__SenderNotEnsOwner();
        }
        uint256 _time = block.timestamp;

        if (_getConversationId(_author, _receiver) <= 0) {
            s_ensToEnsCoversionId[_author][_receiver] = conversationId;
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
        if (!hasEns(_author)) {
            revert ChatSystem__SenderNotEnsOwner();
        }
        _messages = s_conversationIdToMessages[
            _getConversationId(_author, _receiver)
        ];
    }
}

//0x838C60eD96A07Dd5ae6C31DAFd16568786B40001
