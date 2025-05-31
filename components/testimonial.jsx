import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon, StarIcon, UserIcon } from "lucide-react";

const Testimonial = ({
  quote,
  author,
  role,
  rating = 5,
  avatar = null,
  variant = "default", // "default" | "compact" | "featured"
  showStars = true,
  verified = false,
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "compact":
        return {
          card: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
          content: "p-4",
          quote: "text-sm text-gray-700 dark:text-gray-300 mb-3",
          author: "text-sm font-semibold text-gray-900 dark:text-gray-100",
          role: "text-xs text-gray-500 dark:text-gray-400",
        };
      case "featured":
        return {
          card: "bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 border-none text-white shadow-xl",
          content: "p-8",
          quote: "text-lg text-white mb-6",
          author: "text-lg font-bold text-white",
          role: "text-indigo-200",
        };
      default:
        return {
          card: "bg-indigo-800 border-indigo-700 text-white",
          content: "p-6",
          quote: "text-lg mb-6",
          author: "font-bold",
          role: "text-indigo-300",
        };
    }
  };

  const styles = getVariantStyles();

  const renderStars = () => {
    if (!showStars) return null;

    return (
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-4 w-4 ${
              i < rating
                ? "text-yellow-400 fill-current"
                : variant === "compact"
                ? "text-gray-300 dark:text-gray-600"
                : "text-indigo-400"
            }`}
          />
        ))}
        <span
          className={`ml-2 text-sm ${
            variant === "compact"
              ? "text-gray-600 dark:text-gray-400"
              : "text-indigo-200"
          }`}
        >
          {rating}/5
        </span>
      </div>
    );
  };

  const renderAvatar = () => {
    if (avatar) {
      return (
        <img
          src={avatar}
          alt={author}
          className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
        />
      );
    }

    return (
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center ${
          variant === "compact"
            ? "bg-gray-100 dark:bg-gray-700"
            : "bg-indigo-700"
        }`}
      >
        <UserIcon
          className={`h-6 w-6 ${
            variant === "compact"
              ? "text-gray-400 dark:text-gray-500"
              : "text-indigo-300"
          }`}
        />
      </div>
    );
  };

  return (
    <Card
      className={`${styles.card} transition-all hover:shadow-lg hover:-translate-y-1`}
    >
      <CardContent className={styles.content}>
        {renderStars()}

        <div className="relative">
          <QuoteIcon
            className={`absolute -top-2 -left-1 h-8 w-8 ${
              variant === "compact"
                ? "text-gray-300 dark:text-gray-600"
                : "text-indigo-400"
            }`}
          />
          <p className={`${styles.quote} pl-6 italic leading-relaxed`}>
            {quote}
          </p>
        </div>

        <div className="flex items-center gap-3 mt-4">
          {renderAvatar()}
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className={styles.author}>{author}</p>
              {verified && (
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-2.5 h-2.5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span
                    className={`text-xs ${
                      variant === "compact"
                        ? "text-green-600 dark:text-green-400"
                        : "text-green-300"
                    }`}
                  >
                    Vérifié
                  </span>
                </div>
              )}
            </div>
            <p className={styles.role}>{role}</p>
          </div>
        </div>

        {/* Sleep improvement indicator for featured variant */}
        {variant === "featured" && (
          <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20">
            <p className="text-sm text-indigo-100">
              <span className="font-semibold text-green-300">
                +87% d'amélioration
              </span>{" "}
              de la qualité de sommeil
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

// Composant pour afficher plusieurs témoignages
export const TestimonialGrid = ({ testimonials, variant = "default" }) => {
  return (
    <div
      className={`grid gap-6 ${
        variant === "compact"
          ? "md:grid-cols-3"
          : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {testimonials.map((testimonial, index) => (
        <Testimonial key={index} {...testimonial} variant={variant} />
      ))}
    </div>
  );
};

export default Testimonial;
