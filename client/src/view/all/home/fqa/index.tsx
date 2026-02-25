import Accordion from "@/components/reuseable/accordion";
import Title from "@/components/reuseable/title";

const questions = [
  {
    title: "How do I book a tour?",
    content:
      "Booking a tour is easy! Simply browse our packages, select the one that interests you, choose your travel date and number of guests, then click 'Book Now'. You'll receive a confirmation email with all the details.",
  },
  {
    title: "What is the cancellation policy?",
    content:
      "You can cancel your booking up to 48 hours before the scheduled tour for a full refund. Cancellations made within 48 hours of the tour may be subject to a cancellation fee. Please contact our support team for assistance.",
  },
  {
    title: "Are tours suitable for children?",
    content:
      "Most of our tours welcome children, though some adventure tours may have age restrictions. Each package listing includes information about suitability and age requirements. Feel free to contact us if you have specific questions.",
  },
  {
    title: "What should I bring on a tour?",
    content:
      "We recommend bringing comfortable clothing and footwear, sunscreen, a hat, a water bottle, and a camera. Specific tours may have additional requirements which will be listed in your booking confirmation email.",
  },
  {
    title: "How are tour guides verified?",
    content:
      "All our tour guides undergo a thorough verification process including background checks, certification validation, and experience reviews. They must also maintain a minimum rating from travelers to continue guiding on our platform.",
  },
];

export default function FQAPage() {
  return (
    <div className="mt-12 mb-8">
      <Title title="FAQ" subTitle="Frequently Asked Questions" className="text-center" />
      <div className="mt-8 flex flex-col items-start gap-10 lg:flex-row">
        <div className="hidden w-full lg:block lg:w-5/12">
          <div className="sticky top-28 space-y-6">
            <div className="overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                alt="Travel FAQ"
                className="h-[400px] w-full object-cover"
              />
            </div>
            <div className="rounded-xl border bg-card p-6">
              <h3 className="mb-2 text-lg font-semibold text-foreground">Still have questions?</h3>
              <p className="mb-4 text-sm text-muted-foreground">
                Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
              </p>
              <a
                href="/contact-us"
                className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
              >
                Contact Support →
              </a>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-7/12">
          <Accordion questions={questions} />
        </div>
      </div>
    </div>
  );
}
