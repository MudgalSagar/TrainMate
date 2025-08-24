import React, { useState } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm TrainMate 🤖. How can I help with your training today?",
    },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async (text = null) => {
    const messageText = text || input;
    if (!messageText.trim()) return;

    const newMessages = [...messages, { sender: "user", text: messageText }];
    setMessages(newMessages);

    if (text) {
      setInput("");
    }

    try {
      const response = await fetch("http://127.0.0.1:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: messageText }),
      });

      const data = await response.json();

      setMessages([
        ...newMessages,
        {
          sender: "bot",
          text: data.reply || "Sorry, I didn't understand that.",
        },
      ]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
    }

    if (!text) {
      setInput("");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 transition"
      >
        💬
      </button>

      {isOpen && (
        <div className="w-80 h-96 bg-white rounded-xl shadow-xl flex flex-col absolute bottom-16 right-0">
          {/* Header */}
          <div className="bg-orange-500 text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">TrainMate AI</span>
            <button onClick={() => setIsOpen(false)}>✖</button>
          </div>

          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg max-w-[75%] ${
                  msg.sender === "user"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="px-3 py-2 border-t flex flex-wrap gap-2">
            <button
              onClick={() => sendMessage("See you")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded-full transition"
            >
              See you
            </button>
            <button
              onClick={() => sendMessage("Suggest a workout")}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xs px-3 py-1 rounded-full transition"
            >
              Suggest a workout
            </button>
          </div>

          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={() => sendMessage()}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
