import { Carousel, Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import picada1 from '../../img/picada_1.jpeg';
import arreglo1 from '../../img/arreglo_1.jpeg';
import picada2 from '../../img/picada_2.jpeg';
import './ProductCarousel.css';

const ProductCarousel = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.2 });
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

	// Datos de productos
	const products = [
		{
			id: 1,
			title: 'Arreglo de Cumpleaños Clásico',
			description: 'Hermoso arreglo floral con globos y decoración especial para celebrar tu día especial.',
			price: 45.99,
			image: picada1,
		},
		{
			id: 2,
			title: 'Detalle Romántico',
			description: 'Caja sorpresa con rosas, chocolates y detalles personalizados para esa persona especial.',
			price: 65.99,
			image: arreglo1,
		},
		{
			id: 3,
			title: 'Celebración Premium',
			description: 'Paquete completo con arreglo floral, globos, decoración y detalles premium para una celebración inolvidable.',
			price: 89.99,
			image: picada2,
		},
	];

	// Dividir productos en grupos para el carrusel (1 por slide)
	const productGroups = products.map((product) => [product]);

	return (
		<>
			<section
				ref={ref}
				className={`product-carousel-section ${inView ? 'visible' : 'hidden'}`}
			>
				<Container>
					<Carousel fade indicators={true} controls={true} className="carousel-container">
						{productGroups.map((group, groupIndex) => (
							<Carousel.Item key={groupIndex}>
								<Row className="justify-content-center">
									{group.map((product) => (
										<Col key={product.id} xs={12} md={8} lg={6} xl={5}>
											<ProductCard
												product={product}
												onCardClick={handleProductClick}
											/>
										</Col>
									))}
								</Row>
							</Carousel.Item>
						))}
					</Carousel>
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

export default ProductCarousel;

