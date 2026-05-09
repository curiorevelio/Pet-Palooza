import { useState } from "react";
import { useParams, useLocation } from "wouter";
import { useListPets, useListProviderAvailability, useCreateBooking, useGetProvider, getGetProviderQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

export default function Book() {
  const params = useParams();
  const providerId = Number(params.providerId);
  const serviceId = Number(params.serviceId);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const { data: pets } = useListPets();
  const { data: availability } = useListProviderAvailability(providerId, { query: { enabled: !!providerId, queryKey: ["availability", providerId] }});
  const { data: detail } = useGetProvider(providerId, { query: { enabled: !!providerId, queryKey: getGetProviderQueryKey(providerId) } });

  const createBooking = useCreateBooking();
  const [petId, setPetId] = useState<number | null>(null);
  const [slotId, setSlotId] = useState<number | null>(null);

  const handleBook = () => {
    if (!petId || !slotId) return;
    createBooking.mutate(
      { data: { petId, serviceId, slotId } },
      {
        onSuccess: () => {
          toast({ title: "Booking requested!" });
          setLocation("/bookings");
        }
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold font-serif">Book Appointment</h1>
      {detail && <p className="text-muted-foreground">Booking with {detail.provider.businessName}</p>}

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Pet</h2>
        <div className="flex gap-2">
          {pets?.map(pet => (
            <Button 
              key={pet.id} 
              variant={petId === pet.id ? "default" : "outline"}
              onClick={() => setPetId(pet.id)}
            >
              {pet.name}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Select Time Slot</h2>
        <div className="grid grid-cols-2 gap-2">
          {availability?.filter(a => !a.isBooked).map(slot => (
            <Button 
              key={slot.id} 
              variant={slotId === slot.id ? "default" : "outline"}
              onClick={() => setSlotId(slot.id)}
            >
              {format(new Date(slot.startAt), "MMM d, h:mm a")}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={handleBook} disabled={!petId || !slotId || createBooking.isPending} className="w-full">
        Confirm Booking
      </Button>
    </div>
  );
}
