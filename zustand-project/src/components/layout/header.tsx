"use client";
import Cart from "@/components/ui/cart";
import useStore from "@/app/store";

export default function Header() {
  const {totalQuantity} = useStore();
  return (
    <>
      <div className="flex /*bg-red-300*/ bg-indigo-700 justify-end pr-80 fixed w-full  ">
        <Cart />
      </div>
    </>
  );
}
