"use client";
import { Button } from "@/components/ui/button";
import { LoaderCircle, ShoppingBasket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import GlobalApi from "../_utilis/GlobalApi";
import { toast } from "sonner";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import { getCookie } from "cookies-next";

function ProductIteamDetail({ product, setOpen }) {
  // const jwt = sessionStorage.getItem("jwt");
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = getCookie("jwt");
  let user = "";
  try {
    user = JSON.parse(getCookie("user"));
  } catch (e) {}
  const [loading, setLoading] = useState(false);
  const { updatecart, setUpdateCart } = useContext(UpdateCartContext);

  const [productTotalPrice, setProductTotalPrice] = useState(
    product.attributes.sellingPrice
      ? product.attributes.sellingPrice
      : product.attributes.mrp
  );
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const addToCart = () => {
    setLoading(true);
    if (!jwt) {
      router.push("/sign-in");
      setLoading(false);
      return;
    }
    const data = {
      data: {
        quantity: quantity,
        amount: (quantity * productTotalPrice).toFixed(2),
        products: product.id,
        users_permissions_users: user.id,
        userid: user.id,
      },
    };
    GlobalApi.addTocart(data, jwt).then(
      (res) => {
        // console.log(res);
        toast("Added to Cart");
        setUpdateCart(!updatecart);
        setLoading(false);
        setOpen(false);
      },
      (e) => {
        toast("Error while adding into Cart");
        setLoading(false);
      }
    );
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-7 bg-white text-black">
      <Image
        src={
          process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
          product?.attributes?.images?.data[0]?.attributes?.url
        }
        alt={product.attributes.name}
        width={300}
        height={300}
        className="bg-slate-100 p-5 h-[320px] w-[300px] object-contain rounded-lg "
      />
      <div className="flex flex-col gap-3">
        <h2 className="text-2xl font-bold ">{product.attributes.name}</h2>
        <h2 className="text-sm  text-gray-500 ">
          {product.attributes.description}
        </h2>
        <div className="flex gap-2">
          <h2
            className={`font-bold text-3xl ${
              product.attributes.sellingPrice && "line-through text-gray-500"
            }  `}
          >
            Rs.{product.attributes.mrp}
          </h2>
          {product.attributes.sellingPrice && (
            <h2 className="font-bold text-3xl">
              Rs.{product.attributes.sellingPrice}
            </h2>
          )}
        </div>
        <h2 className="text-lg font-medium ">
          Quantity: {product.attributes.itemQuantityType}
        </h2>
        <div className="flex flex-col items-baseline gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 border flex gap-10 items-center px-3">
              <button
                disabled={quantity == 1}
                onClick={() => setQuantity(quantity - 1)}
              >
                -
              </button>
              <h2>{quantity}</h2>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <h2 className="font-medium text-2xl">
              = Rs.{(quantity * productTotalPrice).toFixed(2)}
            </h2>
          </div>

          <Button
            className="flex gap-3"
            onClick={() => addToCart()}
            disabled={loading}
          >
            <ShoppingBasket />
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              " Add to Cart"
            )}
          </Button>
        </div>
        <h2>
          <span className="font-bold">Category: </span>
          {product.attributes.categories.data[0].attributes.name}
        </h2>
      </div>
    </div>
  );
}

export default ProductIteamDetail;
