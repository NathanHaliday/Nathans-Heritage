import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { link } from "fs";

export default function Hobbies() {
  const hobbies = [
    {
      title: "Softball",
      image: "https://www.okc.gov/home/showpublishedimage/9060/636461886621000000",
      wikipediaLink: "https://www.sporty.co.nz/pokenorazorbacks/home-plate"
    },
    {
      title: "Bass Guitar",
      image: "https://mitchellguitars.com/wp-content/uploads/2018/11/Mitchell-FB-Series-Bass-Main-Mobile.jpg",
      wikipediaLink: "https://www.studybass.com/"
    },
    {
      title: "Yu-Gi-Oh!",
      image: "https://i.ytimg.com/vi/7WJKIiFSj4k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGHIgSyhFMA8=&rs=AOn4CLDdbjV5XCNjHMaeSjzzAF1rb_nUfw",
      wikipediaLink: "https://en.wikipedia.org/wiki/Yu-Gi-Oh!"
    },
    {
      title: "Speedcubing",
      image: "https://images.squarespace-cdn.com/content/v1/582cd3322994caad8bdc6c11/f45d4249-8c93-47f0-a883-1cd8bf2eacc9/Seedcubing-2024-LaurynMackenzie.jpg",
      wikipediaLink: "https://www.worldcubeassociation.org/"
    },
    {
      title: "Yo-yo",
      image: "https://i.ytimg.com/vi/EhNWtFCJnkM/maxresdefault.jpg",
      wikipediaLink: "https://yoyotricks.com/"
    },
    {
      title: "Gaming",
      image: "https://www.pcworld.com/wp-content/uploads/2024/04/pcw08_Asus-Gaming-PC.jpg?quality=50&strip=all",
      wikipediaLink: "https://en.wikipedia.org/wiki/Video_game"
    },
    {
      title: "Mathematics",
      image: "https://i.redd.it/7idzzssakws51.jpg",
      wikipediaLink: "https://en.wikipedia.org/wiki/Mathematics"
    },
    {
      title: "Programming",
      image: "https://www.deepseadev.com/wp-content/uploads/2024/06/uses-of-python.jpg",
      Link: "https://www.python.org/"
    },
    {
     title: "Board Games",
     image: "https://media.cnn.com/api/v1/images/stellar/prod/ap20129642475914.jpg?c=16x9&q=h_833,w_1480,c_fill",
     Link: "https://en.wikipedia.org/wiki/Board_game"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ lineHeight: "1.4" }}
      >
        My Hobbies
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="overflow-hidden">
              <a href={hobby.Link} target="_blank" rel="noopener noreferrer">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={hobby.image} 
                    alt="Please enable cookies and disable any site-blocking extensions that may interfere with the image loading process."
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                  />
                </div>  
              </a>
              <CardHeader className="p-2">
                <CardTitle className="text-center" style={{lineHeight: '1.1'}}>
                  {hobby.title}
                </CardTitle>
              </CardHeader>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}