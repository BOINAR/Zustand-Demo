import {create} from "zustand";
import {z} from "zod";

const RatingSchema = z.object({
  rate: z.number(),
  count: z.number()
});

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: RatingSchema
});

type Product = z.infer<typeof ProductSchema>;

type Store = {
  card: (Product & {quantity: number; expanded: boolean})[]; // Produits récupéré dans la page de la liste des produits
  cart: (Product & {quantity: number})[]; // Produits ajoutés au panier
  isCartOpen: boolean; // État du dropdown
  toggleCartDropdown: (status: boolean) => void;
  totalQuantity: number; // Total des quantités dans le panier
  addToCart: (product: Product & {quantity: number}) => void;
  removeFromCart: (id: number) => void;
  increment: (id: number) => void;
  decrement: (id: number) => void;

  resetProductQuantity: (id: number) => void;

  toggleExpanded: (id: number) => void;
  fetchProduct: () => void;
};

const useStore = create<Store>(set => ({
  // card
 
  resetProductQuantity: (id: number) => {
    set(state => ({
      card: state.card.map(product =>
        product.id === id ? {...product, quantity: 0} : product
      )
    }));
  },

  increment: productId =>
    set(state => ({
      card: state.card.map(p =>
        p.id === productId ? {...p, quantity: p.quantity + 1} : p
      )
    })),

  decrement: productId =>
    set(state => ({
      card: state.card.map(p =>
        p.id === productId && p.quantity > 0
          ? {
              ...p,
              quantity: Math.max(p.quantity - 1, 0),
              expanded: p.quantity - 1 === 0 ? false : p.expanded
            }
          : p
      )
    })),

  toggleExpanded: (productId: number) =>
    set(state => ({
      card: state.card.map(p =>
        p.id === productId ? {...p, expanded: !p.expanded} : p
      )
    })),

  card: [],

  fetchProduct: async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products", {
        next: {revalidate: 10}
      });

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const Rawdata = await res.json();

      const data = ProductSchema.array().parse(Rawdata);

      // Initialise les produits avec quantity et expanded
      const initializedProducts = data.map(product => ({
        ...product,
        quantity: 0, // Ajoute quantity
        expanded: false // Ajoute expanded
      }));

      // Met à jour le store avec les produits initialisés
      set({card: initializedProducts});

      console.log("Fetched and initialized products", initializedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  },

  // cart
  cart: [],

  isCartOpen: false,
  totalQuantity: 0,

  addToCart: (product: Product & {quantity: number}) =>
    set(state => {
      const existingProduct = state.cart.find(p => p.id === product.id);

      let updatedCart;
      if (existingProduct) {
        updatedCart = state.cart.map(p =>
          p.id === product.id
            ? {...p, quantity: p.quantity + product.quantity}
            : p
        );
      } else {
        updatedCart = [...state.cart, {...product, quantity: 1}];
      }

      const totalQuantity = updatedCart.reduce((acc, p) => acc + p.quantity, 0); // Recalcule la quantité totale

      return {
        cart: updatedCart,
        totalQuantity: totalQuantity
      };
    }),

  removeFromCart: id =>
    set(state => {
      const updatedCart = state.cart
        .map(p =>
          p.id === id && p.quantity > 1 ? {...p, quantity: p.quantity - 1} : p
        )
        .filter(p => p.quantity > 0);

      const totalQuantity = updatedCart.reduce((acc, p) => acc + p.quantity, 0); // Recalculer la quantité totale

      return {
        cart: updatedCart,
        totalQuantity: totalQuantity
      };
    }),

  toggleCartDropdown: (status: boolean) => set({isCartOpen: status})
}));

useStore.getState().fetchProduct();

export default useStore;
