import { Container, Row, Col } from 'react-bootstrap';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const AboutSection = () => {
	const { ref, inView } = useScrollAnimation({ threshold: 0.2 });

	return (
		<section
			ref={ref}
			className="py-5"
			style={{
				background: 'rgba(255, 255, 255, 0.7)',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				position: 'relative',
				overflow: 'hidden',
				opacity: inView ? 1 : 0,
				transform: inView ? 'translateY(0)' : 'translateY(50px)',
				transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: '-50%',
					right: '-10%',
					width: '300px',
					height: '300px',
					background: 'radial-gradient(circle, rgba(219, 22, 88, 0.1) 0%, transparent 70%)',
					borderRadius: '50%',
					pointerEvents: 'none',
				}}
			/>
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={10} lg={8}>
						<div className="text-center" style={{ position: 'relative', zIndex: 1 }}>
							<h2
								className="mb-4"
								style={{
									background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									fontSize: '2.5rem',
									fontWeight: 'bold',
									letterSpacing: '-1px',
								}}
							>
								Quiénes Somos
							</h2>
							<div className="mb-5">
								<p
									style={{
										color: '#dcb2c4',
										fontSize: '1.2rem',
										lineHeight: '1.9',
										maxWidth: '800px',
										margin: '0 auto 1.5rem',
										textAlign: 'left',
									}}
								>
									En <strong style={{ color: '#db1658' }}>Nice Surprise</strong> creemos que los mejores momentos comienzan con una sorpresa. Somos una marca dedicada a crear experiencias únicas y llenas de emoción, diseñadas para transformar cualquier ocasión en un recuerdo inolvidable.
								</p>
								<p
									style={{
										color: '#dcb2c4',
										fontSize: '1.2rem',
										lineHeight: '1.9',
										maxWidth: '800px',
										margin: '0 auto 1.5rem',
										textAlign: 'left',
									}}
								>
									Nos especializamos en arreglos personalizados con globos, peluches, flores y detalles creativos, pensados para cada tipo de celebración: cumpleaños, aniversarios, nacimientos, pedidas, reconciliaciones o simplemente para decir "te quiero" de una manera diferente.
								</p>
								<p
									style={{
										color: '#dcb2c4',
										fontSize: '1.2rem',
										lineHeight: '1.9',
										maxWidth: '800px',
										margin: '0 auto 1.5rem',
										textAlign: 'left',
									}}
								>
									Cada detalle cuenta, por eso combinamos diseño, amor y creatividad para que tu sorpresa sea perfecta. Desde la idea hasta la entrega, nos ocupamos de todo para que solo tengas que disfrutar la reacción de quien más querés.
								</p>
								<p
									style={{
										color: '#db1658',
										fontSize: '1.3rem',
										fontWeight: '600',
										lineHeight: '1.9',
										maxWidth: '800px',
										margin: '0 auto 1.5rem',
										fontStyle: 'italic',
									}}
								>
									Nice Surprise — Porque las emociones más lindas merecen ser celebradas en grande.
								</p>
								<div className="mt-4">
									<a
										href="https://www.instagram.com/_NiceSurprise"
										target="_blank"
										rel="noopener noreferrer"
										style={{
											display: 'inline-flex',
											alignItems: 'center',
											padding: '0.75rem 2rem',
											background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
											color: '#ffffff',
											textDecoration: 'none',
											borderRadius: '50px',
											fontWeight: '600',
											fontSize: '1.1rem',
											boxShadow: '0 10px 30px rgba(219, 22, 88, 0.3)',
											transition: 'all 0.3s ease',
										}}
										onMouseEnter={(e) => {
											e.currentTarget.style.transform = 'translateY(-3px) scale(1.05)';
											e.currentTarget.style.boxShadow = '0 15px 40px rgba(219, 22, 88, 0.4)';
										}}
										onMouseLeave={(e) => {
											e.currentTarget.style.transform = 'translateY(0) scale(1)';
											e.currentTarget.style.boxShadow = '0 10px 30px rgba(219, 22, 88, 0.3)';
										}}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width="20"
											height="20"
											fill="currentColor"
											viewBox="0 0 24 24"
											style={{ marginRight: '0.5rem' }}
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

