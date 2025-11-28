import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import picada1 from '../../img/picada_1.jpeg';
import arreglo1 from '../../img/arreglo_1.jpeg';
import picada2 from '../../img/picada_2.jpeg';
import arreglo2 from '../../img/arreglo_2.jpeg';
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
			title: 'PicArbolito Mágico 🎄✨',
			description: 'Deliciosa picada artesanal en forma de árbol navideño. Incluye quesos premium, embutidos seleccionados, uvas frescas, aceitunas y crackers. Decorado con luces cálidas y una estrella dorada. Perfecto para celebrar en grande con estilo y sabor.',
			price: 38800,
			image: picada1,
		},
		{
			id: 2,
			title: 'Gatita Tierna 💕',
			description: 'Caja sorpresa adorable con peluche, globos festivos, chocolates y dulces especiales. Un detalle perfecto lleno de ternura y amor para esa persona especial que ilumina tu vida.',
			price: 76000,
			image: arreglo1,
		},
		{
			id: 3,
			title: 'Picada Navideña Premium 🎅🎁',
			description: 'Espectacular picada navideña en forma de árbol con los mejores ingredientes gourmet. Quesos artesanales, embutidos premium, frutos secos, uvas y aceitunas seleccionadas. Presentación elegante con estrella de queso y crackers. Ideal para compartir momentos especiales con los que más quieres.',
			price: 36800,
			image: picada2,
		},
		{
			id: 4,
			title: 'Minnie Magic Box ✨',
			description: 'Caja sorpresa mágica con Minnie Mouse, globos brillantes, dulces y detalles especiales para una celebración inolvidable llena de magia.',
			price: 36800,
			image: arreglo2,
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

