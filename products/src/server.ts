import dotenv from "dotenv";
dotenv.config();

import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";

import express_prom_bundle from "express-prom-bundle";

import productRoutes from "./product/product.routes";

import swaggerUi from 'swagger-ui-express';
import swaggerDocument from "./swagger-product.json";


// Prometheus metrics middleware
const metricsMiddleware = express_prom_bundle({
  includeMethod: true,
  includePath: true,
  includeStatusCode: true,
  includeUp: true,
});

const app = express();
app.use(metricsMiddleware);
app.use(cors());
app.use(express.json());

// Routes
app.use("/v2/products", productRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/", (_, res) => {
  res.status(200).send("Products Microservice is running!");
});

const PORT = process.env.PORT || 8002;
app.listen(PORT, () => {
  console.log(`🚀 Products Microservice has started on port ${PORT}`);
});
