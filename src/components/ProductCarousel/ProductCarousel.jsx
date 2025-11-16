import { Carousel } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useScrollAnimation, useParallax } from '../../hooks/useScrollAnimation';
import './ProductCarousel.css';

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
			className={`product-carousel-section ${inView ? 'visible' : 'hidden'}`}
		>
			<Container>
				<Carousel fade indicators={true} controls={true} className="carousel-container">
					{images.map((image, index) => (
						<Carousel.Item key={index}>
							<div
								ref={index === 0 ? elementRef : null}
								className="carousel-item-container"
							>
								<img
									className="d-block w-100 carousel-image"
									src={image}
									alt={`Producto ${index + 1}`}
									style={{
										transform: index === 0 ? `translateY(${offset * 0.3}px)` : 'none',
									}}
								/>
								<div className="carousel-overlay" />
							</div>
						</Carousel.Item>
					))}
				</Carousel>
			</Container>
		</section>
	);
};

export default ProductCarousel;

