import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

const AdminTable = ({ data }) => {
  const columns = React.useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Car Name",
      },
      {
        accessorKey: "bidCount",
        header: "Bid Count",
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white py-1 px-3 rounded"
              onClick={() => handleApprove(row.original.id)}
            >
              Approve
            </button>
            <button
              className="bg-red-500 text-white py-1 px-3 rounded"
              onClick={() => handleReject(row.original.id)}
            >
              Reject
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleApprove = (id) => {
    console.log(`Approving listing with ID: ${id}`);
  };

  const handleReject = (id) => {
    console.log(`Rejecting listing with ID: ${id}`);
  };

  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id} className="text-left py-2 px-4 bg-gray-200">
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-100">
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="py-2 px-4 border-b">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminTable;
