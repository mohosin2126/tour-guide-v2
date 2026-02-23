import Breadcrumbs from "../../../../Components/reuseable/breadcrumbs";
import Card from "../../../../Components/reuseable/card";
import Table from "../../../../Components/reuseable/table";

export default function Performance() {
  const headers = ["Id", "Name", "Status", "Create", "Action"];
  const data = [
    { id: 1, name: "John Doe", status: "Active", create: "2024-11-01", action: "Edit" },
    { id: 2, name: "Jane Smith", status: "Inactive", create: "2024-11-05", action: "Delete" },
    { id: 3, name: "Bob Brown", status: "Pending", create: "2024-11-10", action: "Approve" },
    { id: 1, name: "John Doe", status: "Active", create: "2024-11-01", action: "Edit" },
    { id: 2, name: "Jane Smith", status: "Inactive", create: "2024-11-05", action: "Delete" },
    { id: 3, name: "Bob Brown", status: "Pending", create: "2024-11-10", action: "Approve" },
    { id: 1, name: "John Doe", status: "Active", create: "2024-11-01", action: "Edit" },
    { id: 2, name: "Jane Smith", status: "Inactive", create: "2024-11-05", action: "Delete" },
    { id: 3, name: "Bob Brown", status: "Pending", create: "2024-11-10", action: "Approve" },
    { id: 1, name: "John Doe", status: "Active", create: "2024-11-01", action: "Edit" },
    { id: 2, name: "Jane Smith", status: "Inactive", create: "2024-11-05", action: "Delete" },
    { id: 3, name: "Bob Brown", status: "Pending", create: "2024-11-10", action: "Approve" },
  ];

  const breadcrumbItems = [
    { label: "Dashboard", path: "/" },
    { label: "Settings", path: "/settings" },
    { label: "Profile", path: null }, // Current page
  ];
  return (
    <div>
      <Breadcrumbs items={breadcrumbItems} className="my-4"  />
      <Card
        title="Performance"
        action={<>
          <button className="px-4 py-2 bg-[#FF6B00] text-white rounded">Create Term</button>
        </>}
        className="w-full pb-10" >
        <Table headers={headers} >
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t ${rowIndex % 2 === 0 ? "bg-gray-50 dark:bg-gray-700 border dark:border-gray-600 " : ""}`}
            >
              {headers.map((header, colIndex) => (
                <td
                  key={colIndex}
                  className="px-4 py-2 text-sm text-gray-600 dark:text-gray-100 "
                >
                  {row[header.toLowerCase()] || "-"}
                </td>
              ))}
            </tr>
          ))}
        </Table>
      </Card>

    </div>
  )
}
