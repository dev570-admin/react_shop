import { useState } from "react";

type Message = {
  from: "user" | "bot";
  text: string;
};

function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Hi 👋 How can I help you?" },
  ]);

  const sendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { from: "user", text: input };

    const botMessage: Message = {
      from: "bot",
      text: "🤖 I'm a demo AI. Real AI can be connected later!",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="chatbot-container">
      {/* Floating Button */}
      {!open && (
        <button className="chatbot-toggle" onClick={() => setOpen(true)}>
          🤖
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <span>AI Assistant</span>
            <button onClick={() => setOpen(false)}>✖</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat ${msg.from}`}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;