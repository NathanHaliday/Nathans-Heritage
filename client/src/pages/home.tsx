import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to My British Heritage Journey</h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative w-full aspect-[3/4]">
                <AspectRatio ratio={3/4} className="bg-muted">
                  <img
                    src="/attached_assets/Pepeha Portrait.png"
                    alt="Portrait showcasing my connection to British heritage"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">About Me</h2>
                <p className="text-lg leading-relaxed">
                  Welcome to my personal heritage journey. Here you'll discover my British roots,
                  family connections, and the places that have shaped who I am.
                </p>
                <p className="text-lg leading-relaxed">
                  Explore my full heritage narrative and family connections through the navigation menu above.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}