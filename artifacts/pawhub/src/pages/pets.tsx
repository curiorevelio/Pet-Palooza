import { useListPets } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PawPrint } from "lucide-react";

export default function Pets() {
  const { data: pets, isLoading } = useListPets();

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif">My Pets</h1>
        <Button>Add Pet</Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : pets?.length === 0 ? (
        <Card className="text-center p-12">
          <PawPrint className="mx-auto w-12 h-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-lg font-medium">No pets added yet</p>
          <Button className="mt-4">Add your first pet</Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pets?.map(pet => (
            <Card key={pet.id}>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl">{pet.name}</h3>
                <p className="capitalize text-muted-foreground">{pet.species} {pet.breed ? `- ${pet.breed}` : ""}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
