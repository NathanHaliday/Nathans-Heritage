import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { insertPepehaSchema, type InsertPepeha, type Pepeha } from "@shared/schema";
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
  const { data: pepeha } = useQuery<Pepeha | null>({ queryKey: ["/api/pepeha"] });

  const form = useForm<InsertPepeha>({
    resolver: zodResolver(insertPepehaSchema),
    defaultValues: pepeha || {
      maungaEnglish: "",
      maunga: "",
      awaEnglish: "",
      awa: "",
      iwiEnglish: "",
      iwi: "",
      hapuEnglish: "",
      hapu: "",
      maraeEnglish: "",
      marae: "",
      tupunaEnglish: "",
      tupuna: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertPepeha) => {
      const res = await apiRequest("POST", "/api/pepeha", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pepeha"] });
      toast({
        title: "Success",
        description: "Your introduction has been updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update your introduction",
        variant: "destructive",
      });
    },
  });

  const fields = [
    { 
      label: "Mountain Name (English)", 
      name: "maungaEnglish",
      description: "The mountain you identify with"
    },
    { 
      label: "Mountain Name (Māori)", 
      name: "maunga",
      description: "Maunga - Traditional name of your mountain" 
    },
    { 
      label: "River or Water Body (English)", 
      name: "awaEnglish",
      description: "The river or water body you identify with"
    },
    { 
      label: "River or Water Body (Māori)", 
      name: "awa",
      description: "Awa - Traditional name of your river" 
    },
    { 
      label: "Tribe Name (English)", 
      name: "iwiEnglish",
      description: "Your tribal affiliation"
    },
    { 
      label: "Tribe Name (Māori)", 
      name: "iwi",
      description: "Iwi - Your tribe's traditional name" 
    },
    { 
      label: "Subtribe Name (English)", 
      name: "hapuEnglish",
      description: "Your subtribe or clan"
    },
    { 
      label: "Subtribe Name (Māori)", 
      name: "hapu",
      description: "Hapū - Your subtribe's traditional name" 
    },
    { 
      label: "Meeting House (English)", 
      name: "maraeEnglish",
      description: "Your community's gathering place"
    },
    { 
      label: "Meeting House (Māori)", 
      name: "marae",
      description: "Marae - Traditional name of your meeting house" 
    },
    { 
      label: "Ancestors (English)", 
      name: "tupunaEnglish",
      description: "Names of your ancestors"
    },
    { 
      label: "Ancestors (Māori)", 
      name: "tupuna",
      description: "Tūpuna - Traditional names of your ancestors" 
    },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Your Cultural Introduction</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {fields.map(({ label, name, description }) => (
            <FormField
              key={name}
              control={form.control}
              name={name as keyof InsertPepeha}
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
            {mutation.isPending ? "Saving..." : "Save Introduction"}
          </Button>
        </form>
      </Form>
    </div>
  );
}