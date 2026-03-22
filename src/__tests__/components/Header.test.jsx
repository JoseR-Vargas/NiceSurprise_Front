import { render, screen } from '@testing-library/react';
import Header from '../../components/Header/Header';
import { CartProvider } from '../../context/CartContext';

jest.mock('../../components/CartModal/CartModal', () => () => null);

const renderHeader = () =>
  render(
    <CartProvider>
      <Header />
    </CartProvider>
  );

describe('Header', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renderiza el nombre de la marca', () => {
    renderHeader();
    expect(screen.getByText('Nice Surprise')).toBeInTheDocument();
  });

  it('renderiza el enlace "Quiénes Somos"', () => {
    renderHeader();
    expect(screen.getByText('Quiénes Somos')).toBeInTheDocument();
  });

  it('renderiza el enlace "Productos"', () => {
    renderHeader();
    expect(screen.getByText('Productos')).toBeInTheDocument();
  });

  it('el enlace de la marca apunta a #home', () => {
    renderHeader();
    const brand = screen.getByText('Nice Surprise').closest('a');
    expect(brand.getAttribute('href')).toBe('#home');
  });

  it('el enlace "Productos" apunta a #products', () => {
    renderHeader();
    const link = screen.getByText('Productos').closest('a');
    expect(link.getAttribute('href')).toBe('#products');
  });

  it('el enlace "Quiénes Somos" apunta a #about', () => {
    renderHeader();
    const link = screen.getByText('Quiénes Somos').closest('a');
    expect(link.getAttribute('href')).toBe('#about');
  });
});
