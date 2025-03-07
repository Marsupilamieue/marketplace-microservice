import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import authRoutes from "./user/user.routes";

import express_prom_bundle from "express-prom-bundle";

// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
});

// Middleware
const app = express();
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/auth", authRoutes);

app.get("/", (_, res) => {
  res.status(200).send("Authentication Microservice is running!");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Authentication Microservice has started on port ${PORT}`);
});
