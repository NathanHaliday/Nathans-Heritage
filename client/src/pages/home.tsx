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
        <h1 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
          My British & Viking Heritage
        </h1>

        <Card className="mb-12 shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full">
                <AspectRatio ratio={1}>
                  <img
                    src="/attached_assets/Pepeha_Portrait.png"
                    alt="Portrait of Nathan Haliday"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-primary">About Me</h2>
                <p className="text-lg leading-relaxed">
                  I'm Nathan Haliday, and I was born in New Zealand, Middlemore Hospital. My roots stretch out to the ancient Viking settlements of Britain, near Hull.
                  Currently calling Pokeno my home, I'm proud to be part of the Pokeno Razorbacks Softball Club, playing for the U15s and umpiring other games.
                </p>
                <p className="text-lg leading-relaxed">
                  Living in Pokeno means the Waikato River is quite important to me, and it is New Zealand's longest river which generates 10% of the nation's electricity through hydro-electric dams.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl overflow-hidden">
          <CardContent className="p-8">
            <h2 className="text-3xl font-semibold text-primary mb-8">Viking Heritage in Britain</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/50/Viking_Expansion.svg"
                  alt="Map showing Viking expansion routes in Britain"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-5">
                <p className="text-lg leading-relaxed">
                  The Vikings left a prominent mark on British history, establishing settlements 
                  across the British Isles. Their influence can still be seen today in place names, 
                  cultural practices, and the genetic makeup of many British people, including myself. In the Ninth Century, Ragnar Lodbrok, a Danish king and warrior, travelled through Hull, rading villages in England.
                </p>
                <p className="text-lg leading-relaxed">
                  My ancestors were part of this rich heritage, contributing to the diverse variety 
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