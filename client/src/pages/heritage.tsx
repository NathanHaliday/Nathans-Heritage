import { useQuery } from "@tanstack/react-query";
import { type Heritage } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Heritage() {
  const { data: heritage, isLoading } = useQuery<Heritage | null>({
    queryKey: ["/api/heritage"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!heritage) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">My British Heritage</h1>
        <p className="text-muted-foreground mb-4">
          Heritage information is being loaded...
        </p>
      </div>
    );
  }

  const lines = [
    `My name is ${heritage.name}`,
    `My land is ${heritage.land}`,
    `My river is ${heritage.river}`,
    `My ancestors come from ${heritage.ancestors}`,
    `My people are ${heritage.people}`,
    `My home is ${heritage.home}`,
    `I am ${heritage.name}`,
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">My British Heritage</h1>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {lines.map((line, index) => (
              <p 
                key={index} 
                className="text-lg font-medium leading-relaxed"
              >
                {line}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}