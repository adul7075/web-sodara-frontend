import LoginLinks from '@/app/LoginLinks'
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/ContactSection";
import PortofolioSection from "@/components/PortofolioSection";
import StatesSection from "@/components/StatesSection";
import ServicesSection from "@/components/ServicesSection";
import ProductsSection from "@/components/ProductsSection";
import HeroSection from "@/components/HeroSection";
import ProductDetail from "@/components/ProductDetail";

export const metadata = {
    title: 'LaravelTA',
}

const Home = () => {
    return (
        <>    
            <ProductDetail 
			image="/pagar3.jpg"
			title="Tralis Jendela"
			price="150.000"
			description="Tralis jendela kami menggunakan besi berkualitas tinggi yang didesain untuk memberikan keamanan maksimal tanpa mengurangi estetika rumah Anda."
			/>
        </>
    )
}

export default Home
