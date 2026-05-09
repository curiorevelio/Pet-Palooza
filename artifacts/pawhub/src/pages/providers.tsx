import { useState, useMemo } from "react";
import { useListProviders, ServiceType } from "@workspace/api-client-react";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SERVICE_OPTIONS = [
  { value: "all", label: "All services" },
  { value: ServiceType.walking, label: "Walking" },
  { value: ServiceType.sitting, label: "Sitting" },
  { value: ServiceType.grooming, label: "Grooming" },
  { value: ServiceType.washing, label: "Washing" },
  { value: ServiceType.training, label: "Training" },
];

export default function Providers() {
  const [serviceType, setServiceType] = useState<string>("all");
  const [city, setCity] = useState("");

  const queryParams = useMemo(() => {
    const p: Record<string, string> = {};
    if (serviceType !== "all") p.serviceType = serviceType;
    if (city.trim()) p.city = city.trim();
    return p;
  }, [serviceType, city]);

  const { data: providers, isLoading } = useListProviders(queryParams, {
    query: { queryKey: ["providers", queryParams] },
  });

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold font-serif">Find Pet Care Providers</h1>
        <Card className="border-none shadow-sm">
          <CardContent className="p-4 flex flex-col md:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Filter by city (e.g. Brooklyn)"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={serviceType} onValueChange={setServiceType}>
              <SelectTrigger className="md:w-56">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SERVICE_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-[300px] rounded-2xl" />
          ))}
        </div>
      ) : !providers || providers.length === 0 ? (
        <Card className="text-center p-12">
          <p className="text-lg font-medium">No providers match your search</p>
          <p className="text-sm text-muted-foreground mt-2">Try clearing your filters.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {providers.map((provider) => (
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
                    <h3 className="text-xl font-bold font-serif group-hover:text-primary transition-colors">
                      {provider.businessName}
                    </h3>
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
                    {provider.serviceTypes.slice(0, 3).map((type) => (
                      <span
                        key={type}
                        className="text-xs font-medium bg-accent/50 text-accent-foreground px-2 py-1 rounded-md capitalize"
                      >
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
