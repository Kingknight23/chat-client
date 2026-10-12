import { useRef, useState } from "react";
import { useChat } from "../../context/ChatContext.jsx";
const MessageInput = ({ conversationId }) => {
  const [text, setText] = useState(""); const [uploading, setUploading] = useState(false); const [error, setError] = useState(""); const fileInput = useRef(null);
  const { sendMessage, sendAttachment, startTyping, stopTyping } = useChat();
  const handleSubmit = async (event) => { event.preventDefault(); if (!conversationId || !text.trim()) return; try { await sendMessage(conversationId, text); setText(""); stopTyping(conversationId); setError(""); } catch (e) { setError(e.message || "Unable to send message"); } };
  const handleFile = async (event) => { const file = event.target.files?.[0]; event.target.value = ""; if (!file) return; setUploading(true); setError(""); try { await sendAttachment(conversationId, file); } catch (e) { setError(e.message || "Unable to send attachment"); } finally { setUploading(false); } };
  const handleChange = (event) => { const value = event.target.value; setText(value); if (!conversationId) return; if (value.trim()) startTyping(conversationId); else stopTyping(conversationId); };
  return <><form className="message-form" onSubmit={handleSubmit}><input type="file" ref={fileInput} onChange={handleFile} accept="image/*,audio/*,application/pdf" hidden /><button type="button" className="attachment-button" onClick={() => fileInput.current?.click()} disabled={uploading} aria-label="Attach image, audio, or PDF">＋</button><input value={text} onChange={handleChange} placeholder="Type a message..." /><button className="primary-button" type="submit" disabled={!text.trim() || uploading}>Send</button></form>{uploading && <small className="upload-status">Uploading attachment…</small>}{error && <small className="upload-error">{error}</small>}</>;
};
export default MessageInput;
