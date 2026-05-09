import { useGetMyProvider, useUpsertMyProvider } from "@workspace/api-client-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  businessName: z.string().min(1, "Business Name is required"),
  bio: z.string().optional(),
  city: z.string().min(1, "City is required"),
  zipCode: z.string().optional(),
  photoUrl: z.string().optional(),
  coverPhotoUrl: z.string().optional(),
  yearsExperience: z.coerce.number().min(0).optional(),
});

export default function BecomeProvider() {
  const [, setLocation] = useLocation();
  const { data: myProvider } = useGetMyProvider();
  const upsertProvider = useUpsertMyProvider();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessName: "",
      bio: "",
      city: "",
      zipCode: "",
      photoUrl: "",
      coverPhotoUrl: "",
      yearsExperience: 0,
    },
  });

  useEffect(() => {
    if (myProvider?.provider) {
      form.reset({
        businessName: myProvider.provider.businessName,
        bio: myProvider.provider.bio || "",
        city: myProvider.provider.city,
        zipCode: myProvider.provider.zipCode || "",
        photoUrl: myProvider.provider.photoUrl || "",
        coverPhotoUrl: myProvider.provider.coverPhotoUrl || "",
        yearsExperience: myProvider.provider.yearsExperience || 0,
      });
    }
  }, [myProvider, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    upsertProvider.mutate(
      { data: values },
      {
        onSuccess: () => {
          queryClient.invalidateQueries();
          toast({ title: "Welcome to PawHub!" });
          setLocation("/provider");
        },
      }
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold font-serif">Become a Provider</h1>
      <p className="text-muted-foreground">Join our neighborhood of trusted pet care professionals.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Business Name</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="zipCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zip Code</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="yearsExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl><Input type="number" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl><Textarea rows={4} {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="photoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Photo URL</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="coverPhotoUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Photo URL</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={upsertProvider.isPending} className="w-full">
            Complete Profile
          </Button>
        </form>
      </Form>
    </div>
  );
}
