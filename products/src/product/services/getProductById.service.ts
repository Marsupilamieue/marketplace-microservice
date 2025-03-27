import { InternalServerErrorResponse } from "../../commons/patterns";
import { getProductById } from "../dao/getProductById.dao";

export const getProductByIdService = async (id: string) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse(
        "Server Tenant ID not found"
      ).generate();
    }

    const products = await getProductById(SERVER_TENANT_ID, id);

    if (!products) {
      return {
        error: `Product with id '${id}' not found`,
        status: 404,
      };
    }

    return {
      data: {
        ...products,
      },
      status: 200,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
