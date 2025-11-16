import { Navbar, Container, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const Header = () => {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 50;
			setScrolled(isScrolled);
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<Navbar
			expand="lg"
			className="sticky-top"
			style={{
				background: scrolled
					? 'rgba(255, 255, 255, 0.95)'
					: 'rgba(255, 255, 255, 0.8)',
				backdropFilter: 'blur(20px) saturate(180%)',
				WebkitBackdropFilter: 'blur(20px) saturate(180%)',
				boxShadow: scrolled
					? '0 8px 32px rgba(219, 22, 88, 0.15)'
					: '0 8px 32px rgba(219, 22, 88, 0.1)',
				borderBottom: '1px solid rgba(219, 22, 88, 0.1)',
				transition: 'all 0.3s ease',
				transform: scrolled ? 'translateY(0)' : 'translateY(0)',
			}}
		>
			<Container>
				<Navbar.Brand
					href="#home"
					style={{
						background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						fontSize: '1.8rem',
						fontWeight: 'bold',
						letterSpacing: '-0.5px',
						transition: 'all 0.3s ease',
						position: 'relative',
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.transform = 'scale(1.05)';
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.transform = 'scale(1)';
					}}
				>
					Nice Surprise
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link
							href="#about"
							style={{
								color: '#dcb2c4',
								fontWeight: '600',
								position: 'relative',
								padding: '0.5rem 1rem',
								transition: 'all 0.3s ease',
								borderRadius: '8px',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#db1658';
								e.currentTarget.style.background = 'rgba(219, 22, 88, 0.1)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = '#dcb2c4';
								e.currentTarget.style.background = 'transparent';
							}}
						>
							Quiénes Somos
						</Nav.Link>
						<Nav.Link
							href="#products"
							style={{
								color: '#dcb2c4',
								fontWeight: '600',
								position: 'relative',
								padding: '0.5rem 1rem',
								transition: 'all 0.3s ease',
								borderRadius: '8px',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.color = '#db1658';
								e.currentTarget.style.background = 'rgba(219, 22, 88, 0.1)';
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.color = '#dcb2c4';
								e.currentTarget.style.background = 'transparent';
							}}
						>
							Productos
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;

