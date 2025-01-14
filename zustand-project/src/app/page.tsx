"use client";
import Cart from "@/components/ui/cart";
import useStore from "./store";
import Image from "next/image";

export default function Card() {
  const {quantity, expanded, increment, decrement, toggleExpanded, card} =
    useStore();

  const handleToggle = () => {
    if (quantity === 0) {
      increment(); // Ajoute une quantité initiale pour réactiver le mode expanded
    }
    console.log("Before toggle:", expanded); // Affiche l'état avant
    toggleExpanded(!expanded);
    console.log("After toggle:", !expanded); // Affiche l'état après
  };
  return (
    <div className="flex flex-wrap  bg-slate-100">
      {card.map(product => (
        <div key={product.id} >
          <div className="flex items-center mt-4">
            <h1 className="ml-4">Products :</h1>
            <Cart />
          </div>

          <div className="max-w-sm m-4 rounded overflow-hidden shadow-lg bg-white border border-blue-50">
            <div className="px-6 py-4">
              <img
                src={product.image}
                className="w-auto"
                alt="Picture of the author"
              />
              <h2 className="font-bold text-xl mb-2">{product.title}</h2>{" "}
              {/* Affiche le titre du produit */}
              <p className="text-gray-700 text-base">{product.price}</p>
              <p className="text-gray-700 text-base">{quantity}</p>{" "}
              {/* Affiche la quantité */}
            </div>
            <div className="px-6 pt-4 pb-2">
              {expanded && quantity > 0 ? ( // Utilise product.expanded et product.quantity
                <div className="flex space-x-4 animate-fadeIn">
                  <button
                    className="bg-blue-500 text-white p-4 rounded-full text-2xl hover:bg-blue-400 transition duration-300"
                    onClick={decrement}>
                    -
                  </button>
                  <button
                    className="bg-blue-500 text-white p-4 rounded-full text-2xl hover:bg-blue-400 transition duration-300"
                    onClick={increment}>
                    +
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleToggle}>
                  Bouton
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
