import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
