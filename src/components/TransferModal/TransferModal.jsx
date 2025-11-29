import { Modal, Button, Container, Form } from 'react-bootstrap';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';
import './TransferModal.css';

const TransferModal = ({ show, onHide, formData = {} }) => {
	const { cart, getCartTotal } = useCart();
	const [copiedField, setCopiedField] = useState(null);
	const [showConfirmation, setShowConfirmation] = useState(false);
	const [showSuccessMessage, setShowSuccessMessage] = useState(false);
	const [lastFourDigits, setLastFourDigits] = useState('');
	const [digitError, setDigitError] = useState('');

	// Datos bancarios mockeados
	const transferData = {
		banco: 'Banco Nación',
		titular: 'Nice Surprise',
		cbu: '0110593520000012345678',
		alias: 'NICE.SURPRISE.REGALOS',
		cuit: '20-12345678-9'
	};

	const handleCopy = (text, fieldName) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopiedField(fieldName);
			toast.success(`${fieldName} copiado al portapapeles`, {
				position: 'top-center',
				autoClose: 1500,
			});
			setTimeout(() => {
				setCopiedField(null);
			}, 2000);
		}).catch(err => {
			console.error('Error al copiar:', err);
			toast.error('Error al copiar', {
				position: 'top-center',
				autoClose: 1500,
			});
		});
	};

	const handleDigitChange = (e) => {
		const value = e.target.value.replace(/\D/g, ''); // Solo números
		if (value.length <= 4) {
			setLastFourDigits(value);
			setDigitError('');
		}
	};

	const handleNextStep = () => {
		setShowConfirmation(true);
	};

	const handleBackToTransfer = () => {
		setShowConfirmation(false);
		setLastFourDigits('');
		setDigitError('');
	};

	const handleNotifyVendor = () => {
		if (lastFourDigits.length !== 4) {
			setDigitError('Por favor ingresa los 4 dígitos');
			return;
		}

		const phoneNumber = '5493516600019'; // Número de WhatsApp del vendedor

		const productosDetalle = cart.map(item => 
			`- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
		).join('\n');

		const deliveryInfo = formData.delivery
			? `\n📍 *Dirección de entrega:*\n${formData.calle} ${formData.numero}, ${formData.esquina}\nZona: ${formData.zona}`
			: formData.retirar
				? '\n📦 *Retira en local*'
				: '';

		const mensaje = `🎉 *Nuevo Pedido - Nice Surprise* 🎉\n\n` +
			`👤 *Cliente:* ${formData.nombre || ''} ${formData.apellido || ''}\n` +
			`📱 *Teléfono:* ${formData.telefono || ''}\n\n` +
			`🛍️ *Productos:*\n${productosDetalle}\n\n` +
			`💰 *Total:* $${getCartTotal().toFixed(2)}\n` +
			`${deliveryInfo}\n\n` +
			`💳 *Método de pago:* Transferencia\n` +
			`🧾 *Comprobante:* ${lastFourDigits}\n\n` +
			`✅ Pago realizado y listo para procesar`;

		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(mensaje)}`;

		// Mostrar mensaje de éxito en el modal
		setShowSuccessMessage(true);

		// Mostrar confirmación 3s y luego redirigir a WhatsApp (misma pestaña) y cerrar
		setTimeout(() => {
			window.location.href = whatsappUrl;
			onHide();
			setShowConfirmation(false);
			setShowSuccessMessage(false);
			setLastFourDigits('');
			setDigitError('');
			// Llevar al usuario al inicio de la página
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}, 3000);
	};

	const handleClose = () => {
		onHide();
		setShowConfirmation(false);
		setShowSuccessMessage(false);
		setLastFourDigits('');
		setDigitError('');
	};

	return (
		<Modal
			show={show}
			onHide={handleClose}
			size="md"
			centered
			className="transfer-modal"
		>
			<Modal.Header closeButton className="transfer-modal-header">
				<Modal.Title className="transfer-modal-title">
					{showSuccessMessage ? '¡Listo!' : showConfirmation ? 'Confirmar Transferencia' : 'Datos para Transferencia'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body className="transfer-modal-body">
				<Container>
					{showSuccessMessage ? (
						<div className="transfer-success">
							<div className="success-icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="80"
									height="80"
									fill="#4caf50"
									viewBox="0 0 16 16"
								>
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
								</svg>
							</div>
							<h3 className="success-title">¡Notificación Enviada!</h3>
							<p className="success-message">
								Hemos recibido tu confirmación de pago con los últimos dígitos <strong>{lastFourDigits}</strong>
							</p>
							<div className="success-info">
								<p>
									📱 Nos pondremos en contacto contigo muy pronto para coordinar la entrega de tu pedido.
								</p>
								<p className="success-thanks">
									¡Gracias por tu compra en Nice Surprise! 💕
								</p>
							</div>
						</div>
					) : !showConfirmation ? (
						<div className="transfer-info">
							<p className="transfer-instructions">
								Realiza la transferencia a la siguiente cuenta bancaria:
							</p>

						<div className="transfer-data-section">
							<div className="transfer-data-item">
								<label className="transfer-label">Banco:</label>
								<div className="transfer-value-container">
									<span className="transfer-value">{transferData.banco}</span>
								</div>
							</div>

							<div className="transfer-data-item">
								<label className="transfer-label">Titular:</label>
								<div className="transfer-value-container">
									<span className="transfer-value">{transferData.titular}</span>
								</div>
							</div>

							<div className="transfer-data-item">
								<label className="transfer-label">CBU:</label>
								<div className="transfer-value-container">
									<span className="transfer-value">{transferData.cbu}</span>
									<Button
										variant="outline-primary"
										size="sm"
										className="transfer-copy-btn"
										onClick={() => handleCopy(transferData.cbu, 'CBU')}
									>
										{copiedField === 'CBU' ? (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
												</svg>
												Copiado
											</>
										) : (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
													<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
												</svg>
												Copiar
											</>
										)}
									</Button>
								</div>
							</div>

							<div className="transfer-data-item">
								<label className="transfer-label">Alias:</label>
								<div className="transfer-value-container">
									<span className="transfer-value">{transferData.alias}</span>
									<Button
										variant="outline-primary"
										size="sm"
										className="transfer-copy-btn"
										onClick={() => handleCopy(transferData.alias, 'Alias')}
									>
										{copiedField === 'Alias' ? (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
												</svg>
												Copiado
											</>
										) : (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
													<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
												</svg>
												Copiar
											</>
										)}
									</Button>
								</div>
							</div>

							<div className="transfer-data-item">
								<label className="transfer-label">CUIT:</label>
								<div className="transfer-value-container">
									<span className="transfer-value">{transferData.cuit}</span>
									<Button
										variant="outline-primary"
										size="sm"
										className="transfer-copy-btn"
										onClick={() => handleCopy(transferData.cuit, 'CUIT')}
									>
										{copiedField === 'CUIT' ? (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
												</svg>
												Copiado
											</>
										) : (
											<>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													viewBox="0 0 16 16"
												>
													<path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
													<path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
												</svg>
												Copiar
											</>
										)}
									</Button>
								</div>
							</div>
						</div>

						<div className="transfer-note">
							<p>
								💡 <strong>Importante:</strong> Una vez realizada la transferencia, 
								haz click en "Siguiente Paso" para confirmar tu pago.
							</p>
						</div>
						</div>
					) : (
						<div className="transfer-confirmation">
							<div className="confirmation-icon">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="64"
									height="64"
									fill="#4caf50"
									viewBox="0 0 16 16"
								>
									<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
								</svg>
							</div>
							<h4 className="confirmation-title">¿Ya realizaste la transferencia?</h4>
							<p className="confirmation-text">
								Ingresa los últimos 4 dígitos del comprobante de pago para notificar al vendedor:
							</p>
							
							<Form.Group className="mb-3">
								<Form.Label className="confirmation-label">
									Últimos 4 dígitos del comprobante <span className="text-danger">*</span>
								</Form.Label>
								<Form.Control
									type="text"
									maxLength="4"
									value={lastFourDigits}
									onChange={handleDigitChange}
									placeholder="1234"
									className="confirmation-input"
									isInvalid={!!digitError}
								/>
								<Form.Control.Feedback type="invalid">
									{digitError}
								</Form.Control.Feedback>
								<Form.Text className="text-muted">
									Ejemplo: Si tu comprobante termina en 5678, ingresa: 5678
								</Form.Text>
							</Form.Group>

							<div className="confirmation-note">
								<p>
									📞 Una vez notificado, nos pondremos en contacto contigo para coordinar la entrega.
								</p>
							</div>
						</div>
					)}
				</Container>
			</Modal.Body>
			<Modal.Footer className="transfer-modal-footer">
				{showSuccessMessage ? (
					<Button variant="success" onClick={handleClose} className="success-close-btn">
						Entendido
					</Button>
				) : !showConfirmation ? (
					<>
						<Button variant="outline-secondary" onClick={handleClose}>
							Cerrar
						</Button>
						<Button variant="primary" onClick={handleNextStep} className="transfer-next-btn">
							Siguiente Paso
						</Button>
					</>
				) : (
					<>
						<Button variant="outline-secondary" onClick={handleBackToTransfer}>
							Volver
						</Button>
						<Button 
							variant="success" 
							onClick={handleNotifyVendor}
							className="transfer-notify-btn"
							disabled={lastFourDigits.length !== 4}
						>
							Notificar Vendedor
						</Button>
					</>
				)}
			</Modal.Footer>
		</Modal>
	);
};

export default TransferModal;
