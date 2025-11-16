import { Navbar, Container, Nav } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useCart } from '../../context/CartContext';
import CartModal from '../CartModal/CartModal';
import './Header.css';

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const [showCartModal, setShowCartModal] = useState(false);
	const { getCartItemsCount } = useCart();
	const cartItemsCount = getCartItemsCount();

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
			className={`sticky-top header-navbar ${scrolled ? 'scrolled' : ''}`}
		>
			<Container>
				<Navbar.Brand href="#home" className="header-brand">
					Nice Surprise
				</Navbar.Brand>
				<div className="header-cart-widget header-cart-widget-mobile">
					<Nav.Link
						href="#cart"
						className="header-cart-link"
						onClick={(e) => {
							e.preventDefault();
							setShowCartModal(true);
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="header-cart-icon"
						>
							<circle cx="9" cy="21" r="1"></circle>
							<circle cx="20" cy="21" r="1"></circle>
							<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
						</svg>
						{cartItemsCount > 0 && (
							<span className="header-cart-badge">{cartItemsCount}</span>
						)}
					</Nav.Link>
				</div>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto align-items-center">
						<Nav.Link href="#about" className="header-nav-link">
							Quiénes Somos
						</Nav.Link>
						<Nav.Link href="#products" className="header-nav-link">
							Productos
						</Nav.Link>
						<div className="header-cart-widget header-cart-widget-desktop">
							<Nav.Link
								href="#cart"
								className="header-cart-link"
								onClick={(e) => {
									e.preventDefault();
									setShowCartModal(true);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="header-cart-icon"
								>
									<circle cx="9" cy="21" r="1"></circle>
									<circle cx="20" cy="21" r="1"></circle>
									<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
								</svg>
								{cartItemsCount > 0 && (
									<span className="header-cart-badge">{cartItemsCount}</span>
								)}
							</Nav.Link>
						</div>
					</Nav>
				</Navbar.Collapse>
			</Container>
			<CartModal show={showCartModal} onHide={() => setShowCartModal(false)} />
		</Navbar>
	);
};

export default Header;

