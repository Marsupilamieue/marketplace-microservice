import { NewCart } from "../../../db/schema/cart";
import {
  InternalServerErrorResponse,
  NotFoundResponse,
} from "../../commons/patterns";
import { addItemToCart } from "../dao/addItemToCart.dao";

export const addItemToCartService = async (
  user_id: string,
  product_id: string,
  quantity: number
) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse("Tenant ID not found").generate();
    }

    if (!user_id) {
      return new NotFoundResponse("User not found").generate();
    }

    const cartData: NewCart = {
      tenant_id: SERVER_TENANT_ID,
      user_id: user_id,
      product_id: product_id,
      quantity: quantity,
    };

    const item = await addItemToCart(cartData);

    return {
      data: {
        ...item,
      },
      status: 201,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
