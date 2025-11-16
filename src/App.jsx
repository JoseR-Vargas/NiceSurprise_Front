import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProductCarousel from './components/ProductCarousel';
import ProductsSection from './components/ProductsSection';
import Footer from './components/Footer';
import ConfettiEffect from './components/ConfettiEffect';
import './App.css';

function App() {
	return (
		<CartProvider>
			<div className="App">
				<ConfettiEffect />
				<Header />
				<main>
					<HeroSection />
					<section id="about">
						<AboutSection />
					</section>
					<ProductCarousel />
					<section id="products">
						<ProductsSection />
					</section>
				</main>
				<Footer />
			</div>
		</CartProvider>
	);
}

export default App;
