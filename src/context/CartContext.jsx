import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
	const context = useContext(CartContext);
	if (!context) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};

const CART_STORAGE_KEY = 'nicesurprise_cart';

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);

	useEffect(() => {
		const savedCart = localStorage.getItem(CART_STORAGE_KEY);
		if (savedCart) {
			try {
				setCart(JSON.parse(savedCart));
			} catch (error) {
				console.error('Error loading cart from storage:', error);
				setCart([]);
			}
		}
	}, []);

	const addToCart = (product) => {
		setCart((prevCart) => {
			const existingItem = prevCart.find((item) => item.id === product.id);
			let newCart;

			if (existingItem) {
				newCart = prevCart.map((item) =>
					item.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				);
				console.log('🛒 Producto actualizado en el carrito:', {
					producto: product.title,
					cantidad: existingItem.quantity + 1,
					precio: product.price,
				});
			} else {
				newCart = [...prevCart, { ...product, quantity: 1 }];
				console.log('🛒 Nuevo producto agregado al carrito:', {
					producto: product.title,
					cantidad: 1,
					precio: product.price,
				});
			}

			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
			console.log('💾 Carrito guardado en localStorage:', {
				totalItems: newCart.length,
				items: newCart.map((item) => ({
					nombre: item.title,
					cantidad: item.quantity,
					precio: item.price,
				})),
				storageKey: CART_STORAGE_KEY,
			});
			console.log('📦 Contenido completo del storage:', JSON.parse(localStorage.getItem(CART_STORAGE_KEY)));

			return newCart;
		});
	};

	const removeFromCart = (productId) => {
		setCart((prevCart) => {
			const newCart = prevCart.filter((item) => item.id !== productId);
			localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCart));
			return newCart;
		});
	};

	const clearCart = () => {
		setCart([]);
		localStorage.removeItem(CART_STORAGE_KEY);
	};

	const getCartTotal = () => {
		return cart.reduce((total, item) => total + item.price * item.quantity, 0);
	};

	const getCartItemsCount = () => {
		return cart.reduce((total, item) => total + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				clearCart,
				getCartTotal,
				getCartItemsCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

