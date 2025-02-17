import { Request, Response } from "express";
import * as Service from "./services";

export const getAllUserWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const response = await Service.getAllUserWishlistService(user_id);
  return res.status(response.status).send(response.data);
};

export const getWishlistByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { id } = req.params;
  const response = await Service.getWishlistByIdService(id, user_id);
  return res.status(response.status).send(response.data);
};

export const createWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { name } = req.body;
  const response = await Service.createWishlistService(user_id, name);
  return res.status(response.status).send(response.data);
};

export const updateWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { name } = req.body;
  const response = await Service.updateWishlistService(id, name);
  return res.status(response.status).send(response.data);
};

export const deleteWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const response = await Service.deleteWishlistService(id);
  return res.status(response.status).send(response.data);
};

export const addProductToWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { wishlist_id, product_id } = req.body;
  const response = await Service.addProductToWishlistService(
    wishlist_id,
    product_id,
    user_id
  );
  return res.status(response.status).send(response.data);
};

export const removeProductFromWishlistHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  if (!req.body.user?.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user_id: string = req.body.user.id;
  const { id } = req.body;
  const response = await Service.removeProductFromWishlistService(id, user_id);
  return res.status(response.status).send(response.data);
};
