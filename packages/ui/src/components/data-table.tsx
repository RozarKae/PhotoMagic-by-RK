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
      <div className="p-12 text-center border border-border-subtle rounded-2xl bg-surface-glass backdrop-blur-xl text-sm text-silver font-light">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full overflow-hidden border border-border-subtle rounded-2xl bg-surface-glass backdrop-blur-xl shadow-museum">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-elevated/80 text-[10px] font-mono text-gold-500 uppercase tracking-widest">
              {columns.map((col, idx) => (
                <th key={idx} className={`px-6 py-4 font-semibold ${col.className || ''}`}>
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border-subtle/30">
            {data.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-surface-elevated/60 transition-colors duration-150 text-ivory"
              >
                {columns.map((col, idx) => (
                  <td key={idx} className={`px-6 py-4 text-xs font-normal ${col.className || ''}`}>
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
    </div>
  );
}
