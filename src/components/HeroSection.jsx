import { Container, Row, Col } from 'react-bootstrap';
import { useParallax } from '../hooks/useScrollAnimation';

const HeroSection = () => {
	const { elementRef, offset } = useParallax(0.3);

	return (
		<section
			ref={elementRef}
			style={{
				minHeight: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				position: 'relative',
				overflow: 'hidden',
				background: 'linear-gradient(135deg, #fbf1f5 0%, #fbd9e4 50%, #f9cad8 100%)',
			}}
		>
			<div
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					background: `radial-gradient(circle at 20% 50%, rgba(219, 22, 88, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(231, 44, 106, 0.15) 0%, transparent 50%), radial-gradient(circle at 40% 20%, rgba(249, 202, 216, 0.2) 0%, transparent 50%)`,
					transform: `translateY(${offset * 0.5}px)`,
					transition: 'transform 0.1s ease-out',
				}}
			/>
			<Container style={{ position: 'relative', zIndex: 1 }}>
				<Row className="justify-content-center text-center">
					<Col xs={12} md={10} lg={8}>
						<div
							style={{
								transform: `translateY(${offset * 0.2}px)`,
								transition: 'transform 0.1s ease-out',
							}}
						>
							<h1
								style={{
									background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
									WebkitBackgroundClip: 'text',
									WebkitTextFillColor: 'transparent',
									backgroundClip: 'text',
									fontSize: 'clamp(2.5rem, 8vw, 5rem)',
									fontWeight: 'bold',
									letterSpacing: '-2px',
									marginBottom: '1.5rem',
									opacity: 0,
									animation: 'fadeInUp 1s ease-out 0.3s forwards',
								}}
							>
								Nice Surprise
							</h1>
							<p
								style={{
									color: '#dcb2c4',
									fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
									lineHeight: '1.8',
									marginBottom: '2rem',
									opacity: 0,
									animation: 'fadeInUp 1s ease-out 0.6s forwards',
								}}
							>
								Arreglos y detalles únicos para hacer de cada celebración un momento
								inolvidable
							</p>
							<div
								style={{
									opacity: 0,
									animation: 'fadeInUp 1s ease-out 0.9s forwards',
								}}
							>
								<a
									href="#products"
									style={{
										display: 'inline-block',
										padding: '1rem 2.5rem',
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
										e.currentTarget.style.transform = 'translateY(-5px) scale(1.05)';
										e.currentTarget.style.boxShadow = '0 15px 40px rgba(219, 22, 88, 0.4)';
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.transform = 'translateY(0) scale(1)';
										e.currentTarget.style.boxShadow = '0 10px 30px rgba(219, 22, 88, 0.3)';
									}}
								>
									Explorar Productos
								</a>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</section>
	);
};

export default HeroSection;

