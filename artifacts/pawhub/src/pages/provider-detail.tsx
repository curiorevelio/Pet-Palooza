import { useParams, Link } from "wouter";
import {
  useGetProvider,
  getGetProviderQueryKey,
  useListProviderReviews,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, MapPin, Clock, BadgeCheck } from "lucide-react";
import { format } from "date-fns";

export default function ProviderDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: detail, isLoading } = useGetProvider(id, {
    query: { enabled: !!id, queryKey: getGetProviderQueryKey(id) },
  });
  const { data: reviews } = useListProviderReviews(id, {
    query: { enabled: !!id, queryKey: ["provider-reviews", id] },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }
  if (!detail) return null;

  const upcomingSlots = (detail.upcomingSlots ?? []).filter((s) => !s.isBooked).slice(0, 12);

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <Card className="overflow-hidden">
        {detail.provider.coverPhotoUrl && (
          <div className="h-48 bg-secondary">
            <img src={detail.provider.coverPhotoUrl} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <CardContent className="p-8 space-y-4">
          <div className="flex justify-between items-start gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold font-serif">{detail.provider.businessName}</h1>
                {detail.provider.verified && (
                  <BadgeCheck className="w-6 h-6 text-primary" aria-label="Verified" />
                )}
              </div>
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {detail.provider.city}
                </span>
                <span className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  {detail.ratingAverage.toFixed(1)} ({detail.reviewCount} review{detail.reviewCount === 1 ? "" : "s"})
                </span>
                {detail.provider.yearsExperience != null && (
                  <span>{detail.provider.yearsExperience} yrs experience</span>
                )}
              </div>
            </div>
            {detail.provider.photoUrl && (
              <img
                src={detail.provider.photoUrl}
                alt=""
                className="w-24 h-24 rounded-full object-cover border-4 border-card shadow-sm"
              />
            )}
          </div>
          {detail.provider.bio && <p className="text-base leading-relaxed">{detail.provider.bio}</p>}
        </CardContent>
      </Card>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-serif">Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {detail.services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6 flex justify-between items-center gap-4">
                <div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-muted-foreground text-sm capitalize">
                    {service.serviceType} • {service.durationMinutes} mins
                  </p>
                  <p className="font-semibold text-primary mt-1">
                    ${(service.priceCents / 100).toFixed(2)}
                  </p>
                </div>
                <Button asChild>
                  <Link href={`/book/${detail.provider.id}/${service.id}`}>Book Now</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-serif">Upcoming availability</h2>
        {upcomingSlots.length === 0 ? (
          <p className="text-muted-foreground">No availability listed yet — check back soon.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {upcomingSlots.map((slot) => (
              <div
                key={slot.id}
                className="rounded-lg border bg-card p-3 text-sm"
              >
                <div className="font-semibold">{format(new Date(slot.startAt), "EEE, MMM d")}</div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  {format(new Date(slot.startAt), "h:mm a")}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold font-serif">Reviews</h2>
        {!reviews || reviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-6 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary" />
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(r.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  {r.body && <p>{r.body}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
