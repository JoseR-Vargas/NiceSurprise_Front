import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import ProductCarousel from './components/ProductCarousel/ProductCarousel';
import ProductsSection from './components/ProductsSection/ProductsSection';
import Footer from './components/Footer/Footer';
import ConfettiEffect from './components/ConfettiEffect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
				<ToastContainer
					position="top-center"
					autoClose={2000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
					theme="light"
				/>
			</div>
		</CartProvider>
	);
}

export default App;
