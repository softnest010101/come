"use client";

export type TableCell = string | number | boolean | null;
export type TableRow = TableCell[];
export type TableConfig = {
  columns: string[];
  rows: TableRow[];
  pagination: boolean;
  sortable: boolean;
};

type Props = {
  config: TableConfig;
};

export default function TableTool({ config }: Props) {
  const { columns, rows, pagination, sortable } = config;

  return (
    <div className="rounded border border-purple-200 bg-purple-50 p-4 shadow-sm overflow-auto">
      <h3 className="text-lg font-semibold text-purple-800 mb-3 flex items-center gap-2">
        📊 Table Tool
      </h3>

      <table className="min-w-full border text-sm text-purple-900">
        <thead className="bg-purple-100">
          <tr>
            {columns.map((col, i) => (
              <th key={i} className="border px-3 py-2 text-left">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="odd:bg-white even:bg-purple-100">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="border px-3 py-1">
                  {String(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-xs text-gray-600">
        Pagination: {pagination ? "Enabled ✅" : "Disabled ❌"} | Sortable:{" "}
        {sortable ? "Yes 🔃" : "No ❌"}
      </p>
    </div>
  );
}
