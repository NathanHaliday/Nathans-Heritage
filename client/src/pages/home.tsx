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
        <h1 className="text-4xl font-bold mb-8 text-center">My British & Viking Heritage</h1>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div className="relative w-full">
                <AspectRatio ratio={1}>
                  <img
                    src="attached_assets/Pepeha Portrait.png"
                    alt="Portrait of Nathan Haliday"
                    className="object-cover rounded-md"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-primary">About Me</h2>
                <p className="text-lg leading-relaxed">
                  I'm Nathan Haliday, and my roots stretch from New Zealand to the ancient Viking settlements of Britain. 
                  Currently calling Pokeno my home, I'm proud to be part of the Pokeno Razorbacks Softball Club.
                </p>
                <p className="text-lg leading-relaxed">
                  My connection to the Waikato River and my Nordic-British ancestry shapes who I am today. This journey 
                  through my heritage tells the story of how these diverse cultural threads have woven together.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold text-primary mb-4">Viking Heritage in Britain</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/50/Viking_Expansion.svg"
                  alt="Map showing Viking expansion routes in Britain"
                  className="w-full rounded-md"
                />
              </div>
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  The Vikings left an indelible mark on British history, establishing settlements 
                  across the British Isles. Their influence can still be seen today in place names, 
                  cultural practices, and the genetic makeup of many British people.
                </p>
                <p className="text-lg leading-relaxed">
                  My ancestors were part of this rich heritage, contributing to the diverse tapestry 
                  of British culture we see today.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}