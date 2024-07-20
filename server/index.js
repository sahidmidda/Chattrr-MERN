import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import authRoutes from "./routes/AuthRoutes.js";
import contactsRoute from "./routes/ContactRoutes.js";
import setupSocket from "./socket.js";
import messagesRoute from "./routes/MessageRoutes.js";
import channelsRoute from "./routes/ChannelRoutes.js";

dotenv.config()

const app = express();
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

app.use(cors({
    origin: [process.env.ORIGIN],
    methods: ["GET", "POST", "PUT","PATCH","DELETE"],
    credentials: true, 
}));

// Serve static files
app.use("/uploads/profiles", express.static("uploads/profiles"));
app.use("/uploads/files", express.static("uploads/files"));

app.use(cookieParser());
app.use(express.json())

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/contacts",contactsRoute);
app.use("/api/messages",messagesRoute)
app.use("/api/channel",channelsRoute)

const server = app.listen(port, () => {
        console.log(`Server is running at http://192.168.31.208:${port}`);
    })

// set up socket    
setupSocket(server);

// Connect to Database
mongoose
  .connect(mongoUri)
  .then(async () => {
    console.log('Database connected successfully!');
    const temp = (await mongoose.connection.listDatabases()).databases.map(d=>d.name);
    const temp2 = (await mongoose.connection.db.listCollections().toArray()).map(c=>c.name);
    console.log("All databases: ",temp);
    console.log("Collections in current selected database: ",temp2);
  })
  .catch((error) => {
    console.log(error.message);
  });

