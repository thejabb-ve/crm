import { Events } from 'jabb-astro-components';

export default function CandidateStatus({
  status,
  statuses,
}: {
  status: number;
  statuses: Database.Status[];
}) {
  return (
    <section className="my-3 flex w-full gap-2">
      {statuses.map(({ id, name }, index) => (
        <div
          className={`mx-auto w-full rounded ${status === id ? 'bg-green-600 text-white dark:bg-green-700' : (id as number) < status ? 'bg-green-200 dark:bg-green-400' : 'darkContainer bg-blue-50'} select-none py-[30px] text-center text-xs font-bold uppercase shadow transition-colors`}
          key={`key-${Events.Utils.slugify(name)}-${index}`}
        >
          {name}
        </div>
      ))}
    </section>
  );
}
