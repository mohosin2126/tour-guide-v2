
export default function Table({ headers, children }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-gray-800 border dark:border-gray-500 border-gray-200">
                <thead>
                    <tr>
                        {
                            headers &&
                            headers.map((header, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                                >
                                    {header}
                                </th>
                            ))}
                    </tr>
                </thead>
                <tbody>
                    {
                        children
                    }
                </tbody>
            </table>
        </div>
    )
}
