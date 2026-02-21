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

  useEffect(() => {
    // Check if user is returning from successful checkout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("checkout") === "success") {
      setShowSuccess(true);
    }
  }, []);

  return (
    <DataProvider>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-red-50 to-red-100">
          <Navigation />
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
