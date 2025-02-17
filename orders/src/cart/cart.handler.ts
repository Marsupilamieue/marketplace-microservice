import { Request, Response } from "express";
import * as Service from "./services";

export const getAllCartItemsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const response = await Service.getAllCartItemsService(user_id);
  return res.status(response.status).send(response.data);
};

export const addItemToCartHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { product_id, quantity } = req.body;
  const response = await Service.addItemToCartService(
    user_id,
    product_id,
    quantity
  );
  return res.status(response.status).send(response.data);
};

export const editCartItemHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { cart_id, quantity } = req.body;
  const response = await Service.editCartItemService(
    user_id,
    cart_id,
    quantity
  );
  return res.status(response.status).send(response.data);
};

export const deleteCartItemHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { product_id } = req.body;
  const response = await Service.deleteCartItemService(user_id, product_id);
  return res.status(response.status).send(response.data);
};
