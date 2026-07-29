import * as React from 'react';

export interface ColumnDef<T> {
  header: string;
  accessorKey: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

export interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  emptyMessage?: string;
}

export function DataTable<T extends { id: string | number }>({
  columns,
  data,
  emptyMessage = 'No records found.',
}: DataTableProps<T>) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center border border-border-subtle rounded-lg bg-surface-base text-sm text-text-tertiary">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto border border-border-subtle rounded-lg bg-surface-base">
      <table className="w-full text-left border-collapse text-sm">
        <thead>
          <tr className="border-b border-border-subtle bg-surface-elevated text-xs font-semibold text-text-tertiary uppercase tracking-wider">
            {columns.map((col, idx) => (
              <th key={idx} className={`px-4 py-3 ${col.className || ''}`}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border-subtle">
          {data.map((row) => (
            <tr
              key={row.id}
              className="hover:bg-surface-elevated/50 transition-colors text-text-secondary"
            >
              {columns.map((col, idx) => (
                <td key={idx} className={`px-4 py-3.5 ${col.className || ''}`}>
                  {typeof col.accessorKey === 'function'
                    ? col.accessorKey(row)
                    : (row[col.accessorKey] as React.ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
