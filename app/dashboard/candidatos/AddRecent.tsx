'use client';
import { useRouter } from 'next/navigation';
import { Events } from 'jabb-astro-components';
import { updateElement, refreshRecent } from '@/functions/server';

export default function AddRecent({
  id,
  item,
  recent,
}: {
  id: Database.id;
  item: Database.Candidate;
  recent: Database.Recent[];
}) {
  const router = useRouter();

  async function addRecent() {
    let found = false;
    recent.forEach((element) => {
      if (item.id === element.id) found = true;
    });
    if (found) {
      return router.push(`/dashboard/candidatos/perfil?id=${item.id}`);
    }
    try {
      Events.Utils.show('loading', true);
      const result = await updateElement(
        'users',
        {
          recent_viewed: [
            ...recent,
            { id: item.id, name: item.name, type: item.type },
          ],
        },
        { column: 'id', value: id as string },
      );

      const { recent_viewed } = JSON.parse(result.response);

      await refreshRecent({
        recent_viewed: recent_viewed as Database.Recent[],
      });
      Events.Utils.show('loading', false);
      return router.push(`/dashboard/candidatos/perfil?id=${item.id}`);
    } catch {
      Events.Utils.show('loading', false);
      return router.push(`/dashboard/candidatos/perfil?id=${item.id}`);
    }
  }
  return (
    <button
      onClick={addRecent}
      aria-label={`Ver perfil de ${item.name}`}
      className="w-fit border-white transition-all hover:border-b hover:border-blue-800 hover:text-blue-800"
    >
      {`${item.name}`}
    </button>
  );
}
