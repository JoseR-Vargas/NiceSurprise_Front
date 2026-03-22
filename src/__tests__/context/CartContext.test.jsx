import { render, screen, act } from '@testing-library/react';
import { CartProvider, useCart } from '../../context/CartContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 10000,
  quantity: 1,
  image: 'test.jpg',
  description: 'Test description',
};

const CartConsumer = ({ action }) => {
  const cart = useCart();
  window.__cartAPI = cart;
  const total = cart.getCartTotal();
  const count = cart.getCartItemsCount();
  return (
    <div>
      <span data-testid="cart-count">{count}</span>
      <span data-testid="cart-total">{total}</span>
      <span data-testid="cart-items">{cart.cart.length}</span>
    </div>
  );
};

const renderWithCart = (ui = <CartConsumer />) =>
  render(<CartProvider>{ui}</CartProvider>);

beforeEach(() => {
  localStorage.clear();
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
});

describe('useCart - errores fuera de contexto', () => {
  it('lanza error si se usa fuera de CartProvider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<CartConsumer />)).toThrow(
      'useCart must be used within a CartProvider'
    );
    spy.mockRestore();
  });
});

describe('CartProvider - estado inicial', () => {
  it('inicia con el carrito vacío', () => {
    renderWithCart();
    expect(screen.getByTestId('cart-count').textContent).toBe('0');
    expect(screen.getByTestId('cart-total').textContent).toBe('0');
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });

  it('carga el carrito desde localStorage al montar', () => {
    const savedCart = [{ ...mockProduct, quantity: 2 }];
    localStorage.setItem('nicesurprise_cart', JSON.stringify(savedCart));
    renderWithCart();
    expect(screen.getByTestId('cart-count').textContent).toBe('2');
  });

  it('ignora datos corruptos en localStorage', () => {
    localStorage.setItem('nicesurprise_cart', '{invalid-json}');
    renderWithCart();
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });
});

describe('addToCart', () => {
  it('agrega un producto nuevo al carrito', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    expect(screen.getByTestId('cart-items').textContent).toBe('1');
    expect(screen.getByTestId('cart-count').textContent).toBe('1');
  });

  it('incrementa la cantidad si el producto ya existe', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.addToCart(mockProduct, 2));
    expect(screen.getByTestId('cart-items').textContent).toBe('1');
    expect(screen.getByTestId('cart-count').textContent).toBe('3');
  });

  it('persiste el carrito en localStorage al agregar', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    const stored = JSON.parse(localStorage.getItem('nicesurprise_cart'));
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(mockProduct.id);
  });
});

describe('removeFromCart', () => {
  it('elimina un producto por id', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.removeFromCart(mockProduct.id));
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });

  it('actualiza localStorage al eliminar', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.removeFromCart(mockProduct.id));
    const stored = JSON.parse(localStorage.getItem('nicesurprise_cart'));
    expect(stored).toHaveLength(0);
  });
});

describe('updateQuantity', () => {
  it('actualiza la cantidad de un producto', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.updateQuantity(mockProduct.id, 5));
    expect(screen.getByTestId('cart-count').textContent).toBe('5');
  });

  it('elimina el producto si la cantidad es 0', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.updateQuantity(mockProduct.id, 0));
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });

  it('elimina el producto si la cantidad es negativa', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.updateQuantity(mockProduct.id, -1));
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });
});

describe('clearCart', () => {
  it('vacía el carrito completamente', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.addToCart({ ...mockProduct, id: 2 }));
    act(() => window.__cartAPI.clearCart());
    expect(screen.getByTestId('cart-items').textContent).toBe('0');
  });

  it('elimina nicesurprise_cart de localStorage', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct));
    act(() => window.__cartAPI.clearCart());
    expect(localStorage.getItem('nicesurprise_cart')).toBeNull();
  });
});

describe('getCartTotal', () => {
  it('calcula el total correctamente con múltiples productos', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart({ ...mockProduct, price: 10000 }, 2));
    act(() => window.__cartAPI.addToCart({ ...mockProduct, id: 2, price: 5000 }, 1));
    expect(screen.getByTestId('cart-total').textContent).toBe('25000');
  });
});

describe('getCartItemsCount', () => {
  it('suma la cantidad de todos los items', () => {
    renderWithCart();
    act(() => window.__cartAPI.addToCart(mockProduct, 3));
    act(() => window.__cartAPI.addToCart({ ...mockProduct, id: 2 }, 2));
    expect(screen.getByTestId('cart-count').textContent).toBe('5');
  });
});
