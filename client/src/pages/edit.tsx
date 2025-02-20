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
      name: "",
      land: "",
      river: "",
      mountain: "",
      ancestors: "",
      people: "",
      home: "",
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
      label: "Your Name", 
      name: "name",
      description: "Your full name"
    },
    { 
      label: "Your Land", 
      name: "land",
      description: "A significant place to you – e.g., your home county or city" 
    },
    { 
      label: "Your River", 
      name: "river",
      description: "A river significant to you – e.g., Thames, Mersey, Avon" 
    },
    { 
      label: "Your Mountain", 
      name: "mountain",
      description: "A mountain or hill important to you – e.g., Scafell Pike, Ben Nevis, One Tree Hill" 
    },
    { 
      label: "Your Ancestors", 
      name: "ancestors",
      description: "Your family's historical roots – e.g., Anglo-Saxon, Celtic, Norse" 
    },
    { 
      label: "Your People", 
      name: "people",
      description: "A community or cultural group important to you – e.g., the people of Yorkshire, the Londoners" 
    },
    { 
      label: "Your Home", 
      name: "home",
      description: "Your home or region – e.g., the rolling hills of Somerset, the streets of Manchester" 
    }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Your British Heritage</h1>
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