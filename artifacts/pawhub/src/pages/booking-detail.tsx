import { useParams } from "wouter";
import { useGetBooking } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function BookingDetail() {
  const params = useParams();
  const id = Number(params.id);
  const { data: booking, isLoading } = useGetBooking(id, { query: { enabled: !!id, queryKey: ["booking", id] } });

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!booking) return null;

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold font-serif">Booking Details</h1>

      <Card>
        <CardContent className="p-8 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold">{booking.provider?.businessName}</h2>
              <p className="text-muted-foreground capitalize">{booking.service?.serviceType}</p>
            </div>
            <span className="uppercase text-sm font-bold bg-accent px-3 py-1 rounded-full">{booking.status}</span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Pet</p>
              <p className="font-semibold">{booking.pet?.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Time</p>
              <p className="font-semibold">{format(new Date(booking.startAt), "PPP p")}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="font-semibold">${(booking.totalCents / 100).toFixed(2)}</p>
            </div>
          </div>

          {booking.notes && (
            <div>
              <p className="text-sm text-muted-foreground">Notes</p>
              <p className="italic">{booking.notes}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
