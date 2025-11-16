import { Card, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onCardClick }) => {
	const handleAddToCart = (e) => {
		e.stopPropagation();
		e.preventDefault();
		// Abrir el modal cuando se hace clic en el botón
		if (onCardClick) {
			onCardClick(product);
		}
	};

	const handleCardClick = (e) => {
		// No abrir modal si se hace clic en el botón (ya se maneja en handleAddToCart)
		if (e.target.closest('.product-button')) {
			return;
		}
		if (onCardClick) {
			onCardClick(product);
		}
	};

	return (
		<Card className="h-100 product-card" onClick={handleCardClick}>
			<div className="product-image-container">
				{product.image ? (
					<Card.Img
						variant="top"
						src={product.image}
						alt={product.title}
						className="product-image"
					/>
				) : (
					<div className="product-placeholder">🎁</div>
				)}
				<div className="product-overlay" />
			</div>
			<Card.Body className="d-flex flex-column product-card-body">
				<Card.Title className="product-title">{product.title}</Card.Title>
				<Card.Text className="product-description">{product.description}</Card.Text>
				<div className="d-flex justify-content-between align-items-center">
					<span className="product-price">${product.price}</span>
					<Button
						onClick={handleAddToCart}
						className="product-button"
						onMouseDown={(e) => e.stopPropagation()}
					>
						<span>Añadir al carrito</span>
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;

