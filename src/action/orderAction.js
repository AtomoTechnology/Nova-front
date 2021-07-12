import { fetchWithToken } from "../helpers/fetchWithOutToken";
import { types } from "../types/types";
export const startGettingOrders = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchWithToken("orders");
      const orders = await resp.json();
      console.log(orders);

      if (orders.ok) {
        dispatch(startOrders(orders.orders));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const startOrders = (orders) => ({
  type: types.getAllOrders,
  payload: orders,
});
