import { useGetHomeDiscovery } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Home() {
  const { data: discovery, isLoading } = useGetHomeDiscovery();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full py-20 md:py-32 bg-secondary/30 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(0,0,0,0.15) 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6 font-serif">
              Trusted neighborhood pet care.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find loving sitters, energetic walkers, and skilled groomers right in your community. Because pets are family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild className="text-lg rounded-full px-8 hover-elevate">
                <Link href="/providers">Find Care Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg rounded-full px-8 hover-elevate">
                <Link href="/become-a-provider">Become a Provider</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20">
        
        {/* Stats */}
        {!isLoading && discovery && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-border/50">
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-primary font-serif">{discovery.totalProviders}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Trusted Providers</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-primary font-serif">{discovery.totalCompletedBookings}</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Happy Pets</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-primary font-serif">5.0</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Average Rating</p>
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-4xl font-bold text-primary font-serif">100%</h3>
              <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">Neighborhood Love</p>
            </div>
          </div>
        )}

        {/* Featured Providers */}
        <section className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold font-serif">Featured in your area</h2>
            <Link href="/providers" className="text-primary font-semibold flex items-center gap-1 hover:underline">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-[300px] rounded-2xl" />)}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {discovery?.featured.map(provider => (
                <Link key={provider.id} href={`/providers/${provider.id}`}>
                  <Card className="h-full overflow-hidden hover-elevate transition-all border-none shadow-md hover:shadow-lg rounded-2xl cursor-pointer group">
                    <div className="h-32 bg-secondary relative">
                      {provider.coverPhotoUrl && (
                        <img src={provider.coverPhotoUrl} alt="" className="w-full h-full object-cover" />
                      )}
                      <div className="absolute -bottom-10 left-6">
                        <Avatar className="w-20 h-20 border-4 border-card shadow-sm">
                          <AvatarImage src={provider.photoUrl || ""} />
                          <AvatarFallback className="text-xl">{provider.businessName[0]}</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                    <CardContent className="pt-14 pb-6 px-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">{provider.businessName}</h3>
                        <div className="flex items-center gap-1 text-sm font-medium bg-secondary text-secondary-foreground px-2 py-0.5 rounded-md">
                          <Star className="w-3 h-3 fill-primary text-primary" />
                          <span>{provider.ratingAverage.toFixed(1)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm mb-4">
                        <MapPin className="w-4 h-4" />
                        <span>{provider.city}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {provider.serviceTypes.slice(0, 3).map(type => (
                          <span key={type} className="text-xs font-medium bg-accent/50 text-accent-foreground px-2 py-1 rounded-md capitalize">
                            {type}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
