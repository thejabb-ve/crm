'use client';
import { updateElement, refreshRecent } from '@/functions/server';
import { Events } from 'jabb-astro-components';

export default function RecentViewed({
  recent,
  user,
}: {
  recent: Database.Recent[];
  user: Database.User;
}) {
  async function removeRecent(id: Database.id) {
    Events.Utils.show('loading', true);
    try {
      const result = await updateElement(
        'users',
        {
          recent_viewed: recent.filter((item) => item.id !== id),
        },
        { column: 'id', value: user.id as string },
      );

      const { recent_viewed } = JSON.parse(result.response);

      await refreshRecent({
        recent_viewed: recent_viewed as Database.Recent[],
      });
      Events.Utils.show('loading', false);
    } catch {
      Events.Utils.show('loading', false);
    }
  }

  if (!recent.length) return <div className="my-12"></div>;

  return (
    <section className="relative mx-auto mt-2 h-[50px] w-11/12 py-1">
      <div className="recentScrollBar absolute m-auto inline-flex w-full gap-1 overflow-x-scroll">
        {recent.map(({ id, name, type }) => (
          <div
            key={`key-${id}-recent`}
            onMouseOver={() => {}}
            onMouseLeave={() => {}}
            className="relative min-w-[140px] cursor-pointer select-none rounded border-2 border-gray-300 bg-gray-100 px-2 text-center transition-all hover:bg-blue-100"
          >
            <a
              href={`/dashboard/${type === 1 ? 'candidatos' : 'cuentas'}/perfil?id=${id}`}
              aria-label={`Ir a ${name}`}
              className="h-full w-full"
            >
              {name.length > 16 ? `${name.slice(0, 15)}...` : name}
            </a>
            <span
              className={`absolute ${true ? null : 'hidden'} right-0 h-full w-[24px] rounded bg-blue-200 bg-opacity-75 text-center font-extralight transition-colors hover:bg-blue-300 active:bg-blue-400`}
              onClick={async () => await removeRecent(id)}
            >
              x
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
