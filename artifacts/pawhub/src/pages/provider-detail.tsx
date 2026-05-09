import { useParams, Link } from "wouter";
import { useGetProvider, getGetProviderQueryKey } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin } from "lucide-react";

export default function ProviderDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: detail, isLoading } = useGetProvider(id, { query: { enabled: !!id, queryKey: getGetProviderQueryKey(id) } });

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8"><Skeleton className="h-64 w-full" /></div>;
  }

  if (!detail) return null;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card>
        <CardContent className="p-8 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold font-serif">{detail.provider.businessName}</h1>
              <div className="flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">{detail.provider.city}</span>
                <span className="text-muted-foreground ml-4">{detail.ratingAverage.toFixed(1)} stars ({detail.reviewCount} reviews)</span>
              </div>
            </div>
            {detail.provider.photoUrl && (
              <img src={detail.provider.photoUrl} alt="" className="w-24 h-24 rounded-full object-cover" />
            )}
          </div>
          <p>{detail.provider.bio}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold font-serif">Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {detail.services.map(service => (
          <Card key={service.id}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg capitalize">{service.serviceType}</h3>
                <p className="text-muted-foreground">{service.durationMinutes} mins</p>
                <p className="font-semibold text-primary">${(service.priceCents / 100).toFixed(2)}</p>
              </div>
              <Button asChild>
                <Link href={`/book/${detail.provider.id}/${service.id}`}>Book Now</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
