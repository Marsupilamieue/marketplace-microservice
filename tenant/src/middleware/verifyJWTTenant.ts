import { Request, Response, NextFunction } from "express";
import axios from "axios";
import { UnauthenticatedResponse } from "../commons/patterns/exceptions";

export const verifyJWTTenant = async (
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

    const authResponse = await axios.post(
      `${AUTH_SERVICE_URL}/verify-admin-token`,
      { token }
    );
    if (authResponse.status !== 200 || !authResponse.data?.user) {
      return res.status(401).send({ message: "Invalid token" });
    }

    const user = authResponse.data.user;

    req.body.user = user;
    next();
  } catch (error: any) {
    console.error(
      "Error in verifyJWTTenant:",
      error.response?.data || error.message
    );
    return res
      .status(401)
      .json(new UnauthenticatedResponse("Invalid token").generate());
  }
};
