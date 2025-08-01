'use client';
import { Button } from 'jabb-astro-components';
import Link from 'next/link';

export default function TwoButtons({
  button1,
  button2,
}: Interface.TwoButtonsProps) {
  const { href: href1, ...Button1 } = button1;
  const { href: href2, ...Button2 } = button2;

  return (
    <div className="m-auto flex w-full justify-center gap-3 text-center">
      <Link href={href1 as string} aria-label={Button1.ariaLabel}>
        <Button.Button1 {...Button1} />
      </Link>
      <Link href={href2 as string} aria-label={Button2.ariaLabel}>
        <Button.Button1 {...Button2} />
      </Link>
    </div>
  );
}
