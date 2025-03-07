import dotenv from "dotenv";
dotenv.config();

import express from "express";

import cors from "cors";
import express_prom_bundle from "express-prom-bundle";

import orderRoutes from "./order/order.routes";
import cartRoutes from "./cart/cart.routes";

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
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);

app.get("/", (_, res) => {
  res.status(200).send("Orders Microservice is running!");
});

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`🚀 Orders Microservice has started on port ${PORT}`);
});
