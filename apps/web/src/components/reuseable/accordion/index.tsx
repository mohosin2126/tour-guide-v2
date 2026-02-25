import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  questions: AccordionItem[];
  colorClasses?: string;
}

export default function Accordion({ questions, colorClasses = "" }: AccordionProps) {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((prev) => (prev === index ? null : index));
  };

  return (
    <div className="w-full space-y-3">
      {questions.map((item, index) => (
        <div
          key={index}
          className={`cursor-pointer overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:shadow-md ${
            activeAccordion === index ? "border-primary/30 shadow-md" : "border-border"
          } ${colorClasses}`}
          onClick={() => toggleAccordion(index)}
        >
          <div
            className={`flex items-center justify-between px-5 py-4 transition-colors duration-300 ${
              activeAccordion === index
                ? "bg-primary/5"
                : "hover:bg-accent/50"
            }`}
          >
            <h4 className="text-base font-semibold text-foreground lg:text-lg">{item.title}</h4>
            <div
              className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                activeAccordion === index
                  ? "rotate-180 bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              <ChevronDown size={18} />
            </div>
          </div>
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{
              maxHeight:
                activeAccordion === index
                  ? `${contentRefs.current[index]?.scrollHeight}px`
                  : "0px",
            }}
            ref={(el) => {
              contentRefs.current[index] = el;
            }}
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-muted-foreground lg:text-base">
              {item.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
