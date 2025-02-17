import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PepehaSectionProps {
  title: string;
  maori: string;
  english: string;
  index: number;
}

export default function PepehaSection({
  title,
  maori,
  english,
  index,
}: PepehaSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2 text-lg font-medium">{maori}</p>
          <p className="text-sm text-muted-foreground">{english}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
