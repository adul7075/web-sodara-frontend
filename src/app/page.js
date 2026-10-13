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
import VideoSection from '@/components/VideoSection'

export const metadata = {
    title: 'ETMI Shop',
}

const Home = () => {
    return (
        <>    
            <Navbar />
			
			<section id="beranda">
			<HeroSection />
			</section>
			
			<section id="produk">
			<ProductsSection />
			</section>
			
			<section id="layanan">
			<ServicesSection />
			</section>
			
			<StatesSection />
						
			<section id="galeri">
			<PortofolioSection />
			</section>
					
			
			<VideoSection
        src="/video/pagar.mp4"
        title="Proses Pembuatan Pagar"
        description="Mulai dari pengukuran, pembuatan rangka, hingga pemasangan di lokasi pelanggan."
        autoPlay={false}
      />

			
			<section id="kontak">
			<ContactSection />
			</section>
			
			<Footer />
        </>
    )
}

export default Home
