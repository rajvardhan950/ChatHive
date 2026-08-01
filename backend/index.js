import express from 'express';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';
import connectDB from './config/db.js';
import cookieParser from "cookie-parser";
import cors from "cors"
import userRouter from './routes/user.routes.js';
import { sendMessage } from './controllers/message.controllers.js';
import messageRouter from './routes/message.routes.js';
import { app, server } from './socket/socket.js';

dotenv.config();

const port = process.env.PORT || 5000;

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter)
app.use("/api/message", messageRouter)


server.listen(port, () => {
    connectDB();
  console.log(`server started`);
});