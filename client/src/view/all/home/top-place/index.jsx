
import Title from "../../../../Components/reuseable/title/inex";
import "./index.css";

export default function TopPlace() {
    const placesData = [
        {
            label: 'Italy',
            image: 'https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
        },
        {
            label: 'France',
            image: 'https://placehold.co/2200x2000',
        },
        {
            label: 'Spain',
            image: 'https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
        },
        {
            label: 'Greece',
            image: 'https://placehold.co/2200x2000',
        },
        {
            label: 'India',
            image: 'https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
        },
        {
            label: 'France',
            image: 'https://placehold.co/2200x2000',
        },
        {
            label: 'USA',
            image: 'https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg',
        },
        {
            label: 'Japan',
            image: 'https://placehold.co/2200x2000',
        },
    ];

    return (
        <div>
            <div>
                <Title title="Top Places" subTitle="Top Visited Places" className="text-center" />
            </div>
            <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {
                        placesData && placesData?.map((place, index) => (
                            <div className="card overflow-hidden" key={index}>
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
                                            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum in
                                            labore laudantium deserunt fugiat numquam.
                                        </p>
                                    </div>
                                    <button className="card__button">Read more</button>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
