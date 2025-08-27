export default function Table({
  children,
  headers,
}: {
  children: React.ReactNode;
  headers: string[];
}) {
  return (
    <table className="darkAltContainer relative my-5 table h-[350px] min-w-full rounded bg-gray-50 text-left shadow">
      <thead>
        <tr>
          {headers.map((item, index) => (
            <th
              key={`Table-${index}`}
              className="w-screen p-3 text-sm uppercase"
            >
              {item}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="absolute max-h-[305px] w-full divide-y overflow-y-auto rounded">
        {children}
      </tbody>
    </table>
  );
}
