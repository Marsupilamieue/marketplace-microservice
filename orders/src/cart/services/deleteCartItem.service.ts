import {
  InternalServerErrorResponse,
  NotFoundResponse,
} from "../../commons/patterns";
import { deleteCartItemByProductId } from "../dao/deleteCartItemByProductId.dao";

export const deleteCartItemService = async (
  user_id: string,
  product_id: string
) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse("Tenant ID not found").generate();
    }

    if (!user_id) {
      return new NotFoundResponse("User not found").generate();
    }

    const cart = await deleteCartItemByProductId(
      SERVER_TENANT_ID,
      user_id,
      product_id
    );

    return {
      data: cart,
      status: 200,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
