/** A plain comparison table: the first column names the row, one column per product. All text is in the HTML. */
export function CompareTable({ caption, columns, rows }: { caption?: string; columns: string[]; rows: { label: string; values: string[] }[] }) {
  return (
    <div className="ctable" data-reveal>
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">
              <span className="visually-hidden">وجه المقارنة</span>
            </th>
            {columns.map((c) => (
              <th key={c} scope="col">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.values.map((v, i) => (
                <td key={i}>{v}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
