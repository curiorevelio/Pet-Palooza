import { useListMyProviderBookings, useUpdateBookingStatus } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { BookingStatus } from "@workspace/api-client-react";

export default function ProviderBookings() {
  const { data: bookings, isLoading } = useListMyProviderBookings();
  const updateStatus = useUpdateBookingStatus();
  const queryClient = useQueryClient();

  const handleUpdate = (id: number, status: BookingStatus) => {
    updateStatus.mutate(
      { id, data: { status } },
      { onSuccess: () => queryClient.invalidateQueries() }
    );
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold font-serif">Incoming Bookings</h1>

      <div className="space-y-4">
        {bookings?.map(booking => (
          <Card key={booking.id}>
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase bg-accent px-2 py-1 rounded-full">{booking.status}</span>
                  <span className="font-semibold text-lg">{booking.service?.serviceType}</span>
                </div>
                <p className="text-muted-foreground">{booking.pet?.name} (Owner: {booking.pet?.ownerId})</p>
                <p className="text-sm">{format(new Date(booking.startAt), "PPP p")}</p>
                <p className="font-bold text-primary mt-2">${(booking.totalCents / 100).toFixed(2)}</p>
                {booking.notes && <p className="text-sm italic mt-2">"{booking.notes}"</p>}
              </div>

              <div className="flex flex-col gap-2 min-w-[120px]">
                {booking.status === "requested" && (
                  <>
                    <Button onClick={() => handleUpdate(booking.id, "confirmed")}>Confirm</Button>
                    <Button variant="outline" onClick={() => handleUpdate(booking.id, "cancelled")}>Cancel</Button>
                  </>
                )}
                {booking.status === "confirmed" && (
                  <Button onClick={() => handleUpdate(booking.id, "completed")}>Mark Completed</Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
