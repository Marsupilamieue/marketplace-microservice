import { Request, Response } from "express";
import * as Service from "./services";

export const getAllProductsHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const response = await Service.getAllProductsService();
  return res.status(response.status).send(response.data);
};

export const getManyProductDatasByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { productIds } = req.body;
  console.log("dawkndwad");
  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    return res.status(400).json({
      error: "Product IDs are invalid or missing",
      status: 400,
    });
  }

  const response = await Service.getManyProductDatasByIdService(productIds);
  return res.status(response.status).send(response.data);
};

export const getProductByIdHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const response = await Service.getProductByIdService(id);
  return res.status(response.status).send(response.data);
};

export const getProductByCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { category_id } = req.params;
  const response = await Service.getProductByCategoryService(category_id);
  return res.status(response.status).send(response.data);
};

export const createProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name, description, price, quantity_available, category_id } =
    req.body;

  if (
    !name ||
    typeof name !== "string" ||
    !description ||
    typeof description !== "string" ||
    typeof price !== "number" ||
    price < 0 ||
    typeof quantity_available !== "number" ||
    quantity_available < 0
  ) {
    return res.status(400).json({
      error: "Product data are invalid or missing",
      status: 400,
    });
  }
  const response = await Service.createProductService(
    name,
    description,
    price,
    quantity_available,
    category_id
  );
  return res.status(response.status).send(response.data);
};

export const getAllCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const response = await Service.getAllCategoriesService();
  return res.status(response.status).send(response.data);
};

export const createCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { name } = req.body;
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Categories are invalid or missing",
      status: 400,
    });
  }
  const response = await Service.createCategoryService(name);
  return res.status(response.status).send(response.data);
};

export const editProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const { name, description, price, quantity_available, category_id } =
    req.body;
  if (
    (!name &&
      !description &&
      price === undefined &&
      quantity_available === undefined &&
      !category_id) ||
    (name !== undefined && (typeof name !== "string" || name.trim() === "")) ||
    (description !== undefined &&
      (typeof description !== "string" || description.trim() === "")) ||
    (price !== undefined && (typeof price !== "number" || price < 0)) ||
    (quantity_available !== undefined &&
      (typeof quantity_available !== "number" || quantity_available < 0))
  ) {
    return res.status(400).json({
      error: "Product data are invalid or missing",
      status: 400,
    });
  }
  const response = await Service.editProductService(
    id,
    name,
    description,
    price,
    quantity_available,
    category_id
  );
  return res.status(response.status).send(response.data);
};

export const editCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { category_id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      error: "Category data are invalid or missing",
      status: 400,
    });
  }

  const response = await Service.editCategoryService(category_id, name);
  return res.status(response.status).send(response.data);
};

export const deleteProductHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { id } = req.params;
  const response = await Service.deleteProductService(id);
  return res.status(response.status).send(response.data);
};

export const deleteCategoryHandler = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { category_id } = req.params;
  const response = await Service.deleteCategoryService(category_id);
  return res.status(response.status).send(response.data);
};
