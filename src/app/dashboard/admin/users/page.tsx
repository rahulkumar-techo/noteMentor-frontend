import { columns } from "@/components/admin/users/columns"
import { DataTable } from "@/components/admin/users/data-table"


const data: any = [
  { id: "1", email: "test@example.com", amount: 200, status: "success" },
  { id: "2", email: "rahul@example.com", amount: 300, status: "processing" },
]

export default function Page() {
  return (
    <div className="p-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
