
export default function Card({ title, action = <></>, className, children }) {
    return (
        <div className={`w-full bg-white dark:bg-gray-800 h-auto shadow-xl p-4 ${className}`}>
            <div className='flex items-center justify-between mb-6'>
                <h1 className='text-xl lg:text-2xl font-medium'>{title}</h1>
                {action}
            </div>
            <>
                {children}
            </>
        </div>
    )
}
