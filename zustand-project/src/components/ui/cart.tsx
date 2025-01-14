import React from "react";
import useState from "../../app/store";

export default function Cart() {
  const {isCartOpen, toggleCartDropdown} = useState();

  const handleToggleDropdown = () => {
    toggleCartDropdown(!isCartOpen);
  };
  return (
    <>
      <div className="relative inline-block text-left ml-64" tabIndex={0}>
        {/* Bouton pour ouvrir le dropdown */}
        <button
          className="inline-flex justify-center w-full rounded-md  px-4 py-2"
          onClick={handleToggleDropdown}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-8 flex justify-center items-center bg-sky-500 rounded ">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
            />
          </svg>
        </button>

        {/* Contenu du dropdown */}
        {isCartOpen && (
          <div
            className="absolute mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg"
            role="menu"
            aria-orientation="vertical"
            tabIndex={-1}>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={0}>
              Option 1
            </a>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabIndex={0}>
              Option 2
            </a>
          </div>
        )}
      </div>
    </>
  );
}
