import { MERCADOPAGO_LINK } from '../../constants/mercadopago';

describe('MERCADOPAGO_LINK', () => {
  it('debe ser una cadena no vacía', () => {
    expect(typeof MERCADOPAGO_LINK).toBe('string');
    expect(MERCADOPAGO_LINK.length).toBeGreaterThan(0);
  });

  it('debe ser una URL válida de Mercado Pago', () => {
    expect(MERCADOPAGO_LINK).toMatch(/^https:\/\/mpago\.la\//);
  });
});
