import React, { useState } from "react";
import axios from "axios";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";

function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/contact", formData, {
        withCredentials: true
      });
      setStatus("Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("Error sending message. Please try again.");
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: 600, mx: "auto", mt: 5, mb: 5, px: 2 }}>
      <h1 style={{ fontSize: "40px", textAlign: "center" }}>Contact Us</h1>
      <Typography variant="body1" align="center" gutterBottom>
        We’d love to hear from you! Send us a message.
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Subject"
          variant="outlined"
          fullWidth
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <TextField
          label="Message"
          variant="outlined"
          fullWidth
          multiline
          rows={5}
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained" color="primary" fullWidth>
          Send Message
        </Button>
      </form>

      {status && (
        <Alert
          severity={status.includes("success") ? "success" : "error"}
          sx={{ mt: 2 }}
        >
          {status}
        </Alert>
      )}
    </Box>
  );
}

export default ContactUs;
