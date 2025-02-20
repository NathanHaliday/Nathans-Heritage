import { useQuery } from "@tanstack/react-query";
import { type Heritage } from "@shared/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, Users, Home, History } from "lucide-react";

export default function Connections() {
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
        <h1 className="text-2xl font-bold mb-4">Family & Places</h1>
        <p className="text-muted-foreground">
          Please add your heritage information first.
        </p>
      </div>
    );
  }

  const connections = [
    {
      icon: History,
      title: "Ancestral Roots",
      content: heritage.ancestors,
    },
    {
      icon: Users,
      title: "My People",
      content: heritage.people,
    },
    {
      icon: MapPin,
      title: "Significant Places",
      content: heritage.land,
    },
    {
      icon: Home,
      title: "My Home",
      content: heritage.home,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Family & Important Places</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {connections.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center gap-4">
              <item.icon className="h-8 w-8 text-primary" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg">{item.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
