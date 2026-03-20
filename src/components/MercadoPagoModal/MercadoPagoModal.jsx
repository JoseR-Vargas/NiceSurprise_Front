import { Modal, Button } from 'react-bootstrap';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { MERCADOPAGO_LINK } from '../../constants/mercadopago';
import './MercadoPagoModal.css';

const MercadoPagoModal = ({ show, onHide, formData = {}, initialRedirected = false }) => {
	const { cart, getCartTotal, clearCart } = useCart();
	const [redirected, setRedirected] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const paymentWindowRef = useRef(null);

	useEffect(() => {
		if (show && initialRedirected) {
			setRedirected(true);
			return;
		}

		if (show && !redirected) {
			// Abrir el link de pago inmediatamente en una nueva pestaña (evita bloqueos en mobile)
			const popup = window.open(MERCADOPAGO_LINK, '_blank', 'noopener,noreferrer');
			if (popup) {
				paymentWindowRef.current = popup;
			}
			setRedirected(true);
		}
	}, [show, redirected, MERCADOPAGO_LINK, initialRedirected]);

	// Resetear estado cuando se cierra el modal
	useEffect(() => {
		if (!show) {
			setRedirected(false);
			setShowSuccessMessage(false);
			paymentWindowRef.current = null;
		}
	}, [show]);

	const handleNotificarVendedor = () => {
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
			`💳 *Método de pago:* Mercado Pago\n\n` +
			`✅ Pago realizado y listo para procesar`;

		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;
		// Mostrar pantalla de éxito y, tras 2s, abrir WhatsApp y cerrar
		setShowSuccessMessage(true);

		setTimeout(() => {
			window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
			clearCart();
			onHide();
			setRedirected(false);
			setShowSuccessMessage(false);
			paymentWindowRef.current = null;
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 2000);
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
					Pago con Mercado Pago
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="mercadopago-modal-body">
				<div className="mercadopago-content">
					{showSuccessMessage ? (
						<div className="mercadopago-instructions">
							<div className="instruction-icon">✅</div>
							<h5>¡Notificación Enviada!</h5>
							<p className="mb-3">
							Hemos recibido tu confirmación de pago.
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
								<p className="mt-3">Si ya realizaste el pago, notifica al vendedor presionando el botón de abajo.</p>
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
						variant="success"
						onClick={handleNotificarVendedor}
						className="mercadopago-notify-btn"
					>
						Notificar al Vendedor
					</Button>
				</Modal.Footer>
			)}
		</Modal>
	);
};

export default MercadoPagoModal;
