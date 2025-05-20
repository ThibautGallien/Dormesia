import { Card, CardContent } from '@/components/ui/card';

interface TestimonialProps {
  quote: string;
  author: string;
  role: string;
}

const Testimonial = ({ quote, author, role }: TestimonialProps) => {
  return (
    <Card className="bg-indigo-800 border-indigo-700 text-white">
      <CardContent className="p-6">
        <div className="text-4xl text-indigo-400 mb-4">"</div>
        <p className="text-lg mb-6">{quote}</p>
        <div>
          <p className="font-bold">{author}</p>
          <p className="text-indigo-300">{role}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;