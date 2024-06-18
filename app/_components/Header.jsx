"use client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  CircleUserRound,
  LayoutGrid,
  Search,
  ShoppingBasketIcon,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import GlobalApi from "../_utilis/GlobalApi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";
import { deleteCookie, getCookie } from "cookies-next";

function Header() {
  const [categoryList, setCategoryList] = useState([]);
  // const isLogin = sessionStorage.getItem("jwt") ? true : false;
  const isLogin = getCookie("jwt") ? true : false;
  // const jwt = sessionStorage.getItem("jwt");
  let user = "";
  try {
    user = JSON.parse(getCookie("user"));
  } catch (e) {}
  const jwt = getCookie("jwt");
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const [totalCartItem, setTotalCartItem] = useState(0);
  const router = useRouter();
  const { updatecart, setUpdateCart } = useContext(UpdateCartContext);
  const [cartitemList, setCartitemList] = useState([]);
  useEffect(() => {
    getCategoryList();
  }, []);
  if (isLogin) {
    useEffect(() => {
      getCartItem();
    }, [updatecart]);
  }
  const getCategoryList = () => {
    GlobalApi.getCategory().then((res) => {
      // console.log(res);
      setCategoryList(res.data.data);
    });
  };

  const getCartItem = async () => {
    const cartItemlist = await GlobalApi.getCartItem(user.id, jwt);
    // console.log(cartItemlist);
    setTotalCartItem(cartItemlist?.length);
    setCartitemList(cartItemlist);
  };

  const onSignOut = () => {
    // sessionStorage.clear();
    deleteCookie("jwt");
    deleteCookie("user");
    router.push("/sign-in");
  };

  const onDeleteItem = (id) => {
    GlobalApi.deleteCartitem(id, jwt).then((res) => {
      toast("Item Removed Successfully");
      getCartItem();
    });
  };

  const [subTotal, setSubTotal] = useState(0);
  useEffect(() => {
    let total = 0;
    cartitemList.forEach((element) => {
      total = total + element.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cartitemList]);

  return (
    <div className="p-2 shadow-sm flex justify-between">
      <div className="mx-4  flex gap-5 items-center">
        <Link href={"/"}>
          <Image src="/logo.png" width={90} height={90} alt="logo" />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="md:flex gap-2 border rounded-full p-2 px-10 bg-slate-100 items-center hidden cursor-pointer hover:bg-primary hover:text-white ">
              <LayoutGrid className="h-5 w-5" />
              Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList.map((category, index) => (
              <Link
                key={index}
                href={"/products-category/" + category.attributes.name}
              >
                <DropdownMenuItem className="flex gap-4 items-center cursor-pointer">
                  <Image
                    src={
                      process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                      category?.attributes?.icon?.data[0]?.attributes?.url
                    }
                    unoptimized={true}
                    width={30}
                    height={30}
                    alt="icon"
                  />
                  <h2 className="text-lg">{category?.attributes.name}</h2>
                </DropdownMenuItem>
              </Link>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="search" className="outline-none" />
        </div>
      </div>
      <div className="flex gap-5 items-center mx-4">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasketIcon className="h-7 w-7" />
              <span className="bg-primary text-white  px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2 border rounded-sm mt-2 text-center">
                My Cart
              </SheetTitle>
              <SheetDescription className="text-black">
                <CartItemList
                  cartitemList={cartitemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div className="absolute w-[90%] bottom-6 flex flex-col">
                <h2 className="text-lg font-bold flex justify-between border-t">
                  Subtotal <span>Rs.{subTotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  CheckOut
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogin ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="h-12 w-12 bg-green-100 text-primary p-2 rounded-full cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                Profile
              </DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem className="cursor-pointer">
                  My Order
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => onSignOut()}
                className="cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
}

export default Header;
