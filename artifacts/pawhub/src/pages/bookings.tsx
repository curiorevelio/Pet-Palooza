import { useListBookings } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

export default function Bookings() {
  const { data: bookings, isLoading } = useListBookings();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold font-serif">My Bookings</h1>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {bookings?.map(booking => (
            <Card key={booking.id}>
              <CardContent className="p-6 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg">{booking.provider?.businessName}</h3>
                  <p className="text-muted-foreground">{booking.pet?.name} - {booking.service?.serviceType}</p>
                  <p className="text-sm">{format(new Date(booking.startAt), "PPP p")}</p>
                </div>
                <div>
                  <span className="uppercase text-xs font-bold bg-secondary px-2 py-1 rounded-full">{booking.status}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
