import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import picada1 from '../../img/picada_1.jpeg';
import arreglo1 from '../../img/arreglo_1.jpeg';
import picada2 from '../../img/picada_2.jpeg';
import arreglo2 from '../../img/arreglo_2.jpeg';
import egreso1 from '../../img/egreso_1.jpeg';
import stitch1 from '../../img/stitch_1.jpeg';
import ositoEgresado from '../../img/osito_egresado.jpeg';
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
			description: 'Picada artesanal en forma de árbol navideño con quesos premium, embutidos, uvas, aceitunas y crackers. Decorado con luces y estrella dorada.',
			price: 38800,
			image: picada1,
		},
		{
			id: 2,
			title: 'Gatita Tierna 💕',
			description: 'Caja sorpresa con peluche adorable, globos festivos, chocolates y dulces especiales. Un detalle lleno de ternura para quien amas.',
			price: 76000,
			image: arreglo1,
		},
		{
			id: 3,
			title: 'Picada Navideña Premium 🎅🎁',
			description: 'Picada gourmet en forma de árbol con quesos artesanales, embutidos premium, frutos secos y aceitunas. Ideal para compartir.',
			price: 36800,
			image: picada2,
		},
		{
			id: 4,
			title: 'Minnie Magic Box ✨',
			description: 'Caja sorpresa mágica con Minnie Mouse, globos brillantes y dulces especiales para una celebración inolvidable llena de magia.',
			price: 36800,
			image: arreglo2,
		},
		{
			id: 5,
			title: '¡Feliz Egreso! 🎓',
			description: 'Caja especial para celebrar el logro académico. Incluye peluche con birrete, globo decorado, chocolates Ferrero Rocher y mensaje de felicitación.',
			price: 64800,
			image: egreso1,
			paymentLink: 'https://mpago.la/2cJaApp',
		},
		{
			id: 6,
			title: 'Ohana Stitch Box 💙✨',
			description: 'Caja encantadora con peluche de Stitch, globos metálicos azules, chocolates Ferrero Rocher y flores de papel. Ohana significa familia.',
			price: 38000,
			image: stitch1,
			paymentLink: 'https://mpago.la/1csgtWr',
		},
		{
			id: 7,
			title: 'Osito Graduado 🎓🐻',
			description: 'Arreglo especial con adorable osito de graduación, globos dorados en forma de corazón, chocolates y dulces premium. ¡Celebra el éxito con estilo!',
			price: 34800,
			image: ositoEgresado,
			paymentLink: 'https://mpago.la/1jvWb2e',
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

