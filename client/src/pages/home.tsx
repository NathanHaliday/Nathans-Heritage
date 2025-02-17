import { useQuery } from "@tanstack/react-query";
import { type Pepeha } from "@shared/schema";
import PepehaSection from "@/components/pepeha-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: pepeha, isLoading } = useQuery<Pepeha | null>({
    queryKey: ["/api/pepeha"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-32 w-full" />
        ))}
      </div>
    );
  }

  if (!pepeha) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Pepeha</h1>
        <p className="text-muted-foreground">
          Start by adding your Pepeha information in the Edit page.
        </p>
      </div>
    );
  }

  const sections = [
    { title: "Maunga (Mountain)", maori: pepeha.maunga, english: pepeha.maungaEnglish },
    { title: "Awa (River)", maori: pepeha.awa, english: pepeha.awaEnglish },
    { title: "Iwi (Tribe)", maori: pepeha.iwi, english: pepeha.iwiEnglish },
    { title: "Hapū (Sub-tribe)", maori: pepeha.hapu, english: pepeha.hapuEnglish },
    { title: "Marae", maori: pepeha.marae, english: pepeha.maraeEnglish },
    { title: "Tūpuna (Ancestors)", maori: pepeha.tupuna, english: pepeha.tupunaEnglish },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">My Pepeha</h1>
      <div className="max-w-2xl mx-auto">
        {sections.map((section, index) => (
          <PepehaSection key={index} {...section} index={index} />
        ))}
      </div>
    </div>
  );
}
