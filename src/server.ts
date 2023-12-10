import * as fs from "fs";
import * as http from "http";
import * as https from "https";

import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";
dotenv.config();
import os from "os";
import path from "path";
const mongooseLeanId = require("mongoose-lean-id");

export type ReportPayload = {
  patient: string;
  status: string;
  path?: string;
  reportId?: string;
  progress?: number;
};
const port = process.env.PORT || 3000;
let server: any;

if (process.env.NODE_ENV === "production") {
  var options = {
    cert: fs.readFileSync(`${process.env.CERTIFICATE_PATH}`),
    key: fs.readFileSync(`${process.env.PRIVATEKEY_PATH}`),
  };
  server = https.createServer(options, app).listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
} else {
  server = http.createServer(app).listen(port, () => {
    console.log(`App running on port ${port}...`);
  });
}

const connectToMongoDB = async () => {
  const url =
    "mongodb+srv://admin:admin%40123@cruddemo.c3ldatu.mongodb.net/shopping_cart";

  mongoose.connect(`${url}`, async (error: any) => {
    if (!error) {
      console.log("Connected to MongoDB Successfully");
    } else {
      throw error;
    }
  });

  if (process.env.ISCLUSTER === "true") {
    const totalCPUs = os.cpus().length;
    let data =
      Number(fs.readFileSync(path.join(__dirname, "../cluster.txt"), "utf8")) +
      1;
    if (totalCPUs === data) {
      data = 0;
    }
    fs.writeFileSync(path.join(__dirname, "../cluster.txt"), String(data));
  } else {
  }
};
connectToMongoDB();
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
    process.exit(1);
  });
});

// const memory = ()=>{
//   return process.memoryUsage()
// }
// console.log("memory",memory())
