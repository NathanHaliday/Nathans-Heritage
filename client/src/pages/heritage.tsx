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
      content: `My name is Nathan Haliday. The Haliday name originated in the Scottish and English borders, particularly Annandale, Scotland. Some sources suggest the name comes from "Holy Day," either as a location-based surname or as a war cry used by the family.`,
      className: "border-l-4 border-primary",
      image: "https://i.imgur.com/brL09zc.jpeg"
    },
    {
      title: "Ancestral Heritage",
      content: `My ancestry blends Nordic and British roots, tracing back to Hull, UK, a key Viking settlement. The Vikings shaped the region’s culture, names, and genetics, making Viking heritage in my lineage likely, possibly even linking to Ragnar Lodbrok.`,
      className: "border-l-4 border-yellow-500",
      image: "https://scandinaviafacts.com/wp-content/uploads/2022/03/viking-country.jpg"
    },
    {
      title: "Significant Places",
      content: [
        `I am from New Zealand, a country celebrated for its rich Māori culture, stunning landscapes, and The Lord of the Rings movies. The Waikato River, New Zealand's longest river, flows through my homeland, holding great spiritual and cultural importance for the local Māori tribes. I currently live in Pōkeno, a town with a rich history.`,
      ],
      className: "border-l-4 border-green-500",
      image: "https://thumbnailer.digitalnz.org/?src=https%3A%2F%2Fnzhistory.govt.nz%2Ffiles%2Fstyles%2Ffullsize%2Fpublic%2Fimages%2Fpokeno-nz-wars-memorial.jpg%3Fitok%3D6WosfRqo"
    },
    {
      title: "Community",
      content: [
        `• I'm proud to be part of the Pōkeno Razorbacks Softball Club, a community-focused organization aiming to build a lasting softball presence in Pōkeno, and was established in 2022.`,

`• I'm also a member of Tuakau College's EPro8 Club, which engages students in science and engineering challenges to develop robotics skills.`,

`• Additionally, I've joined the Tuakau College Interact Club, a youth organization that encourages leadership and community service.`,
      ],
      className: "border-l-4 border-purple-500",
      image: "https://prodcdn.sporty.co.nz/cms/23153/1423079/1423080/d7e744ee-e3ee-4b86-b864-f0039f1c9cab_wo.png?t=638243516975170000"
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ lineHeight: "1.5" }}
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
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full rounded-lg shadow-lg mb-4"
                />
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