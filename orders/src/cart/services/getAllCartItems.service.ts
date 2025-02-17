import {
  InternalServerErrorResponse,
  NotFoundResponse,
} from "../../commons/patterns";
import { getAllCartItems } from "../dao/getAllCartItems.dao";

export const getAllCartItemsService = async (user_id: string) => {
  try {
    const SERVER_TENANT_ID = process.env.TENANT_ID;
    if (!SERVER_TENANT_ID) {
      return new InternalServerErrorResponse("Tenant ID not found").generate();
    }

    if (!user_id) {
      return new NotFoundResponse("User not found").generate();
    }

    const items = await getAllCartItems(SERVER_TENANT_ID, user_id);

    return {
      data: items,
      status: 200,
    };
  } catch (err: any) {
    return new InternalServerErrorResponse(err).generate();
  }
};
