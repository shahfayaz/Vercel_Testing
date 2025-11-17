const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// GET /health - Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    data: {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      currentWorkingDirectory: process.cwd(),
      currentTimestamp: Date.now(),
    },
  });
});

// POST /data - Sample POST endpoint
app.post("/data", (req, res) => {
  const { name, value } = req.body;
  if (!name || !value) {
    return res
      .status(400)
      .json({ error: "Missing required fields: name and value" });
  }
  res.status(201).json({ message: "Data received", data: { name, value } });
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Not Found vercel testing" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
