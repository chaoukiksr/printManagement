import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

// Get current file path and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'print-requests');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// CORS configuration
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Connected to MongoDB" , mongoose.connection.host, mongoose.connection.port, mongoose.connection.name))
    .catch((err) => console.error("MongoDB connection error:", err));

// Session configuration
app.use(session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        collectionName: "sessions",
        ttl: 24 * 60 * 60, // 1 day
        autoRemove: "native" // Use MongoDB's TTL index
    }),
    cookie: {
        secure: process.env.NODE_ENV === "production", // true in production
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // 'none' in production
        domain: process.env.NODE_ENV === "production" ? process.env.COOKIE_DOMAIN : undefined
    },
    proxy: process.env.NODE_ENV === "production" // true in production
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
import authRoutes from "./routes/auth.js";
import invRoutes from "./routes/inv.js";
import departmentRoutes from "./routes/department.js";
import userRoutes from "./routes/user.js";
import printRequestRoutes from "./routes/printRequest.js";
import statisticsRoutes from "./routes/statistics.js";

app.use("/api/auth", authRoutes);
app.use("/api/inv", invRoutes);
app.use("/api/department", departmentRoutes);
app.use("/api/user", userRoutes);
app.use("/api/print", printRequestRoutes);
app.use("/api/statistics", statisticsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Something went wrong!",
        error: process.env.NODE_ENV === "development" ? err.message : undefined
    });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
