import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './ProductModal.css';

const ProductModal = ({ product, show, onHide }) => {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecreaseQuantity = () => {
		if (quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleAddToCart = () => {
		if (product) {
			addToCart(product, quantity);
			toast.success('Producto añadido al carrito', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
		}
	};

	const handleBuyNow = () => {
		if (product) {
			addToCart(product, quantity);
			toast.success('Producto añadido al carrito', {
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
			});
			// Aquí podrías redirigir a una página de checkout
			alert('Producto añadido al carrito. Redirigiendo al checkout...');
		}
	};

	// Resetear cantidad cuando se cierra o cambia el modal
	const handleClose = () => {
		setQuantity(1);
		onHide();
	};

	// Resetear cantidad cuando cambia el producto
	useEffect(() => {
		if (product) {
			setQuantity(1);
		}
	}, [product]);

	if (!product) return null;

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="lg"
			centered
			className="product-modal"
		>
			<Modal.Header closeButton className="product-modal-header">
				<Modal.Title className="product-modal-title">{product.title}</Modal.Title>
			</Modal.Header>
			<Modal.Body className="product-modal-body">
				<Container>
					<Row>
						<Col xs={12} md={6} className="mb-4 mb-md-0">
							<div className="product-modal-image-container">
								{product.image ? (
									<img
										src={product.image}
										alt={product.title}
										className="product-modal-image"
									/>
								) : (
									<div className="product-modal-placeholder">🎁</div>
								)}
							</div>
						</Col>
						<Col xs={12} md={6}>
							<div className="product-modal-details">
								<h3 className="product-modal-price">${product.price}</h3>
								<p className="product-modal-description">{product.description}</p>
								<div className="product-modal-quantity">
									<label className="product-modal-quantity-label">Cantidad:</label>
									<div className="product-modal-quantity-controls">
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={handleDecreaseQuantity}
											className="product-quantity-btn"
											disabled={quantity <= 1}
										>
											-
										</Button>
										<span className="product-quantity-value">{quantity}</span>
										<Button
											variant="outline-secondary"
											size="sm"
											onClick={handleIncreaseQuantity}
											className="product-quantity-btn"
										>
											+
										</Button>
									</div>
								</div>
								<div className="product-modal-features">
									<h4>Características:</h4>
									<ul>
										<li>Arreglo personalizado</li>
										<li>Entrega disponible</li>
										<li>Empaque especial</li>
									</ul>
								</div>
							</div>
						</Col>
					</Row>
				</Container>
			</Modal.Body>
			<Modal.Footer className="product-modal-footer">
				<Button variant="outline-secondary" onClick={handleClose} className="product-modal-close-btn">
					Cerrar
				</Button>
				<Button
					variant="primary"
					onClick={handleAddToCart}
					className="product-modal-add-btn"
				>
					Añadir al carrito
				</Button>
				<Button
					variant="primary"
					onClick={handleBuyNow}
					className="product-modal-buy-btn"
				>
					Comprar ahora
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ProductModal;

