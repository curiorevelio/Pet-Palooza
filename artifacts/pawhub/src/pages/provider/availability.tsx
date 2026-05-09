import { useListMyAvailability, useCreateMyAvailability, useDeleteMyAvailability } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

export default function ProviderAvailability() {
  const { data: availability } = useListMyAvailability();
  const createAvailability = useCreateMyAvailability();
  const deleteAvailability = useDeleteMyAvailability();
  const queryClient = useQueryClient();

  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");

  const handleAdd = () => {
    createAvailability.mutate(
      {
        data: {
          startAt: new Date(startAt).toISOString(),
          endAt: new Date(endAt).toISOString(),
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          setStartAt("");
          setEndAt("");
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteAvailability.mutate(
      { id },
      { onSuccess: () => queryClient.invalidateQueries() }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold font-serif">Manage Availability</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add Time Slot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input type="datetime-local" value={startAt} onChange={e => setStartAt(e.target.value)} />
            <Input type="datetime-local" value={endAt} onChange={e => setEndAt(e.target.value)} />
            <Button onClick={handleAdd} disabled={!startAt || !endAt || createAvailability.isPending}>Add Slot</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {availability?.map(slot => (
          <Card key={slot.id} className={slot.isBooked ? "opacity-50" : ""}>
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="font-semibold">{format(new Date(slot.startAt), "MMM d, yyyy")}</p>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(slot.startAt), "h:mm a")} - {format(new Date(slot.endAt), "h:mm a")}
                </p>
                {slot.isBooked && <span className="text-xs text-primary font-bold">Booked</span>}
              </div>
              {!slot.isBooked && (
                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive hover:bg-destructive/10" onClick={() => handleDelete(slot.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
