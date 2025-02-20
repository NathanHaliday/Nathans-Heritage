import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { insertHeritageSchema, type InsertHeritage, type Heritage } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";

export default function Edit() {
  const { toast } = useToast();
  const { data: heritage } = useQuery<Heritage | null>({ queryKey: ["/api/heritage"] });

  const form = useForm<InsertHeritage>({
    resolver: zodResolver(insertHeritageSchema),
    defaultValues: heritage || {
      hometown: "",
      hometownGerman: "",
      river: "",
      riverGerman: "",
      region: "",
      regionGerman: "",
      clan: "",
      clanNordic: "",
      settlement: "",
      settlementGerman: "",
      ancestors: "",
      ancestorsNordic: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertHeritage) => {
      const res = await apiRequest("POST", "/api/heritage", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/heritage"] });
      toast({
        title: "Success",
        description: "Your heritage information has been updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update your heritage information",
        variant: "destructive",
      });
    },
  });

  const fields = [
    { 
      label: "Hometown (English)", 
      name: "hometown",
      description: "Your hometown or city of origin"
    },
    { 
      label: "Hometown (German)", 
      name: "hometownGerman",
      description: "The German name of your hometown (if applicable)" 
    },
    { 
      label: "River", 
      name: "river",
      description: "The river associated with your heritage"
    },
    { 
      label: "River (German)", 
      name: "riverGerman",
      description: "The German name of the river (e.g. Rhein, Donau)" 
    },
    { 
      label: "Region", 
      name: "region",
      description: "Your ancestral region or state"
    },
    { 
      label: "Region (German)", 
      name: "regionGerman",
      description: "The German name of your region (e.g. Bayern, Sachsen)" 
    },
    { 
      label: "Viking Clan", 
      name: "clan",
      description: "Your Viking clan or lineage"
    },
    { 
      label: "Clan (Nordic)", 
      name: "clanNordic",
      description: "The Nordic name of your clan (if known)" 
    },
    { 
      label: "Settlement", 
      name: "settlement",
      description: "Your ancestral settlement or village"
    },
    { 
      label: "Settlement (German)", 
      name: "settlementGerman",
      description: "The German name of your settlement" 
    },
    { 
      label: "Notable Ancestors", 
      name: "ancestors",
      description: "Your notable ancestors (like Ragnar Lodbrok)"
    },
    { 
      label: "Ancestors (Nordic)", 
      name: "ancestorsNordic",
      description: "The Nordic names of your ancestors" 
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Your Heritage</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {fields.map(({ label, name, description }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof InsertHeritage}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{label}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>{description}</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save Heritage"}
          </Button>
        </form>
      </Form>
    </div>
  );
}