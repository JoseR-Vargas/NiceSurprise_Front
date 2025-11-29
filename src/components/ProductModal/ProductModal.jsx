import { Modal, Button, Container, Row, Col, Form } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import TransferModal from '../TransferModal/TransferModal';
import MercadoPagoModal from '../MercadoPagoModal/MercadoPagoModal';
import './ProductModal.css';

const ProductModal = ({ product, show, onHide }) => {
	const { addToCart } = useCart();
	const [quantity, setQuantity] = useState(1);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [isMobile, setIsMobile] = useState(false);
	const [showCheckout, setShowCheckout] = useState(false);
	const [showTransferModal, setShowTransferModal] = useState(false);
	const [showMercadoPagoModal, setShowMercadoPagoModal] = useState(false);
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
			if (isMobile) {
				setShowSuccessMessage(true);
				setTimeout(() => {
					setShowSuccessMessage(false);
					handleClose();
				}, 2000);
			} else {
				toast.success('Producto añadido al carrito', {
					position: 'top-right',
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
				});
				// Cerrar el modal después de que el toast desaparezca
				setTimeout(() => {
					handleClose();
				}, 2000);
			}
		}
	};

	const handleBuyNow = () => {
		if (product) {
			addToCart(product, quantity);
			setShowCheckout(true);
		}
	};

	const validatePhone = (phone) => {
		// Formato argentino: acepta varios formatos comunes
		// Ejemplos válidos: +5491123456789, 5491123456789, 01112345678, 1123456789, +54 9 11 1234-5678
		const cleanedPhone = phone.replace(/[\s\-\(\)]/g, '');
		// Patrón: opcional +54, opcional 9, código de área (2 dígitos), número (8-10 dígitos)
		const phoneRegex = /^(\+?54)?9?(\d{2})(\d{8,10})$/;
		// También acepta formato con 0 inicial: 01112345678
		const phoneRegexWithZero = /^0\d{2,3}\d{8,10}$/;
		return phoneRegex.test(cleanedPhone) || phoneRegexWithZero.test(cleanedPhone);
	};

	const handleInputChange = (e) => {
		const { name, value, type, checked } = e.target;
		
		// Si es un checkbox de delivery o retirar, hacerlos mutuamente excluyentes
		if (type === 'checkbox' && (name === 'delivery' || name === 'retirar')) {
			setFormData(prev => ({
				...prev,
				delivery: name === 'delivery' ? checked : false,
				retirar: name === 'retirar' ? checked : false,
				// Limpiar dirección si se cambia la opción
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
		
		// Limpiar error del campo cuando el usuario empiece a escribir
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

		// Aquí puedes procesar el pago
		console.log('Método de pago:', paymentMethod);
		console.log('Datos del formulario:', formData);
		
		// Si es MercadoPago, abrir el modal de Mercado Pago
		if (paymentMethod === 'mercadopago') {
			setShowMercadoPagoModal(true);
			return;
		}
		
		// Para transferencia, mostrar modal con datos bancarios
		if (paymentMethod === 'transferencia') {
			setShowTransferModal(true);
			return;
		}
	};

	const handleBackToProduct = () => {
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

	// Resetear cantidad cuando se cierra o cambia el modal
	const handleClose = () => {
		// No cerrar si hay modales de pago abiertos
		if (showTransferModal || showMercadoPagoModal) {
			return;
		}
		setShowTransferModal(false);
		setShowMercadoPagoModal(false);
		setQuantity(1);
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

	// Detectar si es mobile
	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth <= 768);
		};
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	// Resetear cantidad cuando cambia el producto
	useEffect(() => {
		if (product) {
			setQuantity(1);
			setShowSuccessMessage(false);
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
			setShowMercadoPagoModal(false);
			setShowTransferModal(false);
			setErrors({});
		}
	}, [product]);

	if (!product) return null;

	return (
		<>
		<Modal
			show={show && !showTransferModal && !showMercadoPagoModal}
			onHide={handleClose}
			size="lg"
			centered
			className="product-modal"
		>
			<Modal.Header closeButton className="product-modal-header">
				<Modal.Title className="product-modal-title">
					{showCheckout ? 'Completar Compra' : product.title}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="product-modal-body">
				{showSuccessMessage && isMobile && (
					<div className="product-modal-success-message">
						Producto añadido al carrito
					</div>
				)}
				
				{!showCheckout ? (
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
									{/* Controles de cantidad - Temporalmente deshabilitados */}
									{/* <div className="product-modal-quantity">
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
									</div> */}
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
			<Modal.Footer className="product-modal-footer">
				{showCheckout ? (
					<Button variant="outline-secondary" onClick={handleBackToProduct} className="product-modal-close-btn">
						Volver
					</Button>
				) : (
					<>
						<Button variant="outline-secondary" onClick={handleClose} className="product-modal-close-btn">
							Cerrar
						</Button>
						{/* Botón Añadir al carrito - Temporalmente deshabilitado */}
						{/* <Button
							variant="primary"
							onClick={handleAddToCart}
							className="product-modal-add-btn"
						>
							Añadir al carrito
						</Button> */}
						<Button
							variant="primary"
							onClick={handleBuyNow}
							className="product-modal-buy-btn"
						>
							Comprar ahora
						</Button>
					</>
				)}
			</Modal.Footer>
		</Modal>
		<TransferModal 
			show={showTransferModal} 
			onHide={() => setShowTransferModal(false)}
			formData={formData}
		/>
		<MercadoPagoModal 
			show={showMercadoPagoModal} 
			onHide={() => setShowMercadoPagoModal(false)}
			formData={formData}
		/>
		</>
	);
};

export default ProductModal;
