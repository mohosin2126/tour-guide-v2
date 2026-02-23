import ChooseCard from '../../../Components/reuseable/choose-card';
import FQAPage from './fqa';
import HeroSection from './hero-section';
import { FaHandHoldingUsd } from "react-icons/fa";
import { GoRepoLocked } from "react-icons/go";
import { FaCow, FaDatabase } from "react-icons/fa6";
import Title from '../../../Components/reuseable/title/inex';
import { Tabs } from '../../../Components/reuseable/tab';
import { useState } from 'react';
import TourCard from './../../../Components/reuseable/tour-card/index';
import TopPlace from './top-place/index';
import Testimonials from './testimonials';
import Blogs from './blogs';
import AboutUs from "./about-us/index.jsx";
import Subscribe from './subscribe/index.jsx';

export default function HomePage() {
    const [activeTab, setActiveTab] = useState("All");
    const tourData = [
        {
            image: "https://placehold.co/800x600",
            country: "usa",
            title: "Grand Canyon Adventure",
            price: { current: 300.00, original: 350.00 },
            days: "05 Days",
            people: "10 People",
            link: "",
            rating: 4.8
        },
        {
            image: "https://placehold.co/800x600",
            country: "england",
            title: "Historic Castles Tour",
            price: { current: 200.00, original: 250.00 },
            days: "04 Days",
            people: "15 People",
            link: "",
            rating: 4.6
        },
        {
            image: "https://placehold.co/800x600",
            country: "egypt",
            title: "Pyramids & Nile Cruise",
            price: { current: 350.00, original: 400.00 },
            days: "07 Days",
            people: "20 People",
            link: "",
            rating: 4.9
        },
        {
            image: "https://placehold.co/800x600",
            country: "india",
            title: "Golden Triangle Tour",
            price: { current: 180.00, original: 220.00 },
            days: "06 Days",
            people: "18 People",
            link: "",
            rating: 4.7
        },
        {
            image: "https://placehold.co/800x600",
            country: "europe",
            title: "Scenic Alps and Vineyards",
            price: { current: 400.00, original: 450.00 },
            days: "10 Days",
            people: "12 People",
            link: "",
            rating: 4.5
        },
        {
            image: "https://placehold.co/800x600",
            country: "america",
            title: "Rocky Mountains Expedition",
            price: { current: 250.00, original: 300.00 },
            days: "08 Days",
            people: "16 People",
            link: "",
            rating: 4.4
        }
    ];
    const tabTitleData = [
        { label: 'All' },
        { label: 'USA' },
        { label: 'England' },
        { label: 'Egypt' },
        { label: 'India' },
        { label: 'Europe' },
        { label: 'America' },
        // Add more tabs as needed
    ];
    const filteredTours = activeTab === "All"
        ? tourData
        : tourData.filter(tour => tour.country.toLowerCase() === activeTab.toLowerCase());

    return (
        <div>
            {/*   Banner Section */}
            <HeroSection />
            <div className="custom-container mx-auto mt-12">
                {/*about us section */}
                <div>
                    <AboutUs />
                </div>
                {/* choose section  */}
                <Title title="We are best" subTitle="Why Choose Travic" className="text-center" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 ">
                    <ChooseCard
                        icon={FaHandHoldingUsd}
                        title='Flexible Payment'
                        desc='We are dedicated to offering the exceptional value for your travel the best investment'
                    />
                    <ChooseCard
                        icon={GoRepoLocked}
                        title='Flexible Payment'
                        desc='We are dedicated to offering the exceptional value for your travel the best investment'
                    />
                    <ChooseCard
                        icon={FaCow}
                        title='Flexible Payment'
                        desc='We are dedicated to offering the exceptional value for your travel the best investment'
                    />
                    <ChooseCard
                        icon={FaDatabase}
                        title='Flexible Payment'
                        desc='We are dedicated to offering the exceptional value for your travel the best investment'
                    />
                </div>
                {/* tour section  */}
                <div>
                    <div>
                        <Tabs
                            tabTitle={tabTitleData}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        >
                            <div><TourCard tourData={filteredTours} /></div>
                        </Tabs>
                    </div>
                </div>
                {/* top place service  */}
                <div>
                    <TopPlace />
                </div>
                {/* testimonials */}
                <div>
                    <Testimonials />
                </div>
                {/* blog section */}
                <div>
                    <Blogs />
                </div>

                {/* Frequently ask section  */}
                <FQAPage />
                {/* subscribe section */}
                <Subscribe />
            </div>
        </div>
    );
}

