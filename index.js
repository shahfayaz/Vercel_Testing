const express = require("express");
const app = express();
const PORT = process.env.PORT || 3010;

// Middleware to parse JSON bodies
app.use(express.json());

// GET /health - Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is healthy",
    data: {
      uptime: new Date(process.uptime() * 1000).toISOString().substr(11, 8),
      memoryUsage: process.memoryUsage(),
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      currentWorkingDirectory: process.cwd(),
      currentTimestamp: Date.now().toLocaleString(),
      developer: "Shah Fayaz Khan",
      systemInfo: "************************************************************",
      // Collect request headers for browser & IP info
      ip: req.headers['x-forwarded-for']?.split(',')[0].trim() || req.socket.remoteAddress,
      userAgent: req.headers['user-agent'],
      acceptLanguage: req.headers['accept-language'],
      acceptEncoding: req.headers['accept-encoding'],
      referer: req.headers.referer || req.headers.referrer,
      origin: req.headers.origin,
      secChUa: req.headers['sec-ch-ua'],
      secChUaMobile: req.headers['sec-ch-ua-mobile'],
      secChUaPlatform: req.headers['sec-ch-ua-platform'],
      secFetchSite: req.headers['sec-fetch-site'],
      secFetchMode: req.headers['sec-fetch-mode'],
      secFetchDest: req.headers['sec-fetch-dest'],
      connection: req.headers.connection,
      upgradeInsecureRequests: req.headers['upgrade-insecure-requests'],
      cacheControl: req.headers['cache-control'],
      allHeaders: req.headers,
    },
  });//  gwledJTxQA5UmwMn
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

// app.get("*", (req, res) => {
//   res.status(404).json({ error: "Not Found vercel testing" });
// });

app.use((req, res) => {
  res.status(404).json({ error: "Not Found vercel testing" });
});


// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// ❗ IMPORTANT: Export the serverless express handler
module.exports = app;