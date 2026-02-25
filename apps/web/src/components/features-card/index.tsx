import AnimatedButton from "@/components/ui/animated-button";

interface FeatureCardProps {
  number: string | number;
  title: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  reverse?: boolean;
  href?: string;
}

export default function FeatureCard({
  number,
  title,
  description,
  buttonText,
  imageUrl,
  reverse,
}: FeatureCardProps) {
  return (
    <div
      className={`flex w-full items-center gap-20 px-8 py-16 ${
        reverse ? "flex-row-reverse" : ""
      }`}
    >
      <div className="mx-auto flex-1 text-foreground">
        <h5 className="mb-2 text-base font-light">Features #{number}</h5>
        <h1 className="mb-3 text-3xl font-semibold">{title}</h1>
        <p className="mb-4 text-muted-foreground">{description}</p>
        <AnimatedButton>{buttonText}</AnimatedButton>
      </div>
      <div className="mx-auto w-1/3">
        <img src={imageUrl} className="h-72 rounded-xl" alt="feature" />
      </div>
    </div>
  );
}
