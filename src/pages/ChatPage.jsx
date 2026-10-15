import { useEffect, useState } from "react";

import {
    useChat
} from "../context/ChatContext.jsx";

import {
    getCurrentUser,
    logout
} from "../utils/auth.js";

import Sidebar
    from "../components/layout/Sidebar.jsx";

import ChatWindow
    from "../components/messages/ChatWindow.jsx";
import ProfileEditor from "../components/common/ProfileEditor.jsx";
import SettingsPanel from "../components/common/SettingsPanel.jsx";


const ChatPage = () => {
    const {
        conversations,
        connectionStatus
    } = useChat();

    const [
        selectedConversation,
        setSelectedConversation
    ] = useState(null);

    const user = getCurrentUser();

    useEffect(() => {
        if (!selectedConversation) return;
        const id = selectedConversation?._id || selectedConversation?.conversation?._id || selectedConversation?.conversationId;
        const fresh = conversations.find((item) => String(item?._id || item?.conversation?._id || item?.conversationId) === String(id));
        if (fresh) setSelectedConversation(fresh);
    }, [conversations]);


    const [profileOpen, setProfileOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    const connected =
        connectionStatus === "connected";


    return (
        <>
        <main className="chat-dashboard">

            <header className="dashboard-header">

                {/* <button className="current-user profile-trigger" onClick={()=>setProfileOpen(true)} title="Edit profile">

                    <div className="current-user-avatar">
                        {user?.profilePicture ? <img src={user.profilePicture} alt="" /> : (user?.username?.charAt(0)?.toUpperCase() || "U")}
                    </div>

                    <div className="current-user-info">

                        <strong>
                            {user?.username ||
                                "User"}
                        </strong>

                        <span
                            className={
                                connected
                                    ? "status connected"
                                    : "status"
                            }
                        >
                            <span className="status-dot" />

                            {connected
                                ? "Connected"
                                : "Connecting..."}
                        </span>

                    </div>

                </button> */}

                <div className="dashboard-title">
                    <p className="eyebrow">
                        CHAT SPACE
                    </p>

                    <h1>
                        Messages
                    </h1>

                </div>


                <div className="dashboard-title">
                    <button className="settings-trigger" onClick={() => setSettingsOpen(true)} aria-label="Open settings" title="Appearance settings">⚙ <span>Settings</span></button>
                    <button className="logout-trigger" onClick={logout} title="Log out of your account" aria-label="Log out">↪ <span>Log out</span></button>
                </div>

            </header>


            <div className={`chat-layout ${selectedConversation ? "has-selection" : ""}`}>

                <Sidebar
                    conversations={
                        conversations
                    }
                    selectedConversation={
                        selectedConversation
                    }
                    onSelectConversation={
                        setSelectedConversation
                    }
                />


                <ChatWindow
                    conversation={selectedConversation}
                    onBack={() => setSelectedConversation(null)}
                />

            </div>

        </main>
        {profileOpen && <ProfileEditor user={user} onClose={()=>setProfileOpen(false)} />}
        {settingsOpen && <SettingsPanel onClose={() => setSettingsOpen(false)} />}
        </>
    );
};

export default ChatPage;