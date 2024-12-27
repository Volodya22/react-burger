import { createAsyncThunk } from "@reduxjs/toolkit";
import { createNewOrder } from "../../utils/api";

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (items: string[]) => {
    return await createNewOrder({ ingredients: items });
  }
)
