import { Toaster } from "sonner";
import { Hero } from "./components/Hero";
import { Sessions } from "./components/Sessions";
import { Team } from "./components/Team";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { DataProvider } from "./contexts/DataContext";
import { Navigation } from "./components/Navigation";

export default function App() {
  return (
    <DataProvider>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-purple-50">
        <Navigation />
        <main className="flex-1">
          <Hero />
          <Sessions />
          <Team />
          <Contact />
        </main>
        <Footer />
        <Toaster />
      </div>
    </DataProvider>
  );
}
