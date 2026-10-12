import Avatar from "../common/Avatar.jsx";

const ConversationItem = ({
    conversation,
    active,
    onClick
}) => {
    const name = conversation.name ||
        conversation.users?.[0]?.username ||
        "Conversation";

    return (
        <button
            className={
                active
                    ? "conversation-item active"
                    : "conversation-item"
            }
            onClick={onClick}
        >
            <Avatar
                name={name}
                profilePicture={conversation.profilePicture || conversation.users?.[0]?.profilePicture}
            />

            <div className="conversation-info">
                <strong>{name}</strong>
                <span className="conversation-preview">
                    {conversation.lastMessage?.payload?.text || (conversation.lastMessage?.messageType === "IMAGE" ? "📷 Image" : conversation.lastMessage?.messageType === "AUDIO" ? "🎤 Audio" : conversation.lastMessage?.messageType === "FILE" ? "📄 PDF / file" : conversation.type || "Start a conversation")}
                </span>
            </div>
            <div className="conversation-meta">
                <time>{conversation.lastMessage?.createdAt ? new Date(conversation.lastMessage.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}</time>
                {Number(conversation.unreadCount) > 0 && <span className="unread-badge" aria-label={`${conversation.unreadCount} unread messages`}>{conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}</span>}
            </div>
        </button>
    );
};

export default ConversationItem;