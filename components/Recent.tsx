'use client';
import { useState } from 'react';

export default function RecentViewed({
  recent,
}: {
  recent: Local.recentViewed[];
}) {
  function removeRecent(id: Database.id) {
    console.log('removed');
  }

  if (!recent.length) return <div className="my-12"></div>;

  return (
    <section className="relative mx-auto mt-2 h-[50px] w-11/12 py-1">
      <div className="recentScrollBar absolute m-auto inline-flex w-full gap-1 overflow-x-scroll">
        {recent.map(({ href, id, name }) => {
          const [skip, setSkip] = useState<boolean>(false);
          return (
            <div
              key={`key-${href}-recent`}
              onMouseOver={() => {
                setSkip(true);
              }}
              onMouseLeave={() => {
                setSkip(false);
              }}
              className="relative min-w-[140px] cursor-pointer select-none rounded border-2 border-gray-300 bg-gray-100 px-2 text-center transition-all hover:bg-blue-100"
            >
              <a
                href={href}
                aria-label={`Ir a ${href}`}
                className="h-full w-full"
              >
                {name.length > 16 ? `${name.slice(0, 15)}...` : name}
              </a>
              <span
                className={`absolute ${skip ? null : 'hidden'} right-0 h-full w-[24px] rounded bg-blue-200 bg-opacity-75 text-center font-extralight transition-colors hover:bg-blue-300 active:bg-blue-400`}
                onClick={() => removeRecent(id)}
              >
                x
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
