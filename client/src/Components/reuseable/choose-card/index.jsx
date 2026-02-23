export default function ChooseCard({ img = "", icon: Icon, title = "", desc = "" }) {
    return (
        <div className="flex items-center justify-center flex-col gap-5 text-center p-5 shadow-lg  rounded">
            <div className="w-14 h-14 mx-auto flex items-center justify-center">
                {
                    img && <img src="https://i.ibb.co.com/H2xjXhN/blog1.gif" alt="choose-image" className="w-full h-full" />
                }
                {
                    Icon && <Icon size={64} color="rgb(226 32 75)" />
                }
            </div>
            <h1 className="text-xl font-bold hover:text-rose-600 text-black dark:text-white [transition:0.5s] cursor-pointer">{title}</h1>
            <p className="text-lg dark:text-gray-400 text-gray-700">{desc}</p>
        </div>
    )
}
