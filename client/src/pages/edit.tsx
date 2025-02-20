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
      maunga: "",
      maungaEnglish: "",
      awa: "",
      awaEnglish: "",
      iwi: "",
      iwiEnglish: "",
      hapu: "",
      hapuEnglish: "",
      marae: "",
      maraeEnglish: "",
      tupuna: "",
      tupunaEnglish: "",
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
        description: "Your Pepeha has been updated",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update Pepeha",
        variant: "destructive",
      });
    },
  });

  const fields = [
    { label: "Maunga", name: "maunga" },
    { label: "Maunga (English)", name: "maungaEnglish" },
    { label: "Awa", name: "awa" },
    { label: "Awa (English)", name: "awaEnglish" },
    { label: "Iwi", name: "iwi" },
    { label: "Iwi (English)", name: "iwiEnglish" },
    { label: "Hapū", name: "hapu" },
    { label: "Hapū (English)", name: "hapuEnglish" },
    { label: "Marae", name: "marae" },
    { label: "Marae (English)", name: "maraeEnglish" },
    { label: "Tūpuna", name: "tupuna" },
    { label: "Tūpuna (English)", name: "tupunaEnglish" },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Edit Pepeha</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => mutation.mutate(data))}
          className="space-y-6"
        >
          {fields.map(({ label, name }) => (
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
            {mutation.isPending ? "Saving..." : "Save Pepeha"}
          </Button>
        </form>
      </Form>
    </div>
  );
}