import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import "./Chatbot.css";

const CAPSULE_ICON = (
  <svg viewBox="0 0 44 44" className="chatbot-capsule-icon" aria-hidden="true">
    <rect x="4" y="18" width="36" height="8" rx="4" transform="rotate(-45 22 22)" fill="#0fefeb" />
    <rect x="22" y="18" width="18" height="8" rx="4" transform="rotate(-45 22 22)" fill="#ffffff" />
  </svg>
);

const INITIAL_MESSAGE = {
  sender: "bot",
  text: "Hi, I'm the MedFinder assistant. Ask me if a medicine is available nearby, e.g. **\"Is paracetamol available?\"**",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    setMessages((prev) => [...prev, { sender: "user", text: trimmed }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/chatbot/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "Sorry, something went wrong." },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Couldn't reach the server. Is the backend running?" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-wrapper">
      {isOpen && (
        <div className="chatbot-window" role="dialog" aria-label="MedFinder Assistant chat">
          <div className="chatbot-header">
            <div className="chatbot-header-brand">
              <span className="chatbot-header-icon">{CAPSULE_ICON}</span>
              <div className="chatbot-header-text">
                <span className="chatbot-header-title">MedFinder Assistant</span>
                <span className="chatbot-header-subtitle">Usually replies instantly</span>
              </div>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`chatbot-row ${
                  msg.sender === "user" ? "chatbot-row-user" : "chatbot-row-bot"
                }`}
              >
                {msg.sender === "bot" && (
                  <span className="chatbot-avatar">{CAPSULE_ICON}</span>
                )}
                <div
                  className={`chatbot-message ${
                    msg.sender === "user" ? "chatbot-message-user" : "chatbot-message-bot"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="chatbot-row chatbot-row-bot">
                <span className="chatbot-avatar">{CAPSULE_ICON}</span>
                <div className="chatbot-message chatbot-message-bot chatbot-typing">
                  <span className="chatbot-dot" />
                  <span className="chatbot-dot" />
                  <span className="chatbot-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about a medicine..."
              className="chatbot-input"
            />
            <button
              className="chatbot-send-btn"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path d="M4 12L20 4L13 20L11 13L4 12Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`chatbot-toggle-btn ${isOpen ? "chatbot-toggle-btn-open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <span className="chatbot-toggle-glow" />
        {isOpen ? (
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" className="chatbot-toggle-x">
            <path d="M6 6L18 18M18 6L6 18" stroke="#ffffff" strokeWidth="2.4" strokeLinecap="round" />
          </svg>
        ) : (
          <span className="chatbot-toggle-capsule">{CAPSULE_ICON}</span>
        )}
      </button>
    </div>
  );
}