import { useListMyServices, useCreateMyService, useDeleteMyService } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ServiceType } from "@workspace/api-client-react";

export default function ProviderServices() {
  const { data: services } = useListMyServices();
  const createService = useCreateMyService();
  const deleteService = useDeleteMyService();
  const queryClient = useQueryClient();

  const [type, setType] = useState<ServiceType>("walking");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleAdd = () => {
    createService.mutate(
      {
        data: {
          serviceType: type,
          title,
          priceCents: Math.round(parseFloat(price) * 100),
          durationMinutes: parseInt(duration, 10),
        }
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          setTitle("");
          setPrice("");
          setDuration("");
        }
      }
    );
  };

  const handleDelete = (id: number) => {
    deleteService.mutate(
      { id },
      { onSuccess: () => queryClient.invalidateQueries() }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <h1 className="text-3xl font-bold font-serif">My Services</h1>

      <Card>
        <CardContent className="p-6 space-y-4">
          <h2 className="text-xl font-semibold">Add New Service</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <Select value={type} onValueChange={(v: ServiceType) => setType(v)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {Object.values(ServiceType).map(t => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input type="number" placeholder="Price ($)" value={price} onChange={(e) => setPrice(e.target.value)} />
            <Input type="number" placeholder="Duration (min)" value={duration} onChange={(e) => setDuration(e.target.value)} />
            <Button onClick={handleAdd} disabled={!title || !price || !duration || createService.isPending}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services?.map(service => (
          <Card key={service.id}>
            <CardContent className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">{service.title || service.serviceType}</h3>
                <p className="text-muted-foreground capitalize">{service.serviceType}</p>
                <p className="text-sm">{service.durationMinutes} mins • ${(service.priceCents / 100).toFixed(2)}</p>
              </div>
              <Button variant="destructive" size="icon" onClick={() => handleDelete(service.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
