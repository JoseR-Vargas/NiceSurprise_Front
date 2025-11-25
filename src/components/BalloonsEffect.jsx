import { useEffect, useState } from 'react';
import './BalloonsEffect.css';

const BalloonsEffect = () => {
	const [balloons, setBalloons] = useState([]);

	useEffect(() => {
		const duration = 2000; // 2 segundos
		const colors = ['#db1658', '#e72c6a', '#f195b4', '#f9cad8', '#fbd9e4', '#ffffff', '#ff6b9d', '#ff8fb3'];
		const newBalloons = [];

		// Crear globos cada 200ms durante 2 segundos
		const interval = setInterval(() => {
			const balloon = {
				id: Math.random(),
				left: Math.random() * 100, // Posición horizontal aleatoria
				color: colors[Math.floor(Math.random() * colors.length)],
				delay: Math.random() * 0.5, // Delay aleatorio para variación
				size: 30 + Math.random() * 40, // Tamaño aleatorio entre 30-70px
			};
			newBalloons.push(balloon);
			setBalloons([...newBalloons]);
		}, 200);

		// Limpiar después de 2 segundos
		setTimeout(() => {
			clearInterval(interval);
			// Remover globos gradualmente
			setTimeout(() => {
				setBalloons([]);
			}, 3000); // Dar tiempo para que los globos suban y desaparezcan
		}, duration);

		return () => {
			clearInterval(interval);
			setBalloons([]);
		};
	}, []);

	return (
		<div className="balloons-container">
			{balloons.map((balloon) => (
				<div
					key={balloon.id}
					className="balloon"
					style={{
						left: `${balloon.left}%`,
						backgroundColor: balloon.color,
						width: `${balloon.size}px`,
						height: `${balloon.size * 1.2}px`,
						animationDelay: `${balloon.delay}s`,
					}}
				>
					<div className="balloon-string"></div>
				</div>
			))}
		</div>
	);
};

export default BalloonsEffect;

