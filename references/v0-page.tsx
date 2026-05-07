import Header from "@/components/header"
import Hero from "@/components/hero"
import TrustStrip from "@/components/trust-strip"
import PopularDishes from "@/components/popular-dishes"
import MenuSection from "@/components/menu-section"
import WhatsAppCTA from "@/components/whatsapp-cta"
import GoogleReviews from "@/components/google-reviews"
import GallerySection from "@/components/gallery-section"
import LocationSection from "@/components/location-section"
import FaqSection from "@/components/faq-section"
import Footer from "@/components/footer"
import MobileBottomBar from "@/components/mobile-bottom-bar"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustStrip />
      <PopularDishes />
      <MenuSection />
      <WhatsAppCTA />
      <GoogleReviews />
      <GallerySection />
      <LocationSection />
      <FaqSection />
      <Footer />
      <MobileBottomBar />
    </main>
  )
}
