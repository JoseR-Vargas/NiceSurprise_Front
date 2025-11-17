import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './CartModal.css';

const CartModal = ({ show, onHide }) => {
	const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();
	const [showCheckout, setShowCheckout] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [formData, setFormData] = useState({
		nombre: '',
		apellido: '',
		telefono: '',
		delivery: false,
		retirar: false,
		calle: '',
		numero: '',
		esquina: '',
		zona: ''
	});
	const [errors, setErrors] = useState({});

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

	// Detectar si es mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	const validatePhone = (phone) => {
		const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
		const phoneRegex = /^(\+?54)?9?(\d{2})(\d{8,10})$/;
		const phoneRegexWithZero = /^0\d{2,3}\d{8,10}$/;
		return phoneRegex.test(cleanedPhone) || phoneRegexWithZero.test(cleanedPhone);
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		
		if (type === 'checkbox' && (name === 'delivery' || name === 'retirar')) {
			setFormData(prev => ({
				...prev,
				delivery: name === 'delivery' ? checked : false,
				retirar: name === 'retirar' ? checked : false,
				calle: '',
				numero: '',
				esquina: '',
				zona: ''
			}));
		} else {
			setFormData(prev => ({
				...prev,
				[name]: type === 'checkbox' ? checked : value
			}));
		}
		
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.nombre.trim()) {
			newErrors.nombre = 'El nombre es obligatorio';
		}

		if (!formData.apellido.trim()) {
			newErrors.apellido = 'El apellido es obligatorio';
		}

		if (!formData.telefono.trim()) {
			newErrors.telefono = 'El teléfono es obligatorio';
		} else if (!validatePhone(formData.telefono)) {
			newErrors.telefono = 'Formato de teléfono inválido. Use formato argentino';
		}

		if (formData.delivery) {
			if (!formData.calle.trim()) {
				newErrors.calle = 'La calle es obligatoria para delivery';
			}
			if (!formData.numero.trim()) {
				newErrors.numero = 'El número es obligatorio para delivery';
			}
			if (!formData.esquina.trim()) {
				newErrors.esquina = 'La esquina de referencia es obligatoria para delivery';
			}
			if (!formData.zona.trim()) {
				newErrors.zona = 'La zona es obligatoria para delivery';
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handlePayment = (paymentMethod) => {
		if (!validateForm()) {
			return;
		}

		console.log('Método de pago:', paymentMethod);
		console.log('Datos del formulario:', formData);
		console.log('Carrito:', cart);
		
		if (isMobile) {
			toast.success('Pedido procesado correctamente', {
				position: 'bottom-center',
				autoClose: 2000,
			});
			setTimeout(() => {
				handleClose();
			}, 2000);
		} else {
			toast.success('Pedido procesado correctamente', {
				position: 'top-right',
				autoClose: 2000,
			});
			setTimeout(() => {
				handleClose();
			}, 2000);
		}
	};

	const handleClose = () => {
		setShowCheckout(false);
		setFormData({
			nombre: '',
			apellido: '',
			telefono: '',
			delivery: false,
			retirar: false,
			calle: '',
			numero: '',
			esquina: '',
			zona: ''
		});
		setErrors({});
		onHide();
	};

	const handleBackToCart = () => {
		setShowCheckout(false);
		setFormData({
			nombre: '',
			apellido: '',
			telefono: '',
			delivery: false,
			retirar: false,
			calle: '',
			numero: '',
			esquina: '',
			zona: ''
		});
		setErrors({});
	};

	const cartTotal = getCartTotal();

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="lg"
			centered
			className="cart-modal"
		>
			<Modal.Header closeButton className="cart-modal-header">
				<Modal.Title className="cart-modal-title">
					{showCheckout ? 'Completar Compra' : 'Mi Carrito'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="cart-modal-body">
				{!showCheckout ? (
					cart.length === 0 ? (
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
					)
				) : (
					<Container className="checkout-form-container">
						<Form>
							<Row>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Nombre <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="nombre"
											value={formData.nombre}
											onChange={handleInputChange}
											isInvalid={!!errors.nombre}
											required
										/>
										<Form.Control.Feedback type="invalid">
											{errors.nombre}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
								<Col xs={12} md={6}>
									<Form.Group className="mb-3">
										<Form.Label>Apellido <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="apellido"
											value={formData.apellido}
											onChange={handleInputChange}
											isInvalid={!!errors.apellido}
											required
										/>
										<Form.Control.Feedback type="invalid">
											{errors.apellido}
										</Form.Control.Feedback>
									</Form.Group>
								</Col>
							</Row>

							<Form.Group className="mb-3">
								<Form.Label>Teléfono <span className="text-danger">*</span></Form.Label>
								<Form.Control
									type="tel"
									name="telefono"
									value={formData.telefono}
									onChange={handleInputChange}
									placeholder="Ej: +5491123456789 o 01112345678"
									isInvalid={!!errors.telefono}
									required
								/>
								<Form.Control.Feedback type="invalid">
									{errors.telefono}
								</Form.Control.Feedback>
								<Form.Text className="text-muted">
									Formato argentino: +54 9 11 1234-5678 o 011 1234-5678
								</Form.Text>
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Check
									type="checkbox"
									name="delivery"
									label="Necesito delivery"
									checked={formData.delivery}
									onChange={handleInputChange}
									className="checkout-delivery-checkbox"
								/>
								<Form.Check
									type="checkbox"
									name="retirar"
									label="Pasar a retirar"
									checked={formData.retirar}
									onChange={handleInputChange}
									className="checkout-delivery-checkbox"
								/>
							</Form.Group>

							{formData.delivery && (
								<>
									<Row>
										<Col xs={12} md={8}>
											<Form.Group className="mb-3">
												<Form.Label>Calle <span className="text-danger">*</span></Form.Label>
												<Form.Control
													type="text"
													name="calle"
													value={formData.calle}
													onChange={handleInputChange}
													isInvalid={!!errors.calle}
													required
												/>
												<Form.Control.Feedback type="invalid">
													{errors.calle}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
										<Col xs={12} md={4}>
											<Form.Group className="mb-3">
												<Form.Label>Número <span className="text-danger">*</span></Form.Label>
												<Form.Control
													type="text"
													name="numero"
													value={formData.numero}
													onChange={handleInputChange}
													isInvalid={!!errors.numero}
													required
												/>
												<Form.Control.Feedback type="invalid">
													{errors.numero}
												</Form.Control.Feedback>
											</Form.Group>
										</Col>
									</Row>
									<Form.Group className="mb-3">
										<Form.Label>Esquina de referencia <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="esquina"
											value={formData.esquina}
											onChange={handleInputChange}
											placeholder="Ej: Av. Corrientes y Av. Santa Fe"
											isInvalid={!!errors.esquina}
											required
										/>
										<Form.Control.Feedback type="invalid">
											{errors.esquina}
										</Form.Control.Feedback>
									</Form.Group>
									<Form.Group className="mb-3">
										<Form.Label>Zona <span className="text-danger">*</span></Form.Label>
										<Form.Control
											type="text"
											name="zona"
											value={formData.zona}
											onChange={handleInputChange}
											placeholder="Ej: Palermo, Recoleta, etc."
											isInvalid={!!errors.zona}
											required
										/>
										<Form.Control.Feedback type="invalid">
											{errors.zona}
										</Form.Control.Feedback>
									</Form.Group>
								</>
							)}

							{formData.retirar && (
								<div className="checkout-retirar-message">
									<p>Comunícate con nosotros y te damos la dirección</p>
								</div>
							)}

							<div className="checkout-payment-buttons">
								<Button
									variant="success"
									className="checkout-payment-btn"
									onClick={() => handlePayment('transferencia')}
								>
									Paga con Transferencia
								</Button>
								<Button
									variant="primary"
									className="checkout-payment-btn"
									onClick={() => handlePayment('mercadopago')}
								>
									Mercadopago
								</Button>
							</div>
						</Form>
					</Container>
				)}
			</Modal.Body>
			{!showCheckout && cart.length > 0 && (
				<Modal.Footer className="cart-modal-footer">
					<Button
						variant="outline-secondary"
						onClick={handleClose}
						className="cart-modal-close-btn"
					>
						Seguir comprando
					</Button>
					<Button
						variant="primary"
						onClick={() => setShowCheckout(true)}
						className="cart-modal-checkout-btn"
					>
						Finalizar compra
					</Button>
				</Modal.Footer>
			)}
			{showCheckout && (
				<Modal.Footer className="cart-modal-footer">
					<Button
						variant="outline-secondary"
						onClick={handleBackToCart}
						className="cart-modal-close-btn"
					>
						Volver
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

export default CartModal;

