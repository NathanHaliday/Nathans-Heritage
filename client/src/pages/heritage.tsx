import { useQuery } from "@tanstack/react-query";
import { type Heritage } from "@shared/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export default function Heritage() {
  const { data: heritage, isLoading } = useQuery<Heritage>({
    queryKey: ["/api/heritage"],
  });

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-3xl mx-auto">
        <Skeleton className="h-12 w-2/3 mx-auto" />
        <Skeleton className="h-64 w-full" />
      </div>
    );
  }

  if (!heritage) {
    return null;
  }

  const sections = [
    {
      title: "Personal Identity",
      content: `I am ${heritage.name}`,
      className: "border-l-4 border-primary",
    },
    {
      title: "Ancestral Heritage",
      content: `My ancestors come from ${heritage.ancestors}`,
      className: "border-l-4 border-blue-500",
    },
    {
      title: "Significant Places",
      content: [
        `My land is ${heritage.land}`,
        `My river is ${heritage.river}`,
        `My home is ${heritage.home}`,
      ],
      className: "border-l-4 border-green-500",
    },
    {
      title: "Community",
      content: `My people are ${heritage.people}`,
      className: "border-l-4 border-purple-500",
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Heritage
      </motion.h1>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`shadow-lg ${section.className}`}>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-primary">
                  {section.title}
                </h2>
                {Array.isArray(section.content) ? (
                  <div className="space-y-2">
                    {section.content.map((line, i) => (
                      <p key={i} className="text-lg leading-relaxed">
                        {line}
                      </p>
                    ))}
                  </div>
                ) : (
                  <p className="text-lg leading-relaxed">{section.content}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}