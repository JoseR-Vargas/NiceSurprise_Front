import { useEffect } from 'react';
import confetti from 'canvas-confetti';

const ConfettiEffect = () => {
	useEffect(() => {
		const duration = 2000; // 2 segundos
		const animationEnd = Date.now() + duration;
		const defaults = { 
			startVelocity: 30, 
			spread: 360, 
			ticks: 60, 
			zIndex: 9999,
			gravity: 0.8,
			decay: 0.94,
		};

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			// Lanzar confetti desde el centro superior (header/hero)
			confetti({
				...defaults,
				particleCount,
				origin: { x: 0.5, y: 0.1 }, // Centro superior
				angle: randomInRange(55, 125), // Ángulo hacia abajo
				colors: ['#db1658', '#e72c6a', '#f195b4', '#f9cad8', '#fbd9e4', '#ffffff'],
			});

			// Lanzar confetti desde el centro superior con diferentes ángulos
			confetti({
				...defaults,
				particleCount: particleCount * 0.8,
				origin: { x: 0.3, y: 0.1 }, // Izquierda superior
				angle: randomInRange(60, 120),
				colors: ['#db1658', '#e72c6a', '#f195b4', '#f9cad8', '#fbd9e4', '#ffffff'],
			});

			confetti({
				...defaults,
				particleCount: particleCount * 0.8,
				origin: { x: 0.7, y: 0.1 }, // Derecha superior
				angle: randomInRange(60, 120),
				colors: ['#db1658', '#e72c6a', '#f195b4', '#f9cad8', '#fbd9e4', '#ffffff'],
			});
		}, 250);

		// Limpiar después de 2 segundos
		setTimeout(() => {
			clearInterval(interval);
			confetti.reset();
		}, duration);

		return () => {
			clearInterval(interval);
			confetti.reset();
		};
	}, []);

	return null;
};

export default ConfettiEffect;

