interface ComparisonTableProps {
    columns: readonly string[];
    rows: readonly { label: string; values: readonly string[] }[];
}

/** Types side by side in a real table: easy to scan on a phone, and easy for AI assistants to quote. */
export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
    return (
        <table className="w-full table-fixed border-collapse text-sm text-ink-soft leading-relaxed">
            <thead>
                <tr className="bg-[#F9FAFB] text-ink">
                    <th scope="col" className="w-[22%] border border-line p-2 text-start font-semibold">
                        <span className="sr-only">وجه المقارنة</span>
                    </th>
                    {columns.map((column) => (
                        <th key={column} scope="col" className="border border-line p-2 text-start font-semibold">{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row) => (
                    <tr key={row.label}>
                        <th scope="row" className="border border-line p-2 text-start font-semibold text-ink align-top">{row.label}</th>
                        {row.values.map((value, i) => (
                            <td key={i} className="border border-line p-2 align-top">{value}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
