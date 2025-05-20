import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true
}));

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
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: "lax" // Protects against CSRF
    }
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());



// Routes
import authRoutes from "./routes/auth.js";
import mainRoutes from "./routes/main.js";

app.use("/api/auth", authRoutes);
app.use("/api", mainRoutes);

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
