import express from "express";
import cors from "cors";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import groupRouter from "./routes/group.js";
import eventRouter from "./routes/event.js";

// Create an express server
const app = express();

// Tell express to use the json middleware
app.use(express.json());
// Allow everyone to access our API. In a real application, we would need to restrict this!
app.use(cors());

/****** Attach routes ******/
/**
 * We use /api/ at the start of every route!
 * As we also host our client code on heroku we want to separate the API endpoints.
 */
app.use("/api/auth", authRouter); // Routes related to authentication
app.use("/api/user", userRouter); // Routes related to users
app.use("/api/group", groupRouter); // Routes related to groups
app.use("/api/event", eventRouter); // Routes related to groups

export default app;
