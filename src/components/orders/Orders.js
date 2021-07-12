import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startGettingOrders } from "../../action/orderAction";
import { SmallLoading } from "../SmallLoading";
import { Order } from "./Order";

export const Orders = () => {
  const dispatch = useDispatch();
  const [loadingOrders, setLoadingOrders] = useState(true);
  useEffect(() => {
    dispatch(startGettingOrders());
    setLoadingOrders(false);
  }, [dispatch]);

  const { orders } = useSelector((state) => state.orders);
  console.log(orders);
  return (
    <div className="orders">
      <div className="title text-5xl text-red-400 p-1 mb-2">
        <h2>Ordernes</h2>
      </div>
      {loadingOrders ? (
        <SmallLoading />
      ) : orders.length <= 0 ? (
        <div className="p-2 bg-red-200 shadow rounded text-center text-2xl text-red-600">
          No hay Ordenes disponibles por el momento...
        </div>
      ) : (
        <div className="flex flex-col align-center jusify-center bg-gray-100 rounded-md divide-gray-900 shadow-lg divide-y-2 divide-solid">
          {orders.map((order) => (
            <Order key={order._id} order={order} />
          ))}
        </div>
      )}
    </div>
  );
};
