import dotenv from "dotenv";
import express from "express";
import { metricsController } from "./controllers/metricsController";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// Configure routes
app.use("/api/", metricsController);

// Default in case of unmatched routes
app.use((req, res) => {
  res.json({
    error: {
      name: "Error",
      status: 404,
      message: "Invalid Request",
      statusCode: 404,
    },
    message: "This is an invalid route! Please use an example route.",
    sectorsExample: `http://localhost:${port}/api/sectors`,
    tagsExample: `http://localhost:${port}/api/tags`,
    singleMetricsExample: `http://localhost:${port}/api/asset/ltc`,
    aggregateMetricsExample: `http://localhost:${port}/api/aggregate/?sectors=stablecoins,gaming`,
  });
});

// Start the express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
