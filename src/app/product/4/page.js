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
			image="/pagar1.jpg"
			title="Pagar Besi Hollow"
			price="250.000"
			description="Pagar besi hollow dengan banyak pilihan desain modern."
			/>
        </>
    )
}

export default Home
