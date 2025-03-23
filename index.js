require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Store messages
let messages = [];

// GET Request to Fetch Messages
app.get("/messages", (req, res) => {
    res.json({ success: true, messages });
});

// POST Request to Submit a Message
app.post("/messages", (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ success: false, message: "Name, email, and message are required" });
    }
    const newMessage = { name, email, message, timestamp: new Date() };
    messages.push(newMessage);
    return res.json({ success: true, message: "Message submitted successfully", newMessage });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
