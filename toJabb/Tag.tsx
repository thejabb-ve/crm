import { useMemo } from 'react';
import { statuses } from '@/settings/json/seed';

export default function Tag({ id, status }: { id: string; status: number }) {
  const colors: Database.Status = useMemo(() => {
    const config: Database.Status[] = statuses.filter(
      (item) => item.id === status,
    );

    return config[0];
  }, [id, status]);

  return (
    <p
      className={`${colors.config} w-fit rounded border px-2 text-xs font-bold uppercase`}
      id={`tag-${id}`}
    >
      {colors.name}
    </p>
  );
}
