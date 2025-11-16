import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
	const { addToCart } = useCart();

	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<Card
			className="h-100"
			style={{
				border: 'none',
				borderRadius: '20px',
				overflow: 'hidden',
				transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
				background: 'rgba(255, 255, 255, 0.9)',
				backdropFilter: 'blur(10px)',
				WebkitBackdropFilter: 'blur(10px)',
				boxShadow: '0 8px 32px rgba(219, 22, 88, 0.1)',
				position: 'relative',
			}}
			onMouseEnter={(e) => {
				e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
				e.currentTarget.style.boxShadow = '0 20px 40px rgba(219, 22, 88, 0.25), 0 0 30px rgba(231, 44, 106, 0.15)';
			}}
			onMouseLeave={(e) => {
				e.currentTarget.style.transform = 'translateY(0) scale(1)';
				e.currentTarget.style.boxShadow = '0 8px 32px rgba(219, 22, 88, 0.1)';
			}}
		>
			<div
				style={{
					height: '250px',
					overflow: 'hidden',
					background: 'linear-gradient(135deg, #f9cad8 0%, #f6b5ca 100%)',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					position: 'relative',
				}}
			>
				{product.image ? (
					<Card.Img
						variant="top"
						src={product.image}
						alt={product.title}
						style={{
							objectFit: 'cover',
							height: '100%',
							width: '100%',
							transition: 'transform 0.5s ease',
						}}
						onMouseEnter={(e) => {
							e.currentTarget.style.transform = 'scale(1.1)';
						}}
						onMouseLeave={(e) => {
							e.currentTarget.style.transform = 'scale(1)';
						}}
					/>
				) : (
					<div
						style={{
							color: '#db1658',
							fontSize: '3rem',
							opacity: 0.5,
							animation: 'float 3s ease-in-out infinite',
						}}
					>
						🎁
					</div>
				)}
				<div
					style={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						background: 'linear-gradient(180deg, transparent 0%, rgba(219, 22, 88, 0.1) 100%)',
						pointerEvents: 'none',
					}}
				/>
			</div>
			<Card.Body className="d-flex flex-column" style={{ padding: '1.5rem' }}>
				<Card.Title
					style={{
						background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
						WebkitBackgroundClip: 'text',
						WebkitTextFillColor: 'transparent',
						backgroundClip: 'text',
						marginBottom: '1rem',
						fontSize: '1.3rem',
						fontWeight: 'bold',
					}}
				>
					{product.title}
				</Card.Title>
				<Card.Text
					style={{
						color: '#dcb2c4',
						flexGrow: 1,
						marginBottom: '1.5rem',
						lineHeight: '1.6',
					}}
				>
					{product.description}
				</Card.Text>
				<div className="d-flex justify-content-between align-items-center">
					<span
						style={{
							background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							fontSize: '1.8rem',
							fontWeight: 'bold',
							letterSpacing: '-1px',
						}}
					>
						${product.price}
					</span>
					<Button
						onClick={handleAddToCart}
						style={{
							background: 'linear-gradient(135deg, #db1658 0%, #e72c6a 100%)',
							border: 'none',
							borderRadius: '25px',
							padding: '0.6rem 1.8rem',
							fontWeight: '600',
							boxShadow: '0 4px 15px rgba(219, 22, 88, 0.3)',
							position: 'relative',
							overflow: 'hidden',
						}}
					>
						<span style={{ position: 'relative', zIndex: 1 }}>
							Añadir al carrito
						</span>
					</Button>
				</div>
			</Card.Body>
		</Card>
	);
};

export default ProductCard;

