"use client";
import Cart from "@/components/ui/cart";
import useStore from "./store";

export default function Card() {
  const {increment, decrement, toggleExpanded, card, addToCart} = useStore();

  const handleToggle = (id: number) => {
    const product = card.find(p => p.id === id);

    if (product?.quantity === 0) {
      increment(id); // Ajoute une quantité initiale pour réactiver le mode expanded
    }
    // Affiche l'état avant
    toggleExpanded(id);
    // Affiche l'état après
  };

  const handleAddToCart = (productId: number) => {
    const product = card.find(p => p.id === productId);
    if (product && product.quantity > 0) {
      addToCart(product);
    }
  };

  console.log(JSON.stringify(card, null, 2));

  return (
    <div className="flex flex-wrap bg-slate-100 ">
      <div className=" mt-20 ml-5 w-full">
         <h1 >Products :</h1>
      </div>
     

      {card.map(product => (
        <div key={product.id} >
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
              <p className="text-gray-700 text-base">{product.quantity}</p>{" "}
              {/* Affiche la quantité */}
            </div>
            <div className="px-6 pt-4 pb-2">
              {product.expanded && product.quantity > 0 ? ( // Utilise product.expanded et product.quantity
                <div className="flex space-x-4 animate-fadeIn">
                  <button
                    className="bg-blue-500 text-white p-4 rounded-full text-2xl hover:bg-blue-400 transition duration-300"
                    onClick={() => decrement(product.id)}>
                    -
                  </button>
                  <button
                    className="bg-blue-500 text-white p-4 rounded-full text-2xl hover:bg-blue-400 transition duration-300"
                    onClick={() => increment(product.id)}>
                    +
                  </button>
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full "
                    onClick={() => handleAddToCart(product.id)}>
                    Add To Cart
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleToggle(product.id)}>
                  Quantité
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
