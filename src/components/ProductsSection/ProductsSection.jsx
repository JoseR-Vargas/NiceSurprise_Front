import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './ProductsSection.css';

const ProductsSection = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.1 });
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [showModal, setShowModal] = useState(false);

	const handleProductClick = (product) => {
		setSelectedProduct(product);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedProduct(null);
	};

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
		<>
			<section ref={ref} className="products-section">
				<Container>
					<Row className="mb-5">
						<Col>
							<h2
								className={`text-center products-title ${inView ? 'visible' : 'hidden'}`}
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
								className={`mb-4 product-col ${inView ? 'visible' : 'hidden'}`}
								style={{
									transitionDelay: `${index * 0.15}s`,
								}}
							>
								<ProductCard product={product} onCardClick={handleProductClick} />
							</Col>
						))}
					</Row>
				</Container>
			</section>
			<ProductModal
				product={selectedProduct}
				show={showModal}
				onHide={handleCloseModal}
			/>
		</>
	);
};

export default ProductsSection;

