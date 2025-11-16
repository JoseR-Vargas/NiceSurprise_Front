import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';
import './CartModal.css';

const CartModal = ({ show, onHide }) => {
	const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

	const handleIncreaseQuantity = (product) => {
		updateQuantity(product.id, product.quantity + 1);
	};

	const handleDecreaseQuantity = (product) => {
		if (product.quantity > 1) {
			updateQuantity(product.id, product.quantity - 1);
		} else {
			removeFromCart(product.id);
		}
	};

	const handleRemove = (productId) => {
		removeFromCart(productId);
	};

	const cartTotal = getCartTotal();

	return (
		<Modal
			show={show}
			onHide={onHide}
			size="lg"
			centered
			className="cart-modal"
		>
			<Modal.Header closeButton className="cart-modal-header">
				<Modal.Title className="cart-modal-title">Mi Carrito</Modal.Title>
			</Modal.Header>
			<Modal.Body className="cart-modal-body">
				{cart.length === 0 ? (
					<div className="cart-empty">
						<div className="cart-empty-icon">🛒</div>
						<p className="cart-empty-text">Tu carrito está vacío</p>
						<Button
							variant="primary"
							onClick={onHide}
							className="cart-empty-btn"
						>
							Seguir comprando
						</Button>
					</div>
				) : (
					<Container fluid>
						<Row className="cart-items">
							{cart.map((item) => (
								<Col xs={12} key={item.id} className="cart-item-col mb-3">
									<div className="cart-item">
										<div className="cart-item-image-container">
											{item.image ? (
												<img
													src={item.image}
													alt={item.title}
													className="cart-item-image"
												/>
											) : (
												<div className="cart-item-placeholder">🎁</div>
											)}
										</div>
										<div className="cart-item-details">
											<h5 className="cart-item-title">{item.title}</h5>
											<p className="cart-item-description">{item.description}</p>
											<div className="cart-item-price">${item.price}</div>
										</div>
										<div className="cart-item-controls">
											<div className="cart-item-quantity">
												<Button
													variant="outline-secondary"
													size="sm"
													onClick={() => handleDecreaseQuantity(item)}
													className="cart-quantity-btn"
												>
													-
												</Button>
												<span className="cart-quantity-value">{item.quantity}</span>
												<Button
													variant="outline-secondary"
													size="sm"
													onClick={() => handleIncreaseQuantity(item)}
													className="cart-quantity-btn"
												>
													+
												</Button>
											</div>
											<div className="cart-item-subtotal">
												${(item.price * item.quantity).toFixed(2)}
											</div>
											<Button
												variant="outline-danger"
												size="sm"
												onClick={() => handleRemove(item.id)}
												className="cart-remove-btn"
											>
												🗑️
											</Button>
										</div>
									</div>
								</Col>
							))}
						</Row>
						<Row className="cart-total-row">
							<Col xs={12}>
								<div className="cart-total">
									<span className="cart-total-label">Total:</span>
									<span className="cart-total-value">${cartTotal.toFixed(2)}</span>
								</div>
							</Col>
						</Row>
					</Container>
				)}
			</Modal.Body>
			{cart.length > 0 && (
				<Modal.Footer className="cart-modal-footer">
					<Button
						variant="outline-secondary"
						onClick={onHide}
						className="cart-modal-close-btn"
					>
						Seguir comprando
					</Button>
					<Button
						variant="primary"
						onClick={() => {
							alert('Redirigiendo al checkout...');
							onHide();
						}}
						className="cart-modal-checkout-btn"
					>
						Finalizar compra
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

export default CartModal;

