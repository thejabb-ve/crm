import { useMemo } from 'react';

export default function Tag({
  id,
  status,
  statuses,
}: {
  id: string;
  status: number;
  statuses: Database.Status[];
}) {
  const colors: Database.Status = useMemo(() => {
    const config: Database.Status[] = statuses.filter(
      (item) => item.id === status,
    );

    return config[0];
  }, [id, status]);

  return (
    <p
      className={`${colors.config} darkAltContainer w-fit rounded border px-2 text-xs font-bold uppercase`}
      id={`tag-${id}`}
    >
      {colors.name}
    </p>
  );
}
