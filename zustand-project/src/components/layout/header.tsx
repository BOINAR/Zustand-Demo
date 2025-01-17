import React from "react";
import Cart from "@/components/ui/cart";

export default function Header() {
  return (
    <>
      <div className="flex bg-red-300 justify-end pr-80 fixed w-full  ">
        <Cart />
      </div>
    </>
  );
}
