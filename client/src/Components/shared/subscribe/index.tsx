import SubscribeForm from "@/view/all/home/subscribe/subscribe-form";

export default function BlogSubscribe() {
  return (
    <div className="bg-secondary py-16">
      <div className="custom-container text-center">
        <h2 className="mb-4 text-3xl font-bold text-secondary-foreground">
          Subscribe to Our Newsletter
        </h2>
        <p className="mb-8 text-muted-foreground">
          Get the latest travel tips, guides, and exclusive offers delivered to
          your inbox.
        </p>
        <div className="mx-auto max-w-lg">
          <SubscribeForm className="justify-center" />
        </div>
      </div>
    </div>
  );
}
