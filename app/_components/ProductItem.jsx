"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import ProductIteamDetail from "./ProductIteamDetail";

function ProductItem({ product }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="md:p-6 p-2 flex flex-col items-center justify-center gap-3 border rounded-lg mt-6 hover:scale-110 hover:shadow-lg transition-all ease-in-out cursor-pointer">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        width={500}
        height={200}
        alt={product.attributes.name}
        className="h-[200px] w-[200px] object-contain"
      />
      <h2 className="font-bold text-lg">{product.attributes.name}</h2>
      <h2 className="text-lg font-medium ">
        Quantity: {product.attributes.itemQuantityType}
      </h2>
      <div className="flex gap-2">
        <h2
          className={`font-bold ${
            product.attributes.sellingPrice && "line-through text-gray-500"
          }  `}
        >
          Rs.{product.attributes.mrp}
        </h2>
        {product.attributes.sellingPrice && (
          <h2 className="font-bold">Rs.{product.attributes.sellingPrice}</h2>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-primary hover:text-white hover:bg-primary"
          >
            Add to Cart
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <ProductIteamDetail product={product} setOpen={setOpen} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductItem;
