import { Container, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const ProductsSection = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.1 });
	// Datos de productos de ejemplo
	const products = [
		{
			id: 1,
			title: 'Arreglo de Cumpleaños Clásico',
			description: 'Hermoso arreglo floral con globos y decoración especial para celebrar tu día especial.',
			price: 45.99,
			image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop',
		},
		{
			id: 2,
			title: 'Detalle Romántico',
			description: 'Caja sorpresa con rosas, chocolates y detalles personalizados para esa persona especial.',
			price: 65.99,
			image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&h=400&fit=crop',
		},
		{
			id: 3,
			title: 'Celebración Premium',
			description: 'Paquete completo con arreglo floral, globos, decoración y detalles premium para una celebración inolvidable.',
			price: 89.99,
			image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=400&h=400&fit=crop',
		},
	];

	return (
		<section
			ref={ref}
			className="py-5"
			style={{
				background: 'rgba(255, 255, 255, 0.5)',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				position: 'relative',
			}}
		>
			<Container>
				<Row className="mb-5">
					<Col>
						<h2
							className="text-center"
							style={{
								background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
								WebkitBackgroundClip: 'text',
								WebkitTextFillColor: 'transparent',
								backgroundClip: 'text',
								fontSize: '2.5rem',
								fontWeight: 'bold',
								letterSpacing: '-1px',
								opacity: inView ? 1 : 0,
								transform: inView ? 'translateY(0)' : 'translateY(30px)',
								transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
							}}
						>
							Nuestros Productos
						</h2>
					</Col>
				</Row>
				<Row>
					{products.map((product, index) => (
						<Col
							key={product.id}
							xs={12}
							md={6}
							lg={4}
							className="mb-4"
							style={{
								opacity: inView ? 1 : 0,
								transform: inView ? 'translateY(0)' : 'translateY(50px)',
								transition: `opacity 0.8s ease-out ${index * 0.15}s, transform 0.8s ease-out ${index * 0.15}s`,
							}}
						>
							<ProductCard product={product} />
						</Col>
					))}
				</Row>
			</Container>
		</section>
	);
};

export default ProductsSection;

