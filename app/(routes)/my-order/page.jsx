"use client";
import GlobalApi from "@/app/_utilis/GlobalApi";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./MyOrderItem";
import { getCookie } from "cookies-next";

function MyOrder() {
  const router = useRouter();
  let user = "";
  try {
    user = JSON.parse(getCookie("user"));
  } catch (e) {}
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = getCookie("jwt");

  // const jwt = sessionStorage.getItem("jwt");
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderLst = await GlobalApi.getMyOrder(user.id, jwt);
    // console.log(orderLst);
    setOrderList(orderLst);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className=" py-8  md:mx-20">
        <h2 className=" text-3xl font-bold text-primary">Order History</h2>
        <div className="mt-10">
          {orderList.map((item, index) => (
            <Collapsible key={index} className="mb-2">
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex gap-24">
                  <h2>
                    <span className="font-bold mr-2">Order Date: </span>
                    {moment(item?.createdAt).format("DD/MMM/yyy")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount:</span>Rs.
                    {item?.totalOrderAmount}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Status:</span>{" "}
                    {item?.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order, index_) => (
                  <MyOrderItem orderItem={order} key={index_} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
