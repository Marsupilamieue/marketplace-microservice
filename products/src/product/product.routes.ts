import express from "express";
import { validate, verifyJWTProduct } from "../middleware";
import * as Validation from "./validation";
import * as Handler from "./product.handler";

const router = express.Router();

/**
 * @openapi
 * /v2/products:
 *   get:
 *     summary: Get all products
 *     responses:
 *       200:
 *         description: Success
 */
router.get("", Handler.getAllProductsHandler);
router.get("/categories", Handler.getAllCategoryHandler);
router.get(
  "/:id",
  validate(Validation.getProductByIdSchema),
  Handler.getProductByIdHandler
);
router.post(
  "/bulk",
  validate(Validation.getManyProductDatasByIdSchema),
  Handler.getManyProductDatasByIdHandler
);
router.get(
  "/categories/:category_id",
  validate(Validation.getProductByCategorySchema),
  Handler.getProductByCategoryHandler
);
router.post(
  "",
  verifyJWTProduct,
  validate(Validation.createProductSchema),
  Handler.createProductHandler
);
router.post(
  "/categories",
  verifyJWTProduct,
  validate(Validation.createCategorySchema),
  Handler.createCategoryHandler
);
router.put(
  "/:id",
  verifyJWTProduct,
  validate(Validation.editProductSchema),
  Handler.editProductHandler
);
router.put(
  "/categories/:category_id",
  verifyJWTProduct,
  validate(Validation.editCategorySchema),
  Handler.editCategoryHandler
);
router.delete(
  "/:id",
  verifyJWTProduct,
  validate(Validation.deleteProductSchema),
  Handler.deleteProductHandler
);
router.delete(
  "/category/:category_id",
  verifyJWTProduct,
  validate(Validation.deleteCategorySchema),
  Handler.deleteCategoryHandler
);

export default router;
