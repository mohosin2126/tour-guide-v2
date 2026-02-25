import { useState } from "react";
import { MapPin, Mail, Phone, Clock, CheckCircle, MessageSquare, HelpCircle, Headphones } from "lucide-react";
import { useForm, FieldValues } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import AnimatedButton from "@/components/ui/animated-button";
import api from "@/hooks/auth/use-api";
import { toast } from "sonner";
import Subscribe from "@/components/shared/subscribe";
import Accordion from "@/components/reuseable/accordion";
import PageHero from "@/components/shared/page-hero";

const contactCards = [
  { icon: MapPin, title: "Our Location", lines: ["1901 Thornridge Cir.", "Shiloh, Hawaii 81063"] },
  { icon: Mail, title: "Email Us", lines: ["hello@tourguide.com", "support@tourguide.com"] },
  { icon: Phone, title: "Call Us", lines: ["+(208)-555-0112", "Mon–Fri, 9AM–6PM"] },
  { icon: Clock, title: "Office Hours", lines: ["Mon – Fri: 9AM – 6PM", "Sat – Sun: 10AM – 4PM"] },
];

const faqItems = [
  { title: "How quickly will I get a response?", content: "We aim to reply within 24 hours on business days. Urgent inquiries are prioritized and usually answered within a few hours." },
  { title: "Can I request a custom tour package?", content: "Absolutely! Use the contact form to describe your ideal trip and our team will craft a personalized package for you." },
  { title: "How do I become a tour guide on the platform?", content: "Register for an account and select 'Guide' as your role. Once approved by our admin team, you can start creating tour packages." },
  { title: "What if I need to cancel or reschedule?", content: "Contact us at least 48 hours before your tour date for a full refund or free reschedule. Late cancellations may incur fees." },
];

export default function ContactUs() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    setSending(true);
    try {
      await api.post("/contacts", data);
      setSent(true);
      reset();
      toast.success("Message sent! We'll get back to you soon.");
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      console.error(err);
      toast.error("Failed to send message");
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <PageHero
        title="We'd Love to Hear From You"
        gradientText="Hear From You"
        subtitle="Have a question, need help planning your trip, or just want to say hello? Our team is ready to assist you 24/7."
        backgroundImage="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600"
        height="full"
      
        badge={{ icon: Headphones, text: "24/7 Support Available" }}
        stats={[
          { icon: Clock, value: "<1hr", label: "Response" },
          { icon: Mail, value: "24/7", label: "Available" },
          { icon: Phone, value: "99%", label: "Satisfaction" },
        ]}
      />

      <div className="custom-container">
        {/* Contact Cards */}
        <section className="relative z-10 -mt-16">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <Card key={card.title} className="border-none shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <card.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold">{card.title}</h3>
                  {card.lines.map((line, i) => (
                    <p key={i} className="text-sm text-muted-foreground">{line}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-16">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <p className="mb-2 font-semibold uppercase tracking-wider text-primary">Get in Touch</p>
              <h2 className="text-3xl font-bold">Send Us a Message</h2>
              <p className="mt-3 text-muted-foreground">
                Fill out the form and our team will get back to you within 24 hours.
              </p>

              {sent && (
                <div className="mt-4 flex items-center gap-2 rounded-lg bg-green-50 p-4 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                  <CheckCircle size={20} />
                  <p className="text-sm font-medium">Message sent successfully! We&apos;ll be in touch soon.</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input placeholder="Your name" {...register("name", { required: true })} className={errors.name ? "border-red-500" : ""} />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input type="email" placeholder="your@email.com" {...register("email", { required: true })} className={errors.email ? "border-red-500" : ""} />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input placeholder="+1 (555) 000-0000" {...register("phone")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Input placeholder="How can we help?" {...register("subject", { required: true })} className={errors.subject ? "border-red-500" : ""} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Message</Label>
                  <Textarea
                    placeholder="Tell us more about your inquiry..."
                    rows={5}
                    {...register("message", { required: true })}
                    className={errors.message ? "border-red-500" : ""}
                  />
                </div>
                <AnimatedButton type="submit" size="lg" disabled={sending}>
                  {sending ? "Sending..." : "Send Message"}
                </AnimatedButton>
              </form>
            </div>

            {/* Map / Info sidebar */}
            <div className="space-y-6">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl">
                <iframe
                  title="Office Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509374!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzI5LjYiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus"
                  className="h-full w-full border-0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <div>
                      <h4 className="font-semibold">Prefer Live Chat?</h4>
                      <p className="text-sm text-muted-foreground">Our support team is available online 24/7 for instant help.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="pb-16">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <HelpCircle className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="mt-2 text-muted-foreground">Quick answers to common questions</p>
          </div>
          <div className="mx-auto max-w-2xl">
            <Accordion questions={faqItems} />
          </div>
        </section>
      </div>

      <Subscribe />
    </div>
  );
}
