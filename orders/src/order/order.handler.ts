import { Request, Response } from "express";
import * as Service from "./services";

export const getAllOrdersHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const response = await Service.getAllOrdersService(user_id);
  return res.status(response.status).send(response.data);
};

export const getOrderDetailHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { orderId } = req.params;
  const response = await Service.getOrderDetailService(user_id, orderId);
  return res.status(response.status).send(response.data);
};

export const placeOrderHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { shipping_provider } = req.body;
  const response = await Service.placeOrderService(user_id, shipping_provider);
  return res.status(response.status).send(response.data);
};

export const payOrderHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { orderId } = req.params;
  const { payment_method, payment_reference, amount } = req.body;
  const response = await Service.payOrderService(
    orderId,
    payment_method,
    payment_reference,
    amount
  );
  return res.status(response.status).send(response.data);
};

export const cancelOrderHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { orderId } = req.params;
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const response = await Service.cancelOrderService(user_id, orderId);
  return res.status(response.status).send(response.data);
};
