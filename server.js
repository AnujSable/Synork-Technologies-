import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// In-memory store as lightweight fallback (Firebase is the primary store)
const inquiries = [];

app.use(cors());
app.use(express.json());

const distPath = path.join(__dirname, "dist");
const staticFolder = fs.existsSync(distPath) ? distPath : __dirname;
app.use(express.static(staticFolder));

// Contact form submission
app.post("/api/contact", (req, res) => {
  const { name, email, service, details, phone = "", company = "" } = req.body;

  if (!name || !email || !service || !details) {
    return res.status(400).json({
      error: "Missing required fields: name, email, service, details",
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  const inquiry = {
    id: inquiries.length + 1,
    name,
    email,
    service,
    details,
    phone,
    company,
    created_at: new Date().toISOString(),
  };
  inquiries.push(inquiry);
  console.log("New inquiry received:", { name, email, service });

  res.status(201).json({
    message: "Inquiry submitted successfully.",
    contactId: inquiry.id,
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Synork server is running" });
});

// View inquiries
app.get("/api/inquiries", (req, res) => {
  res.json({ count: inquiries.length, inquiries: [...inquiries].reverse() });
});

// SPA fallback
app.get(/.*/, (req, res) => {
  const indexFile = path.join(staticFolder, "index.html");
  res.sendFile(indexFile);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
