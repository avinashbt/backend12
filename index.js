require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

// Enable CORS
app.use(cors());

// Middleware to parse JSON requests
app.use(express.json());

// Sample data
let data = {
    hey: "guys",
    welcome: "back",
    to: "another",
    video: "",
    please: "subscribe",
    toggle: false  // Added a toggle property
};

let leads = []; // Array to store lead data

// GET Request
app.get("/", (req, res) => {
    res.json(data);
});

// GET Request to Fetch Leads
app.get("/leads", (req, res) => {
    res.json({ success: true, leads });
});

// PUT Request to Update Data
app.put("/update", (req, res) => {
    const { key, value } = req.body;
    if (data.hasOwnProperty(key)) {
        data[key] = value;
        return res.json({ success: true, message: `${key} updated successfully`, data });
    }
    return res.status(400).json({ success: false, message: "Invalid key" });
});

// PUT Request to Toggle a Value
app.put("/toggle", (req, res) => {
    data.toggle = !data.toggle; // Toggle the value
    return res.json({ success: true, message: "Toggle updated", data });
});

// POST Request to Collect Lead Data
app.post("/leads", (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ success: false, message: "Name and email are required" });
    }
    const lead = { name, email, timestamp: new Date() };
    leads.push(lead);
    return res.json({ success: true, message: "Lead submitted successfully", lead });
});

const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});