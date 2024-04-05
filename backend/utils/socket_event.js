exports.SOCKET_EVENT = Object.freeze({
    // USER
    USER_CONNECT : "user_connect",
    GET_USER_CONNECTED : "get_user_connected",
    DISCONNECT : "disconnect",
    
    // GROUP
    JOIN_GROUP : "join_group",
    REMOVE_USER_GROUP: "remove_user_group",
    GET_REMOVE_USER_GROUP: "get_remove_user_group",
    UPDATED_GROUP: "updated_group",
    GET_UPDATED_GROUP: "get_updated_group",
    BLOCK_USER : "blockUser",
    GET_BLOCK_USER: "get_blockUser",
    UNBLOCK_USER : "unblockUser",
    GET_UNBLOCK_USER : "get_unblockUser",
    ADD_MEMBER_GROUP: "addMember_group",
    GET_ADD_MEMBER_GROUP : "get_addMember_group",
    LEAVE_MEMBER_GROUP : "leaveMember_group",
    GET_LEAVE_MEMBER_GROUP: "get_leaveMember_group",
    LEAVE_GROUP: "leave_group",

    // PRIVATE 
    ADD_PRIVATE : "add_private",
    GET_ADD_PRIVATE: "get_add_private",

    // PRIVATE - VIDEO & AUDIO CALL
    CALL : "call",
    GET_CALL : "get_call",
    CALL_ACCEPTED : "callAccepted",
    GET_CALL_ACCEPTED : "get_callAccepted",
    END_CALL : "endCall",
    GET_END_CALL : "get_endCall",

    //GROUP & PRIVATE 
    SEND_MESSAGE : "send_message",
    GET_SEND_MESSAGE : "get_send_message",
    REMOVE_CHAT: "remove_chat",
    GET_REMOVE_CHAT: "get_remove_chat"
});