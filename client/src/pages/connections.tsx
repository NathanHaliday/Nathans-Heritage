
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Hobbies() {
  const hobbies = [
    {
      title: "Bass Guitar",
      image: "https://images.unsplash.com/photo-1621784166258-c6fdfff31879?w=500&q=80",
    },
    {
      title: "Yu-Gi-Oh!",
      image: "https://images.unsplash.com/photo-1632406897798-e5645ed90595?w=500&q=80",
    },
    {
      title: "Speedcubing",
      image: "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=500&q=80",
    },
    {
      title: "Yo-Yo",
      image: "https://images.unsplash.com/photo-1589578527966-400c0d891c53?w=500&q=80",
    },
    {
      title: "Gaming",
      image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&q=80",
    },
    {
      title: "Mathematics",
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
                <CardTitle className="text-center">{hobby.title}</CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
