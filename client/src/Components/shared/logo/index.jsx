import { Link } from 'react-router-dom'

export default function Logo() {
    return (
        <Link href="/client/public">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-blue-500 inline-block text-transparent bg-clip-text">Tour</h1>
                <img className="h-10 w-10" src="https://i.ibb.co/54n73qD/168111-travel-icon-free-png-hq.png" alt="Tour Icon" />
            </div>
        </Link>
    )
}
