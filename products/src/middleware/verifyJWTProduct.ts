import { Request, Response, NextFunction } from "express";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";
import axios from "axios";

export const verifyJWTProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const AUTH_SERVICE_URL =
      process.env.AUTH_SERVICE_URL || "http://auth-service:3000";
    const TENANT_SERVICE_URL =
      process.env.TENANT_SERVICE_URL || "http://tenant-service:3000";

    const authResponse = await axios.post(
      `${AUTH_SERVICE_URL}/verify-admin-token`,
      { token }
    );

    if (authResponse.status !== 200 || !authResponse.data?.user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = authResponse.data.data.user;

    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return res.status(500).send({ message: "Server Tenant ID not found" });
    }

    const tenantResponse = await axios.get(
      `${TENANT_SERVICE_URL}/${SERVER_TENANT_ID}`
    );

    if (tenantResponse.status !== 200 || !tenantResponse.data?.tenants) {
      return res.status(500).send({ message: "Server Tenant not found" });
    }

    const tenantData = tenantResponse.data.tenants;

    if (!user.id || user.id !== tenantData.owner_id) {
      return res.status(401).send({ message: "Invalid token" });
    }

    req.body.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
