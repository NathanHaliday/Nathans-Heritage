
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

export default function Hobbies() {
  const hobbies = [
    {
      title: "Bass Guitar",
      image: "https://mitchellguitars.com/wp-content/uploads/2018/11/Mitchell-FB-Series-Bass-Main-Mobile.jpg",
    },
    {
      title: "Yu-Gi-Oh!",
      image: "https://i.ytimg.com/vi/7WJKIiFSj4k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgSyhFMA8=&rs=AOn4CLDdbjV5XCNjHMaeSjzzAF1rb_nUfw",
    },
    {
      title: "Speedcubing",
      image: "https://images.squarespace-cdn.com/content/v1/582cd3322994caad8bdc6c11/f45d4249-8c93-47f0-a883-1cd8bf2eacc9/Seedcubing-2024-LaurynMackenzie.jpg",
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
