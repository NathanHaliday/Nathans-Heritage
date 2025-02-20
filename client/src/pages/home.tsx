import { useQuery } from "@tanstack/react-query";
import { type Heritage } from "@shared/schema";
import PepehaSection from "@/components/pepeha-section";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: heritage, isLoading } = useQuery<Heritage | null>({
    queryKey: ["/api/heritage"],
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

  if (!heritage) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Your Heritage Journey</h1>
        <p className="text-muted-foreground">
          Start by adding your German and Nordic heritage information in the Edit page.
        </p>
      </div>
    );
  }

  const sections = [
    { 
      title: "Hometown", 
      maori: heritage.hometownGerman, 
      english: heritage.hometown 
    },
    { 
      title: "River", 
      maori: heritage.riverGerman, 
      english: heritage.river 
    },
    { 
      title: "Region", 
      maori: heritage.regionGerman, 
      english: heritage.region 
    },
    { 
      title: "Viking Clan", 
      maori: heritage.clanNordic, 
      english: heritage.clan 
    },
    { 
      title: "Settlement", 
      maori: heritage.settlementGerman, 
      english: heritage.settlement 
    },
    { 
      title: "Ancestors", 
      maori: heritage.ancestorsNordic, 
      english: heritage.ancestors 
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-center">My Germanic & Nordic Heritage</h1>
      <div className="max-w-2xl mx-auto">
        {sections.map((section, index) => (
          <PepehaSection key={index} {...section} index={index} />
        ))}
      </div>
    </div>
  );
}