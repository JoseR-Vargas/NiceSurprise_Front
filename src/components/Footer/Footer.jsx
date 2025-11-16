import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

const Footer = () => {
	return (
		<footer className="footer">
			<div className="footer-background-1" />
			<div className="footer-background-2" />

			<Container className="footer-container">
				{/* Redes sociales */}
				<Row className="justify-content-center mb-4">
					<Col xs={12} className="text-center">
						<div className="footer-social-links">
							<a
								href="https://www.instagram.com/_NiceSurprise"
								target="_blank"
								rel="noopener noreferrer"
								className="footer-social-link"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="footer-social-icon"
								>
									<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
								</svg>
								Instagram
							</a>
							<a
								href="https://www.tiktok.com/@_NiceSurprise"
								target="_blank"
								rel="noopener noreferrer"
								className="footer-social-link"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="18"
									height="18"
									fill="currentColor"
									viewBox="0 0 24 24"
									className="footer-social-icon"
								>
									<path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
								</svg>
								TikTok
							</a>
						</div>
					</Col>
				</Row>

				{/* Línea divisoria */}
				<Row>
					<Col>
						<div className="footer-divider" />
					</Col>
				</Row>

				{/* Ubicación */}
				<Row className="mb-3">
					<Col className="text-center">
						<p className="footer-location">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								fill="currentColor"
								viewBox="0 0 24 24"
								className="footer-location-icon"
							>
								<path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
							</svg>
							Córdoba Capital, Argentina
						</p>
					</Col>
				</Row>

				{/* Copyright */}
				<Row>
					<Col className="text-center">
						<p className="footer-copyright">
							© 2020 Nice Surprise. Todos los derechos reservados.
						</p>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;

