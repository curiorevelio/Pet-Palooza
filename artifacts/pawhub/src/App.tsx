import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@workspace/replit-auth-web";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";
import { Header } from "@/components/layout/Header";

// Pages
import Home from "@/pages/home";
import OwnerDashboard from "@/pages/owner-dashboard";
import Providers from "@/pages/providers";
import ProviderDetail from "@/pages/provider-detail";
import Book from "@/pages/book";
import Pets from "@/pages/pets";
import Bookings from "@/pages/bookings";
import BookingDetail from "@/pages/booking-detail";

import ProviderDashboard from "@/pages/provider/dashboard";
import ProviderProfile from "@/pages/provider/profile";
import ProviderServices from "@/pages/provider/services";
import ProviderAvailability from "@/pages/provider/availability";
import ProviderBookings from "@/pages/provider/bookings";
import BecomeProvider from "@/pages/become-provider";

import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="min-h-[100dvh] flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/dashboard" component={OwnerDashboard} />
          <Route path="/providers" component={Providers} />
          <Route path="/providers/:id" component={ProviderDetail} />
          <Route path="/book/:providerId/:serviceId" component={Book} />
          <Route path="/pets" component={Pets} />
          <Route path="/bookings" component={Bookings} />
          <Route path="/bookings/:id" component={BookingDetail} />
          
          <Route path="/become-a-provider" component={BecomeProvider} />
          
          <Route path="/provider" component={ProviderDashboard} />
          <Route path="/provider/profile" component={ProviderProfile} />
          <Route path="/provider/services" component={ProviderServices} />
          <Route path="/provider/availability" component={ProviderAvailability} />
          <Route path="/provider/bookings" component={ProviderBookings} />
          
          <Route component={NotFound} />
        </Switch>
      </main>
    </div>
  );
}

function LoginScreen() {
  const { login } = useAuth();
  return (
    <div className="min-h-[100dvh] flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="flex items-center gap-2 text-primary font-bold text-4xl font-serif mb-3">
        <PawPrint className="w-10 h-10" />
        <span>PawHub</span>
      </div>
      <p className="text-muted-foreground max-w-sm mb-8">
        India's pet care companion. Log in to manage your pets, find trusted providers, and book care.
      </p>
      <Button size="lg" className="font-semibold" onClick={login}>
        Log in
      </Button>
    </div>
  );
}

function AuthGate() {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center bg-background">
        <PawPrint className="w-10 h-10 text-primary animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginScreen />;
  }

  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthGate />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
