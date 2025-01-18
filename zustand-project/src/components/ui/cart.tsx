"use client";
import React from "react";
import useStore from "../../app/store";

export default function Cart() {
  const {isCartOpen, toggleCartDropdown, cart, totalQuantity} = useStore();

  const handleToggleDropdown = () => {
    toggleCartDropdown(!isCartOpen);
  };
  return (
    
      
      <div className="relative group inline-block text-left ml-64 mt-1 " tabIndex={0}>
        {/* Bouton pour ouvrir le dropdown */}
        <div className="flex justify-center items-center absolute top-0 right-1 bg-red-500 text-xs rounded-full w-5 h-5  text-indigo-50">{totalQuantity}</div>
        <button
          className="inline-flex justify-center w-full rounded-md  px-4 py-2"
          onClick={handleToggleDropdown}>
            
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 flex justify-center items-center bg-sky-500 rounded stroke-indigo-50 ">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
            
          </svg>
          
        </button>
        
        {/* Contenu du dropdown */}

        <div
          className={`absolute mt-2 w-96 origin-top-right rounded-md bg-white shadow-lg p-4 group-hover:block ${
            isCartOpen ? "block" : "hidden"
          } `}
          role="menu"
          aria-orientation="vertical"
          tabIndex={-1}>
          {cart.map(product => (
            <div
              key={product.id}
              className="flex justify-between items-center border-b py-2 ">
              <p className="w-14 justify-center">
                <img src={product.image} alt={product.title} />
              </p>
              <p className="w-1/3 text-gray-800">{product.title}</p>
              <div className=" flex-col justify-center  ">
                <p className=" text-gray-600  w-full ">
                  Qty: {product.quantity}
                </p>

                <p className=" text-gray-800  w-full ">
                  Price: {(product.quantity * product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          <p className="text-gray-800 font-bold mt-4">
            Total Quantity: {totalQuantity}
          </p>
          <p className="text-gray-800 font-bold">
            Total Price:{" "}
            {cart
              .reduce(
                (sum, product) => sum + product.quantity * product.price,
                0
              )
              .toFixed(2)}{" "}
            €
          </p>
        </div>
      </div>
   
  );
}
