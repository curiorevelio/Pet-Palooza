import { useGetOwnerDashboard } from "@workspace/api-client-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, PawPrint } from "lucide-react";
import { format } from "date-fns";

export default function OwnerDashboard() {
  const { data: dashboard, isLoading } = useGetOwnerDashboard();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 space-y-6">
        <h1 className="text-3xl font-bold font-serif">Your Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[1,2,3,4].map(i => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-64" />
      </div>
    );
  }

  if (!dashboard) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-serif">Welcome back!</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/pets">Manage Pets</Link>
          </Button>
          <Button asChild>
            <Link href="/providers">Find Care</Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">My Pets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-serif text-primary">{dashboard.petCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Upcoming Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-serif">{dashboard.upcomingBookingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed Care</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-serif">{dashboard.completedBookingCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Spent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold font-serif">${(dashboard.totalSpentCents / 100).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold font-serif">Upcoming Bookings</h2>
          {dashboard.upcomingBookings.length === 0 ? (
            <Card className="border-dashed">
              <CardContent className="flex flex-col items-center justify-center h-48 text-center space-y-4">
                <Calendar className="w-12 h-12 text-muted-foreground/50" />
                <div>
                  <p className="font-medium">No upcoming bookings</p>
                  <p className="text-sm text-muted-foreground">Time to schedule some care for your furry friends!</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/providers">Browse Providers</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {dashboard.upcomingBookings.map(booking => (
                <Card key={booking.id} className="hover-elevate">
                  <CardContent className="p-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold uppercase tracking-wider bg-accent text-accent-foreground px-2 py-1 rounded-full">
                          {booking.status}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground capitalize">
                          {booking.service?.serviceType}
                        </span>
                      </div>
                      <h3 className="font-bold text-lg">{booking.provider?.businessName} for {booking.pet?.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{format(new Date(booking.startAt), "MMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{format(new Date(booking.startAt), "h:mm a")}</span>
                        </div>
                      </div>
                    </div>
                    <div className="font-bold text-lg">${(booking.totalCents / 100).toFixed(2)}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-serif">Your Pets</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/pets">View all</Link>
            </Button>
          </div>
          
          <div className="space-y-4">
            {dashboard.pets.length === 0 ? (
              <Card className="bg-secondary/30 border-none shadow-none">
                <CardContent className="p-6 text-center space-y-2">
                  <PawPrint className="w-8 h-8 mx-auto text-primary/40" />
                  <p className="text-sm font-medium">No pets added yet</p>
                  <Button variant="link" size="sm" asChild className="text-primary">
                    <Link href="/pets">Add a pet</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              dashboard.pets.slice(0,3).map(pet => (
                <div key={pet.id} className="flex items-center gap-4 p-3 rounded-lg border bg-card">
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
                    {pet.photoUrl ? (
                      <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                    ) : (
                      <PawPrint className="w-6 h-6 text-primary/50" />
                    )}
                  </div>
                  <div>
                    <p className="font-bold">{pet.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{pet.breed || pet.species}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
