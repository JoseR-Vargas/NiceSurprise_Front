import { Container, Row, Col } from 'react-bootstrap';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import './AboutSection.css';

const AboutSection = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className={`about-section ${inView ? 'visible' : 'hidden'}`}
		>
			<div className="about-background-effect" />
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={10} lg={8}>
						<div className="text-center about-content">
							<h2 className="about-title">
								Quiénes Somos
							</h2>
							<div className="mb-5">
								<p className="about-text">
									En <strong>Nice Surprise</strong> creemos que los mejores momentos comienzan con una sorpresa. Somos una marca dedicada a crear experiencias únicas y llenas de emoción, diseñadas para transformar cualquier ocasión en un recuerdo inolvidable.
								</p>
								<p className="about-text">
									Nos especializamos en arreglos personalizados con globos, peluches, flores y detalles creativos, pensados para cada tipo de celebración: cumpleaños, aniversarios, nacimientos, pedidas, reconciliaciones o simplemente para decir "te quiero" de una manera diferente.
								</p>
								<p className="about-text">
									Cada detalle cuenta, por eso combinamos diseño, amor y creatividad para que tu sorpresa sea perfecta. Desde la idea hasta la entrega, nos ocupamos de todo para que solo tengas que disfrutar la reacción de quien más querés.
								</p>
								<p className="about-slogan">
									Nice Surprise — Porque las emociones más lindas merecen ser celebradas en grande.
								</p>
							<div className="mt-4">
								<a
									href="https://www.instagram.com/__nicesurprise?igsh=Zjg4aWVlZW5nOWJz"
									target="_blank"
									rel="noopener noreferrer"
									className="about-instagram-button"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											viewBox="0 0 24 24"
											className="about-instagram-icon"
										>
											<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
										</svg>
										Síguenos en Instagram
									</a>
								</div>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default AboutSection;

