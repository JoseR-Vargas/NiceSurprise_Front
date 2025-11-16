import { Container, Row, Col } from 'react-bootstrap';
import { useParallax } from '../../hooks/useScrollAnimation';
import './HeroSection.css';

const HeroSection = () => {
	const { elementRef, offset } = useParallax(0.3);

	return (
		<section ref={elementRef} className="hero-section">
			<div
				className="hero-background"
				style={{
					transform: `translateY(${offset * 0.5}px)`,
				}}
			/>
			<Container className="hero-container">
				<Row className="justify-content-center text-center">
					<Col xs={12} md={10} lg={8}>
						<div
							className="hero-content"
							style={{
								transform: `translateY(${offset * 0.2}px)`,
							}}
						>
							<h1 className="hero-title">Nice Surprise</h1>
							<p className="hero-subtitle">
								Arreglos y detalles únicos para hacer de cada celebración un momento
								inolvidable
							</p>
							<div className="hero-button-wrapper">
								<a href="#products" className="hero-button">
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

