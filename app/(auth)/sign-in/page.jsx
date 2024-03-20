"use client";
import GlobalApi from "@/app/_utilis/GlobalApi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getCookie, setCookie } from "cookies-next";
import { LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loader, setLoader] = useState();
  const router = useRouter();
  useEffect(() => {
    const jwt = getCookie("jwt");
    // const jwt = sessionStorage.getItem("jwt");
    if (jwt) {
      router.push("/");
    }
  }, []);

  const onSignIn = () => {
    setLoader(true);
    GlobalApi.signIn(email, password).then(
      (res) => {
        console.log(res.data.user);
        console.log(res.data.jwt);
        setCookie("user", JSON.stringify(res.data.user));
        setCookie("jwt", res.data.jwt);
        // sessionStorage.setItem("user", JSON.stringify(res.data.user));
        // sessionStorage.setItem("jwt", res.data.jwt);
        router.push("/");
        toast("Sign In Successfully");
        setLoader(false);
      },
      (e) => {
        toast(e.response.data.error.message);
        setLoader(false);
      }
    );
  };

  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
        <Image src="/logo.png" width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Sign In
        </h2>
        <div className="flex flex-col gap-5 mt-7 w-full">
          <Input
            placeholder="name@example.com"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={() => onSignIn()} disabled={!(email || password)}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign-In"}
          </Button>
          <div>
            Don't have an account
            <Link className="text-blue-500" href={"/create-account"}>
              Click here to Create new account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
