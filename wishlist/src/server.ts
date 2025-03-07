import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import express_prom_bundle from "express-prom-bundle";

import wishlistRoutes from "./wishlist/wishlist.routes";

const app: Express = express();

// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
});

// Middleware
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/wishlist", wishlistRoutes);

app.get("/", (_, res) => {
  res.status(200).send("Wishlist Microservice is running!");
});

const PORT = process.env.PORT || 8004;
app.listen(PORT, () => {
  console.log(`🚀 Wishlist Microservice has started on port ${PORT}`);
});
