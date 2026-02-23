
export default function HeaderSection({ headerImage, children }) {
    return (
        <div
            className="w-full md:h-[60vh] relative bg-cover bg-center px-5 py-10 md:p-0"
            style={{ backgroundImage: `url(${headerImage})` }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            {/* Centered Text */}
            {
                children
            }
        </div>
    )
}
