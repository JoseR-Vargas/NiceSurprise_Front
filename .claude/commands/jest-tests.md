# Skill: Cobertura de tests Jest

Genera tests unitarios con Jest para los archivos del proyecto que aún no tienen cobertura, luego los ejecuta uno por uno.

## Instrucciones

1. **Descubrir archivos sin tests**
   - Busca todos los archivos `.jsx` y `.js` bajo `src/` (excluyendo `src/__tests__/`, `*.css.js`, archivos de configuración y `main.jsx`).
   - Para cada archivo fuente, comprueba si existe un archivo de test correspondiente en `src/__tests__/` (misma ruta relativa, con extensión `.test.jsx` o `.test.js`).
   - Lista los archivos que aún no tienen test.

2. **Generar tests** para cada archivo sin cobertura
   - Lee el archivo fuente completo antes de escribir el test.
   - Escribe el test en `src/__tests__/<ruta-relativa>/<Nombre>.test.jsx` (o `.test.js` para hooks y utils).
   - Estrategia según tipo de archivo:
     - **Constantes** (`constants/`): verifica tipos, formato y valores esperados.
     - **Hooks** (`hooks/`): usa `renderHook` de `@testing-library/react`; mockea dependencias externas (e.g. `react-intersection-observer`, `window.addEventListener`).
     - **Context** (`context/`): monta el Provider con un componente consumidor; testea cada función expuesta.
     - **Componentes** (`components/`): usa `render` + `screen`; testea renderizado, props, interacciones con `userEvent` y accesibilidad.
   - Reglas de mocks:
     - Mockea CSS imports con `identity-obj-proxy` (ya configurado en `jest.config.cjs`).
     - Mockea imports de imágenes con `fileMock.cjs` (ya configurado).
     - Mockea `canvas-confetti` (ya configurado en `__mocks__/canvas-confetti.cjs`).
     - Mockea sub-componentes pesados o que requieran contexto propio con `jest.mock(...)`.
     - Para componentes que usen `useCart`, envuélvelos en `<CartProvider>`.

3. **Ejecutar cada suite de forma independiente**
   - Ejecuta: `npx jest --config jest.config.cjs --testPathPatterns="<archivo>" --no-coverage`
   - Si un test falla: analiza el error, corrige el test (NO el código fuente) y re-ejecuta.
   - Continúa con el siguiente archivo solo cuando el actual pase.

4. **Ejecutar suite completa al finalizar**
   - `npm test -- --no-coverage`
   - Reporta el resumen: suites pasadas, tests totales, tests fallidos.

## Comandos de referencia

```bash
# Ejecutar un test específico
npx jest --config jest.config.cjs --testPathPatterns="NombreComponente" --no-coverage

# Ejecutar todos los tests
npm test -- --no-coverage

# Ver cobertura completa
npm run test:coverage

# Modo watch durante desarrollo
npm run test:watch
```

## Convenciones del proyecto

- Idioma de los tests: **español** (describe/it en español, igual que el producto).
- Los archivos de test van en `src/__tests__/<tipo>/<Nombre>.test.jsx`.
- El `CartProvider` con `localStorage.clear()` en `beforeEach` es el patrón para aislar tests del contexto del carrito.
- `window.__cartAPI = cart` es el patrón usado en `CartContext.test.jsx` para exponer la API del contexto al test sin `fireEvent`.
