import { InternalServerErrorResponse } from "../../commons/patterns";
import { getManyProductDatasById } from "../dao/getManyProductDatasById.dao";

export const getManyProductDatasByIdService = async (productIds: string[]) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse(
        "Server Tenant ID not found"
      ).generate();
    }

    const products = await getManyProductDatasById(
      SERVER_TENANT_ID,
      productIds
    );

    if (!products || products.length === 0) {
      return {
        error: "No products found for the provided IDs",
        status: 404,
      };
    }

    if (products.length < productIds.length) {
      const foundIds = products.map((p: any) => p.id);
      const missingIds = productIds.filter((id) => !foundIds.includes(id));
      return {
        error: `Products with ids '${missingIds.join("', '")}' not found`,
        status: 404,
      };
    }

    return {
      data: products,
      status: 200,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
