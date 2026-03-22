import { renderHook } from '@testing-library/react';
import { useScrollAnimation, useParallax } from '../../hooks/useScrollAnimation';

jest.mock('react-intersection-observer', () => ({
  useInView: jest.fn(() => ({ ref: jest.fn(), inView: true })),
}));

describe('useScrollAnimation', () => {
  it('retorna ref e inView', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current).toHaveProperty('ref');
    expect(result.current).toHaveProperty('inView');
  });

  it('inView es true por defecto (mock)', () => {
    const { result } = renderHook(() => useScrollAnimation());
    expect(result.current.inView).toBe(true);
  });

  it('acepta opciones de threshold y triggerOnce', () => {
    const { useInView } = require('react-intersection-observer');
    renderHook(() => useScrollAnimation({ threshold: 0.5, triggerOnce: false }));
    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({ threshold: 0.5, triggerOnce: false })
    );
  });

  it('usa threshold=0.1 y triggerOnce=true por defecto', () => {
    const { useInView } = require('react-intersection-observer');
    renderHook(() => useScrollAnimation());
    expect(useInView).toHaveBeenCalledWith(
      expect.objectContaining({ threshold: 0.1, triggerOnce: true })
    );
  });
});

describe('useParallax', () => {
  let addEventListenerSpy;
  let removeEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = jest.spyOn(window, 'addEventListener');
    removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('retorna elementRef y offset', () => {
    const { result } = renderHook(() => useParallax());
    expect(result.current).toHaveProperty('elementRef');
    expect(result.current).toHaveProperty('offset');
  });

  it('offset inicial es 0', () => {
    const { result } = renderHook(() => useParallax());
    expect(result.current.offset).toBe(0);
  });

  it('registra listener de scroll al montar', () => {
    renderHook(() => useParallax());
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function),
      { passive: true }
    );
  });

  it('elimina listener de scroll al desmontar', () => {
    const { unmount } = renderHook(() => useParallax());
    unmount();
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });
});
