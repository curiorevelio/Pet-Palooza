import { useState } from "react";
import {
  useListPets,
  useCreatePet,
  useUpdatePet,
  useDeletePet,
  PetSpecies,
  type Pet,
} from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { PawPrint, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FormState = {
  name: string;
  species: keyof typeof PetSpecies;
  breed: string;
  ageYears: string;
  weightLbs: string;
  notes: string;
  photoUrl: string;
};

const empty: FormState = {
  name: "",
  species: "dog",
  breed: "",
  ageYears: "",
  weightLbs: "",
  notes: "",
  photoUrl: "",
};

export default function Pets() {
  const { data: pets, isLoading, refetch } = useListPets();
  const createPet = useCreatePet();
  const updatePet = useUpdatePet();
  const deletePet = useDeletePet();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Pet | null>(null);
  const [form, setForm] = useState<FormState>(empty);

  function startCreate() {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  }
  function startEdit(pet: Pet) {
    setEditing(pet);
    setForm({
      name: pet.name,
      species: pet.species,
      breed: pet.breed ?? "",
      ageYears: pet.ageYears != null ? String(pet.ageYears) : "",
      weightLbs: pet.weightLbs != null ? String(pet.weightLbs) : "",
      notes: pet.notes ?? "",
      photoUrl: pet.photoUrl ?? "",
    });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    const payload = {
      name: form.name.trim(),
      species: form.species,
      breed: form.breed.trim() || null,
      ageYears: form.ageYears ? Number(form.ageYears) : null,
      weightLbs: form.weightLbs ? Number(form.weightLbs) : null,
      notes: form.notes.trim() || null,
      photoUrl: form.photoUrl.trim() || null,
    };
    try {
      if (editing) {
        await updatePet.mutateAsync({ id: editing.id, data: payload });
        toast({ title: `Updated ${payload.name}` });
      } else {
        await createPet.mutateAsync({ data: payload });
        toast({ title: `Added ${payload.name}` });
      }
      setOpen(false);
      await refetch();
    } catch (e) {
      toast({ title: "Save failed", description: String(e), variant: "destructive" });
    }
  }

  async function handleDelete(pet: Pet) {
    if (!confirm(`Remove ${pet.name}?`)) return;
    try {
      await deletePet.mutateAsync({ id: pet.id });
      toast({ title: `Removed ${pet.name}` });
      await refetch();
    } catch (e) {
      toast({ title: "Delete failed", description: String(e), variant: "destructive" });
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-serif">My Pets</h1>
        <Button onClick={startCreate}>Add Pet</Button>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : !pets || pets.length === 0 ? (
        <Card className="text-center p-12">
          <PawPrint className="mx-auto w-12 h-12 text-muted-foreground opacity-50 mb-4" />
          <p className="text-lg font-medium">No pets added yet</p>
          <Button className="mt-4" onClick={startCreate}>
            Add your first pet
          </Button>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              {pet.photoUrl && (
                <div className="h-40 bg-secondary">
                  <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                </div>
              )}
              <CardContent className="p-6 space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <h3 className="font-bold text-xl">{pet.name}</h3>
                    <p className="capitalize text-muted-foreground text-sm">
                      {pet.species}
                      {pet.breed ? ` • ${pet.breed}` : ""}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Button size="icon" variant="ghost" onClick={() => startEdit(pet)} aria-label="Edit">
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(pet)} aria-label="Delete">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                {(pet.ageYears != null || pet.weightLbs != null) && (
                  <p className="text-sm text-muted-foreground">
                    {pet.ageYears != null ? `${pet.ageYears} yr` : ""}
                    {pet.ageYears != null && pet.weightLbs != null ? " • " : ""}
                    {pet.weightLbs != null ? `${pet.weightLbs} lb` : ""}
                  </p>
                )}
                {pet.notes && <p className="text-sm italic">{pet.notes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? `Edit ${editing.name}` : "Add a pet"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Species</Label>
                <Select
                  value={form.species}
                  onValueChange={(v) => setForm({ ...form, species: v as keyof typeof PetSpecies })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dog">Dog</SelectItem>
                    <SelectItem value="cat">Cat</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="breed">Breed</Label>
                <Input id="breed" value={form.breed} onChange={(e) => setForm({ ...form, breed: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age">Age (years)</Label>
                <Input
                  id="age"
                  type="number"
                  min={0}
                  value={form.ageYears}
                  onChange={(e) => setForm({ ...form, ageYears: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  min={0}
                  value={form.weightLbs}
                  onChange={(e) => setForm({ ...form, weightLbs: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo">Photo URL</Label>
              <Input id="photo" value={form.photoUrl} onChange={(e) => setForm({ ...form, photoUrl: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave} disabled={createPet.isPending || updatePet.isPending}>
              {editing ? "Save changes" : "Add pet"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
