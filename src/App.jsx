import 'bootstrap/dist/css/bootstrap.min.css';
import { CartProvider } from './context/CartContext';
import Header from './components/Header/Header';
import HeroSection from './components/HeroSection/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import TeamSection from './components/TeamSection/TeamSection';
import ProductsSection from './components/ProductsSection/ProductsSection';
import Footer from './components/Footer/Footer';
import ConfettiEffect from './components/ConfettiEffect';
import BalloonsEffect from './components/BalloonsEffect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
	return (
		<CartProvider>
			<div className="App">
				<ConfettiEffect />
				<BalloonsEffect />
				<Header />
				<main>
					<HeroSection />
					<section id="about">
						<AboutSection />
					</section>
					<section id="products">
						<ProductsSection />
					</section>
					<TeamSection />
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
