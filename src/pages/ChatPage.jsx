import { useEffect, useState } from "react";

import {
    useChat
} from "../context/ChatContext.jsx";

import {
    getCurrentUser
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

                


                <div className="dashboard-title">

                    <p className="eyebrow">
                        CHAT APPLICATION
                    </p>

                    <h1>
                        Messages
                    </h1>

                </div>
            <button className="settings-trigger" onClick={() => setSettingsOpen(true)} aria-label="Open settings" title="Appearance settings">⚙ <span>Settings</span></button>


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