import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FleetSection from "@/components/FleetSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import PricingCalculator from "@/components/PricingCalculator";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";
import AdminDashboard from "@/pages/admin";
import NotFound from "@/pages/not-found";
import WhatsAppButton from "@/components/WhatsAppButton";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 30_000 },
  },
});

function Home() {
  return (
    <div className="min-h-screen bg-[#08090a]">
      <Navbar />
      <HeroSection />
      <FleetSection />
      <WhyChooseUs />
      <Testimonials />
      <PricingCalculator />
      <BookingForm />
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/admin" component={AdminDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
          <WhatsAppButton />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
