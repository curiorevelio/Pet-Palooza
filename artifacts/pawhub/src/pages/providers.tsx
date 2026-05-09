import { useListProviders } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Providers() {
  const { data: providers, isLoading } = useListProviders();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold font-serif">Find Pet Care Providers</h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-[300px] rounded-2xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers?.map(provider => (
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
                <CardContent className="pt-14 pb-6 px-6 flex flex-col h-[calc(100%-8rem)]">
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
    </div>
  );
}
