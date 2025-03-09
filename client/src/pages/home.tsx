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
        <h1 className="text-5xl font-bold mb-11 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent" style={{ lineHeight: "1.5" }}>
          My British & Viking Heritage
        </h1>

        <Card className="mb-12 shadow-xl overflow-hidden">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative w-full">
                <AspectRatio ratio={0.68}>
                  <img
                    src="https://i.imgur.com/FoDQErJ.jpeg"
                    alt="Portrait of Nathan Haliday"
                    className="w-full rounded-lg shadow-lg"
                  />
                </AspectRatio>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-semibold text-primary" style={{ lineHeight: "1.2" }}>About Me</h2>
                <p className="text-lg leading-relaxed">
                  I'm Nathan Haliday, and I was born in New Zealand, Middlemore Hospital. My roots stretch out to the ancient Viking settlements of Britain, near Hull, where my Grandmother on my Mother's side was from.
                  Currently calling Pōkeno my home, I'm proud to be part of the Pōkeno Razorbacks Softball Club, playing for the U15s and umpiring other games.
                </p>
                <p className="text-lg leading-relaxed">
                  Pōkeno is famous for its ice creams, Pōkeno Bacon, and once lay within the territory of local Māori
                  tribes. The area is infused with cultural heritage and significance. The Queen’s Redoubt, a major historical site, was the launching pad for the July 1863 British Invasion, starting the Waikato War.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-xl overflow-hidden mb-0">
          <CardContent className="p-8">
            <h2 className="text-3xl font-semibold text-primary mb-8" style={{ lineHeight: "1.2" }}>Viking Heritage in Britain</h2>
            <div className="grid md:grid-cols-1 gap-8">
              <div>
                <a href="https://en.wikipedia.org/wiki/Viking_expansion" target="_blank" rel="noopener noreferrer">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/50/Viking_Expansion.svg"
                    alt="Map showing Viking expansion routes in Britain"
                    className="w-full rounded-lg shadow-lg transition-transform hover:scale-105"
                  />
                </a>
              </div>
              <div className="space-y-5">
                <p className="text-lg leading-relaxed">
                  The Vikings left a lasting mark on British history, establishing settlements 
                  across the British Isles. Their influence can still be seen today in place names, 
                  cultural practices, and the genetic makeup of many British people, including myself and my family.
                </p>
                <p className="text-lg leading-relaxed">
                  My ancestors were part of this heritage, contributing to the diversity 
                  of British culture we see today. In the Ninth Century, Ragnar Lodbrok, a Viking hero and a Swedish and Danish king, conducted many raids in the British Isles and the Carolingian Empire. He appears in many Norse legends, and although his existence is debated, Ragnar was undoubtedly a fierce warrior feared by people of the middle ages. My family traces back to Hull, UK in the 9th Century, so it is possible I am related to Ragnar Lodbrok.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}