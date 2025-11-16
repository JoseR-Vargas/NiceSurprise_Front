import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const useScrollAnimation = (options = {}) => {
	const { threshold = 0.1, triggerOnce = true } = options;
	const { ref, inView } = useInView({
		threshold,
		triggerOnce,
	});

	return { ref, inView };
};

export const useParallax = (speed = 0.5) => {
	const [offset, setOffset] = useState(0);
	const elementRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			if (elementRef.current) {
				const rect = elementRef.current.getBoundingClientRect();
				const scrolled = window.pageYOffset;
				const parallax = scrolled * speed;
				setOffset(parallax);
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [speed]);

	return { elementRef, offset };
};

