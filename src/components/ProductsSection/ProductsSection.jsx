import { Container, Row, Col } from 'react-bootstrap';
import { useState } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import ProductModal from '../ProductModal/ProductModal';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import arreglo1 from '../../img/arreglo_1.jpeg';
import arreglo2 from '../../img/arreglo_2.jpeg';
import egreso1 from '../../img/egreso_1.jpeg';
import stitch1 from '../../img/stitch_1.jpeg';
import sanValentin from '../../img/san_valentin.jpeg';
import osoAniversario from '../../img/oso_aniversario.jpeg';
import picadaRomantica from '../../img/picada_romantica.jpeg';
import picada1 from '../../img/picada_1.jpeg';
import picadaCompartir from '../../img/picada_compartir.jpeg';
import furiaSorpresa from '../../img/furia_sorpresa.jpeg';
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
			title: 'Amor en Caja San Valentín 💕',
			description: 'Sorpresa especial de San Valentín con peluche kawaii, globo personalizado, mariposa decorativa, chocolates y dulces. ¡Amor en cada detalle!',
			price: 88000,
			image: sanValentin,
			paymentLink: 'https://mpago.la/1jNaJyD',
		},
		{
			id: 7,
			title: 'Aniversario Romántico 💖',
			description: 'Osito tierno con globos de corazón personalizados, números metálicos, chocolates y detalles especiales. Perfecta para celebrar su amor.',
			price: 69800,
			image: osoAniversario,
			paymentLink: 'https://mpago.la/1e5sSuM'
		},
		{
			id: 8,
			title: 'Picada Gourmet Romántica 🧀❤️',
			description: 'Deliciosa selección de quesos, jamones premium, fresas frescas y frutos secos. Ideal para compartir momentos especiales en pareja.',
			price: 38000,
			image: picadaRomantica,
			paymentLink: 'https://mpago.la/1dY45J9'
		},
		{
			id: 9,
			title: 'Tabla Premium Deluxe 🍇🧀',
			description: 'Tabla completa con variedades de quesos, embutidos artesanales, frutas frescas, frutos secos y pepinillos. Perfecta para celebraciones especiales.',
			price: 68000,
			image: picadaCompartir,
			paymentLink: 'https://mpago.la/2pGooLm'
		},
		{
			id: 10,
			title: 'Intensamente Amor ❤️🔥',
			description: 'Furia dice "Te Amo" con chocolates Ferrero Rocher y globos personalizados. Un detalle único que combina humor y amor.',
			price: 53000,
			image: furiaSorpresa,
			paymentLink: 'https://mpago.la/2bUcDr1'
		},
		{
			id: 2,
			title: 'Ternura',
			description: 'Caja sorpresa con peluche adorable, globos festivos, chocolates y dulces especiales. Un detalle lleno de ternura para quien amas.',
			price: 76000,
			image: arreglo1,
		},
		{
			id: 4,
			title: 'Magia Minnie',
			description: 'Caja sorpresa mágica con Minnie Mouse, globos brillantes y dulces especiales para una celebración inolvidable llena de magia.',
			price: 48000,
			image: arreglo2,
		},
		{
			id: 5,
			title: 'Tu Logro',
			description: 'Caja especial para celebrar el logro académico. Incluye peluche con birrete, globo decorado, chocolates Ferrero Rocher y mensaje de felicitación.',
			price: 74800,
			image: egreso1,
			paymentLink: 'https://mpago.la/2cJaApp',
		},
		{
			id: 6,
			title: 'Ohana',
			description: 'Caja encantadora con peluche de Stitch, globos metálicos azules, chocolates Ferrero Rocher y flores de papel. Ohana significa familia.',
			price: 48000,
			image: stitch1,
			paymentLink: 'https://mpago.la/1csgtWr',
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
