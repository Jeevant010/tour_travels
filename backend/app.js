const express = require("express");
const app = express();
const authRoutes = require("./routes/auth"); // Import the updated auth router

// ...existing code...

// Mount the auth router with its base path
app.use(authRoutes.path, authRoutes.router);

// ...existing code...