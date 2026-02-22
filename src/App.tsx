import { Toaster } from "sonner";
import { Hero } from "./components/Hero";
import { Sessions } from "./components/Sessions";
import { Shop } from "./components/Shop";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DataProvider } from "./contexts/DataContext";
import { CartProvider } from "./contexts/CartContext";
import { Navigation } from "./components/Navigation";
import { CartButton } from "./components/CartButton";
import { CheckoutSuccess } from "./components/CheckoutSuccess";
import { useEffect, useState } from "react";

export default function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Check if user is returning from successful checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("checkout") === "success") {
      setShowSuccess(true);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <DataProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-red-100">
          <Navigation />
          {/* Under construction banner — sits below nav, animates to center pill on scroll */}
          <div
            className={`fixed z-50 bg-yellow-400 text-yellow-900 font-semibold text-sm text-center transition-all duration-500 ease-in-out left-1/2 -translate-x-1/2 ${
              scrolled
                ? "top-1/2 -translate-y-1/2 rounded-full px-6 py-2 shadow-xl max-w-[90vw]"
                : "top-16 w-screen py-2 px-4"
            }`}
          >
            🚧 This site is under construction — some features may not be available yet.
          </div>
          <main className="flex-1">
            <Hero />
            <Sessions />
            <Shop />
            <Team />
            <Contact />
          </main>
          <Footer />
          <CartButton />
          <Toaster />
          {showSuccess && <CheckoutSuccess />}
        </div>
      </CartProvider>
    </DataProvider>
  );
}
