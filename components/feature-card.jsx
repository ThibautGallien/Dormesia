import { Card, CardContent } from "@/components/ui/card";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Card className="transition-all hover:shadow-md hover:-translate-y-1">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
