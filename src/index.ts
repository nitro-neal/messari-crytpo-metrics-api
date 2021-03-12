import dotenv from "dotenv";
import express from "express";
import { metricsController } from "./controllers/metricsController";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Configure routes
app.use("/api/", metricsController);

// Start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
