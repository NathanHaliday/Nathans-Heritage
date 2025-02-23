
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Hobbies() {
  const hobbies = [
    {
      title: "Bass Guitar",
      content: "Playing bass guitar",
      image: "https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=500&q=80",
    },
    {
      title: "Yu-Gi-Oh!",
      content: "Trading card game enthusiast",
      image: "https://images.unsplash.com/photo-1625714508526-4f11e8304de0?w=500&q=80",
    },
    {
      title: "Speedcubing",
      content: "Solving Rubik's cubes quickly",
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&q=80",
    },
    {
      title: "Yo-Yo",
      content: "Performing yo-yo tricks",
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=500&q=80",
    },
    {
      title: "Gaming",
      content: "Video game enthusiast",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",
    },
    {
      title: "Mathematics",
      content: "Advanced high school mathematics",
      image: "https://images.unsplash.com/photo-1635372722656-389f87a941b7?w=500&q=80",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My Hobbies
      </motion.h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={hobby.image} 
                  alt={hobby.title}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </div>
              <CardHeader>
                <CardTitle>{hobby.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{hobby.content}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
