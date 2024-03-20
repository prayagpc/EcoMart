"use client";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePathname } from "next/navigation";
import { UpdateCartContext } from "./_context/UpdateCartContext";
import { useEffect, useState } from "react";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Footer from "./_components/Footer";
import { getCookie, setCookie } from "cookies-next";

const outfit = Outfit({ subsets: ["latin"] });

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({ children }) {
  // useEffect(() => {
  //   setCookie("ABC", "123");
  //   const res = getCookie("ABC", "123");
  //   console.log(res);
  // }, []);
  const params = usePathname();
  const [updatecart, setUpdateCart] = useState(false);
  const showHeader =
    params == "/sign-in" || params == "/create-account" ? false : true;
  return (
    <PayPalScriptProvider options={{ clientId: "test" }}>
      <html lang="en">
        <body className={outfit.className}>
          <UpdateCartContext.Provider value={{ updatecart, setUpdateCart }}>
            {showHeader && <Header />}

            {children}
            {showHeader && <Footer />}

            <Toaster />
          </UpdateCartContext.Provider>
        </body>
      </html>
    </PayPalScriptProvider>
  );
}
