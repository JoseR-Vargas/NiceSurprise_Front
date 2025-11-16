import { Carousel } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useScrollAnimation, useParallax } from '../hooks/useScrollAnimation';

const ProductCarousel = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
	const { elementRef, offset } = useParallax(0.2);

	// Fotos placeholder - puedes reemplazarlas con imágenes reales
	const images = [
		'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800&h=600&fit=crop',
		'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=800&h=600&fit=crop',
	];

	return (
		<section
			ref={ref}
			className="py-5"
			style={{
				position: 'relative',
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(50px)',
				transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
			}}
		>
			<Container>
				<Carousel
					fade
					indicators={true}
					controls={true}
					style={{
						position: 'relative',
					}}
				>
					{images.map((image, index) => (
						<Carousel.Item key={index}>
							<div
								ref={index === 0 ? elementRef : null}
								style={{
									height: '450px',
									overflow: 'hidden',
									borderRadius: '25px',
									position: 'relative',
									boxShadow: '0 20px 60px rgba(219, 22, 88, 0.2)',
									background: 'linear-gradient(135deg, #f9cad8 0%, #f6b5ca 100%)',
								}}
							>
								<img
									className="d-block w-100"
									src={image}
									alt={`Producto ${index + 1}`}
									style={{
										objectFit: 'cover',
										height: '100%',
										width: '100%',
										transition: 'transform 0.5s ease',
										transform: index === 0 ? `translateY(${offset * 0.3}px)` : 'none',
									}}
								/>
								<div
									style={{
										position: 'absolute',
										top: 0,
										left: 0,
										right: 0,
										bottom: 0,
										background:
											'linear-gradient(180deg, rgba(219, 22, 88, 0.1) 0%, transparent 50%, rgba(219, 22, 88, 0.1) 100%)',
										pointerEvents: 'none',
									}}
								/>
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	);
};

export default ProductCarousel;

