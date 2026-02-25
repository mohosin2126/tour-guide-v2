import { Link } from "react-router-dom";
import Logo from "@/components/shared/logo";

export default function Footer() {
  const footerLinks = [
    {
      title: "Explore",
      data: [
        { id: 1, title: "Packages", href: "/packages" },
        { id: 2, title: "Guides", href: "/guides" },
        { id: 3, title: "Community", href: "/community" },
        { id: 4, title: "About Us", href: "/about-us" },
      ],
    },
    {
      title: "Support",
      data: [
        { id: 1, title: "Contact Us", href: "/contact-us" },
      ],
    },
  ];

  return (
    <div className="w-full border-t bg-background pb-6 pt-16">
      <div className="custom-container">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Explore our platform&apos;s features and see how we can help boost
              your travel experience with guided tours.
            </p>
          </div>
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="mb-4 text-lg font-semibold">{section.title}</h3>
              <div className="flex flex-col gap-2.5">
                {section.data.map((nav) => (
                  <Link
                    key={nav.id}
                    to={nav.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {nav.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <div className="h-px w-full bg-border" />
          <p className="pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} TourGuide. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
