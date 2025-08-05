'use client';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { Inputs } from 'jabb-astro-components';

export default function Search({
  ...props
}: {
  placeholder?: string;
  defaultValue?: string;
}) {
  const searchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace } = useRouter();
  const param: string = 'query';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (term) {
      params.set(param, term);
    } else {
      params.delete(param);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <Inputs.Text
      name="searchUser"
      required={false}
      onChange={(e) => handleSearch(e.target.value)}
      className="input relative mx-auto my-4 w-full"
      {...props}
    />
  );
}
