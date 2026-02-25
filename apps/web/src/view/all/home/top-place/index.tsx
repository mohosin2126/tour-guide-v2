import Title from "@/components/reuseable/title";
import { usePackages } from "@/hooks/api/use-packages";
import { Link } from "react-router-dom";
import "./index.css";

export default function TopPlace() {
  const { data } = usePackages({ limit: "8", sort: "-totalBookings" });
  const packages =
    (data as Record<string, unknown>)?.packages as Record<string, unknown>[] ||
    (data as Record<string, unknown>[]) || [];

  const placesData = packages.length > 0
    ? packages.map((pkg) => ({
        id: pkg._id as string,
        label: pkg.title as string,
        location: (pkg.startLocation || pkg.location || "") as string,
        image: (pkg.coverImage as string) || (pkg.images as string[])?.[0] || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800",
        price: pkg.price as number,
      }))
    : [
        { id: "1", label: "Mountain Trek", location: "Nepal", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800", price: 899 },
        { id: "2", label: "Beach Paradise", location: "Maldives", image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800", price: 599 },
        { id: "3", label: "Ancient Temples", location: "Cambodia", image: "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=800", price: 749 },
        { id: "4", label: "Safari Adventure", location: "Kenya", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800", price: 1099 },
        { id: "5", label: "Northern Lights", location: "Iceland", image: "https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800", price: 1299 },
        { id: "6", label: "Desert Oasis", location: "Morocco", image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800", price: 649 },
        { id: "7", label: "Alpine Lakes", location: "Switzerland", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800", price: 999 },
        { id: "8", label: "Coral Reefs", location: "Australia", image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800", price: 849 },
      ];

  return (
    <div className="top-place-cards">
      <div>
        <Title title="Top Places" subTitle="Top Visited Places" className="text-center" />
      </div>
      <div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {placesData.map((place) => (
            <Link to={place.id.length > 5 ? `/packages/${place.id}` : "#"} className="card overflow-hidden" key={place.id}>
              <img
                className="card__background"
                src={place.image}
                alt={`Photo of ${place.label}`}
                width="1920"
                height="2193"
              />
              <div className="card__content | flow">
                <div className="card__content--container | flow">
                  <h2 className="card__title">{place.label}</h2>
                  <p className="card__description">
                    {place.location && <span>{place.location} • </span>}
                    {place.price && <span>From ${place.price}</span>}
                  </p>
                </div>
                <span className="card__button">Explore</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
