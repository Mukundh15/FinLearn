import React,{useState} from "react";
import axios from "axios";

function Chatbot(){
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState([]);

  const sendMessage=async()=>{
    if(!input.trim()) return;

    const userMsg={sender:"user",text:input};
    setMessages(prev=>[...prev, userMsg]);
    setInput("");
    try {
      const res=await axios.post("http://localhost:8080/chat", { message: input });
      const botMsg={sender:"bot",text:res.data?.reply ||"Sorry, I couldn't respond."};
      setMessages(prev=>[...prev,botMsg]);
    } catch (error) {
      console.error(error);
      const botMsg = { sender: "bot", text: "Something went wrong. Try again." };
      setMessages(prev => [...prev, botMsg]);
    }
  };

  const handleKeyPress=(e)=>{
    if(e.key==="Enter") sendMessage();
  };

  return (
    <div className="chatbox" style={{ margin: "2rem auto", maxWidth: "600px" }}>
      <h2 style={{fontSize: '40px',textAlign: "center"}} className="mb-5">💬 Finance Chatbot</h2>
      <div 
        className="messages" 
        style={{
          border: "1px solid #ccc", 
          borderRadius: "8px", 
          padding: "10px", 
          height: "400px", 
          overflowY: "auto",
          marginBottom: "10px"
        }}
      >
        {messages.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", margin: "5px 0" }}>
            <b>{msg.sender}:</b>{msg.text}
          </p>
        ))}
      </div>
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about investing..."
          style={{ flex: 1, padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button 
          onClick={sendMessage} 
          style={{ padding: "10px 20px", borderRadius: "5px", backgroundColor: "#1976d2", color: "#fff", border: "none" }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
