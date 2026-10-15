import { useEffect, useState } from "react";
import { formatDate } from "../../utils/formatDate.js";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const Attachment = ({ attachment }) => {
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const open = async () => {
    try {
      const response = await fetch(`${API_URL}${attachment.url}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
      if (!response.ok) throw new Error("Unable to open attachment");
      const blob = await response.blob(); const url = URL.createObjectURL(blob);
      const a = document.createElement("a"); a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer"; a.download = attachment.name || "attachment"; a.click();
      setTimeout(() => URL.revokeObjectURL(url), 60000);
    } catch (e) { setError(e.message); }
  };
  useEffect(() => {
    let objectUrl;
    if (!attachment.mimeType?.startsWith("image/") && !attachment.mimeType?.startsWith("audio/")) return;
    fetch(`${API_URL}${attachment.url}`, { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((response) => { if (!response.ok) throw new Error("Unable to load attachment"); return response.blob(); })
      .then((blob) => { objectUrl = URL.createObjectURL(blob); setPreviewUrl(objectUrl); })
      .catch((e) => setError(e.message));
    return () => { if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [attachment.filename, attachment.url, attachment.mimeType]);
  if (attachment.mimeType?.startsWith("image/")) return <div className="attachment-preview">{previewUrl ? <img src={previewUrl} alt={attachment.name || "Image attachment"} onClick={open} /> : "Loading image…"}<button onClick={open}>{attachment.name || "Open image"}</button></div>;
  if (attachment.mimeType?.startsWith("audio/")) return <div className="attachment-file">🎤 {attachment.name}{previewUrl ? <audio controls src={previewUrl}>Audio playback is not supported.</audio> : "Loading audio…"}<button onClick={open}>Download audio</button>{error && <small>{error}</small>}</div>;
  return <div className="attachment-file">📄 {attachment.name || "document"}<button onClick={open}>Open / download file</button>{error && <small>{error}</small>}</div>;
};
const Message = ({ message, own, isGroup }) => {
  const text = message.payload?.text || message.text || "";
  const attachment = message.payload?.attachment || message.attachment;
  return <div className={own ? "message-row own" : "message-row"}><div className={own ? "message-bubble own" : "message-bubble"}>{isGroup && <div className="message-sender">@{message.senderUsername || "Unknown User"}</div>}{text && <div>{text}</div>}{attachment && <Attachment attachment={attachment} />}<div className="message-meta">{formatDate(message.createdAt)}</div></div></div>;
};
export default Message;
