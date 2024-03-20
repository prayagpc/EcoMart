import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

function CartItemList({ cartitemList, onDeleteItem }) {
  return (
    <div>
      <div className="overflow-auto h-[500px]">
        {cartitemList.map((cart, index) => (
          <div
            key={index}
            className="flex justify-between items-center p-2 mb-5"
          >
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + cart.image}
                width={90}
                height={90}
                alt={cart.name}
                className="border p-2"
              />
              <div>
                <h2 className="font-bold">{cart.name}</h2>
                <h2>Quantity: {cart.quantity}</h2>
                <h2 className="text-lg font-bold">Rs. {cart.amount}</h2>
              </div>
            </div>
            <Trash2Icon
              className="cursor-pointer"
              onClick={() => onDeleteItem(cart.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartItemList;
