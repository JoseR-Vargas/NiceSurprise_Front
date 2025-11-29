import { Modal, Button, Form } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import './MercadoPagoModal.css';

const MercadoPagoModal = ({ show, onHide, formData = {} }) => {
	const { cart, getCartTotal, clearCart } = useCart();
	const [comprobante, setComprobante] = useState('');
	const [error, setError] = useState('');
	const [redirected, setRedirected] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const paymentWindowRef = useRef(null);

	// URL de Mercado Pago para PicArbolito Mágico
	const MERCADOPAGO_LINK = 'https://mpago.la/2pt5Noz';

	useEffect(() => {
		if (show && !redirected) {
			// Después de 4 segundos, redirigir al link de Mercado Pago
			const timer = setTimeout(() => {
				const popup = window.open(MERCADOPAGO_LINK, '_blank', 'noopener,noreferrer');
				if (popup) {
					paymentWindowRef.current = popup;
				}
				setRedirected(true);
			}, 4000);

			return () => clearTimeout(timer);
		}
	}, [show, redirected, MERCADOPAGO_LINK]);

	// Resetear estado cuando se cierra el modal
	useEffect(() => {
		if (!show) {
			setComprobante('');
			setError('');
			setRedirected(false);
			setShowSuccessMessage(false);
			paymentWindowRef.current = null;
		}
	}, [show]);

	const handleComprobanteChange = (e) => {
		const value = e.target.value.replace(/\D/g, ''); // Solo números
		if (value.length <= 4) {
			setComprobante(value);
			if (error) setError('');
		}
	};

	const handleNotificarVendedor = () => {
		// Validar que tenga 4 dígitos
		if (comprobante.length !== 4) {
			setError('Debes ingresar los 4 dígitos del comprobante');
			return;
		}

		// Preparar mensaje de WhatsApp
		const phoneNumber = '5493516600019'; // Número del vendedor (mismo que el botón flotante)
		
		// Construir detalles del pedido
		const productosDetalle = cart.map(item => 
			`- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
		).join('\n');

		const deliveryInfo = formData.delivery 
			? `\n📍 *Dirección de entrega:*\n${formData.calle} ${formData.numero}, ${formData.esquina}\nZona: ${formData.zona}`
			: '\n📦 *Retira en local*';

		const mensaje = `🎉 *Nuevo Pedido - Nice Surprise* 🎉\n\n` +
			`👤 *Cliente:* ${formData.nombre} ${formData.apellido}\n` +
			`📱 *Teléfono:* ${formData.telefono}\n\n` +
			`🛍️ *Productos:*\n${productosDetalle}\n\n` +
			`💰 *Total:* $${getCartTotal().toFixed(2)}\n\n` +
			`${deliveryInfo}\n\n` +
			`💳 *Método de pago:* Mercado Pago\n` +
			`🧾 *Comprobante:* ${comprobante}\n\n` +
			`✅ Pago realizado y listo para procesar`;

		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;

		// Mostrar pantalla de éxito y, tras 4s, abrir WhatsApp y cerrar
		setShowSuccessMessage(true);

		setTimeout(() => {
			if (paymentWindowRef.current && !paymentWindowRef.current.closed) {
				paymentWindowRef.current.location.href = whatsappUrl;
			} else {
				window.open(whatsappUrl, '_blank');
			}
			clearCart();
			onHide();
			setRedirected(false);
			setComprobante('');
			setError('');
			setShowSuccessMessage(false);
			paymentWindowRef.current = null;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 4000);
	};

	return (
		<Modal
			show={show}
			onHide={onHide}
			centered
			className="mercadopago-modal"
			backdrop="static"
		>
			<Modal.Header closeButton className="mercadopago-modal-header">
				<Modal.Title className="mercadopago-modal-title">
					💳 Pago con Mercado Pago
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mercadopago-modal-body">
				<div className="mercadopago-content">
					{showSuccessMessage ? (
						<div className="mercadopago-instructions">
							<div className="instruction-icon">✅</div>
							<h5>¡Notificación Enviada!</h5>
							<p className="mb-3">
								Hemos recibido tu comprobante con los últimos dígitos <strong>{comprobante}</strong>.
							</p>
							<div className="mercadopago-info mt-3">
								<p className="info-text">
									📞 Nos pondremos en contacto contigo para coordinar la entrega.
								</p>
								<p className="text-muted small">
									Gracias por tu compra en Nice Surprise 💕
								</p>
							</div>
						</div>
					) : !redirected ? (
						<>
							<div className="mercadopago-loading">
								<div className="spinner-border text-primary" role="status">
									<span className="visually-hidden">Cargando...</span>
								</div>
								<p className="mt-3">Redirigiendo a Mercado Pago...</p>
								<p className="text-muted small">AL COMPLETAR EL PAGO VOLVER Y FINALIZAR LA COMPRA</p>
							</div>
						</>
					) : (
						<>
							<div className="mercadopago-instructions">
								<div className="instruction-icon">✅</div>
								<h5>¡Ya puedes completar el pago!</h5>
							</div>

							<div className="comprobante-section">
								<Form.Group>
									<Form.Label>
										<strong>Ingresa los últimos 4 dígitos del comprobante</strong>
									</Form.Label>
									<Form.Control
										type="text"
										placeholder="0000"
										value={comprobante}
										onChange={handleComprobanteChange}
										maxLength={4}
										className="comprobante-input text-center"
										isInvalid={!!error}
									/>
									<Form.Control.Feedback type="invalid">
										{error}
									</Form.Control.Feedback>
									<Form.Text className="text-muted">
										Los 4 dígitos del código de transacción
									</Form.Text>
								</Form.Group>
							</div>

							<div className="mercadopago-info mt-4">
								<p className="info-text">
									<strong>💡 ¿No completaste el pago?</strong>
								</p>
								<p className="text-muted small">
									Puedes cerrar esta ventana y regresar cuando termines el pago.
								</p>
							</div>
						</>
					)}
				</div>
			</Modal.Body>
			{redirected && !showSuccessMessage && (
				<Modal.Footer className="mercadopago-modal-footer">
					<Button
						variant="outline-secondary"
						onClick={onHide}
						className="mercadopago-cancel-btn"
					>
						Cancelar
					</Button>
					<Button
						variant="success"
						onClick={handleNotificarVendedor}
						className="mercadopago-notify-btn"
						disabled={comprobante.length !== 4}
					>
						🔔 Notificar al Vendedor
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

export default MercadoPagoModal;
