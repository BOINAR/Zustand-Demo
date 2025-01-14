import {create} from "zustand";

type Rating = {
  rate: number; // La note, par exemple 3.9
  count: number; // Le nombre d'évaluations, par exemple 120
};

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
};

type Store = {
  card: Product[]; // Produits récupéré dans la page de la liste des produits
  cart: (Product & {quantity: number})[]; // Produits ajoutés au panier
  isCartOpen: boolean; // État du dropdown
  toggleCartDropdown: (status: boolean) => void;
  totalQuantity: number; // Total des quantités dans le panier
  initializeProducts: (data: Product[]) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  increment: () => void;
  decrement: () => void;
  expanded: boolean;
  quantity: number;
  toggleExpanded: (status: boolean) => void;
  fetchProduct: () => Promise<Product[]>;
};

const useStore = create<Store>(set => ({
  // card

  quantity: 0,
  expanded: false,
  increment: () => set(state => ({quantity: state.quantity + 1})),
  decrement: () => set(state => ({quantity: state.quantity - 1})),
  toggleExpanded: (status: boolean) => set({expanded: status}),

  card: [],
  fetchProduct: async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        next: {revalidate: 10}
      });
      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }
      const data: Product[] = await res.json();
      set({card: data});
      console.log("Fetched products", data); // Débogage pour voir les produits
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    return [];
  },

  // cart
  cart: [],
  isCartOpen: false,
  totalQuantity: 0,

  initializeProducts: data => {
    const initializedProducts = data.map(product => ({
      ...product,
      quantity: 0
    }));
    set({card: initializedProducts});
  },

  addToCart: product =>
    set(state => {
      const existingProduct = state.cart.find(p => p.id === product.id);

      if (existingProduct) {
        // Met à jour la quantité si le produit est déjà dans le panier
        const updatedCart = state.cart.map(p =>
          p.id === product.id ? {...p, quantity: p.quantity + 1} : p
        );
        return {
          cart: updatedCart,
          totalQuantity: state.totalQuantity + 1
        };
      } else {
        // Ajoute un nouveau produit au panier
        return {
          cart: [...state.cart, {...product, quantity: 1}],
          totalQuantity: state.totalQuantity + 1
        };
      }
    }),

  removeFromCart: id =>
    set(state => {
      const updatedCart = state.cart
        .map(p =>
          p.id === id && p.quantity > 1 ? {...p, quantity: p.quantity - 1} : p
        )
        .filter(p => p.quantity > 0);

      const removedProduct = state.cart.find(p => p.id === id);
      return {
        cart: updatedCart,
        totalQuantity: state.totalQuantity - (removedProduct?.quantity || 0)
      };
    }),

  toggleCartDropdown: (status: boolean) => set({isCartOpen: status})
}));

useStore.getState().fetchProduct();

export default useStore;
