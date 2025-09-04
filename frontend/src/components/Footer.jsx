import React from "react";

function Footer() {
  return (
    <footer style={{
      backgroundColor: "#003366",
      color: "#fff",
      padding: "2rem 0",
      textAlign: "center",
      marginTop: "2rem"
    }}>
      <div style={{ marginBottom: "1rem" }}>
        <h3>FinLearn</h3>
        <p>Empowering retail investors with financial literacy and virtual trading</p>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <a href="#learn-section" style={{ color: "#fff", margin: "0 10px" }}>Modules</a>
        <a href="/VirtualTrade" style={{ color: "#fff", margin: "0 10px" }}>Virtual Trade</a>
        <a href="/gpt" style={{ color: "#fff", margin: "0 10px" }}>Chatbot</a>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: "#fff", margin: "0 10px" }}>Twitter</a>
        <a href="https://www.linkedin.com/in/mukundh-dubasi-7a7158293/" target="_blank" rel="noreferrer" style={{ color: "#fff", margin: "0 10px" }}>LinkedIn</a>
        <a href="https://github.com/Mukundh15" target="_blank" rel="noreferrer" style={{ color: "#fff", margin: "0 10px" }}>GitHub</a>
      </div>

      <p style={{ fontSize: "14px" }}>&copy; 2025 FinLearn. All Rights Reserved.</p>
      <p style={{ fontSize: "14px" }}>created by Mukundh</p>
    </footer>
  );
}

export default Footer;
