import { render, screen } from '@testing-library/react';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

describe('WhatsAppButton', () => {
  it('renderiza el enlace de WhatsApp', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link).toBeInTheDocument();
  });

  it('el href apunta al número correcto de WhatsApp', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link.href).toContain('wa.me/5493516600019');
  });

  it('incluye el mensaje de consulta en la URL', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link.href).toContain('text=');
  });

  it('abre en nueva pestaña con rel seguro', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /whatsapp/i });
    expect(link.target).toBe('_blank');
    expect(link.rel).toContain('noopener');
    expect(link.rel).toContain('noreferrer');
  });

  it('tiene aria-label de accesibilidad', () => {
    render(<WhatsAppButton />);
    const link = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(link).toBeInTheDocument();
  });

  it('contiene el ícono SVG de WhatsApp', () => {
    const { container } = render(<WhatsAppButton />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });
});
