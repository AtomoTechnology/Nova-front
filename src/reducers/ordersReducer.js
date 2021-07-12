import { types } from "../types/types";

const initialState = {
  orders: [],
};

export const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.getAllOrders:
      return {
        ...state,
        orders: action.payload,
      };
    default:
      return state;
  }
};
