import type { Metadata } from 'next';
import { Footers, Menu } from 'jabb-astro-components';
import jabb from '../../settings/jabb.config';
import { login } from '../../settings/json/menus';
import Session from '../dashboard/Session';

import '../../settings/App.css';
import 'jabb-astro-components/Dark.css';

export const metadata: Metadata = {
  icons: { icon: 'https://cdn.thejabb.com/logo/favicon.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="darkMode1">
        <header id="mainHeader" className="sticky z-50">
          <Menu.Login1 {...login} />
        </header>
        <main>
          <Session />
          {children}
        </main>
        <Footers.Footer2
          companyName={jabb.company.commercialName}
          address={jabb.company.address}
        ></Footers.Footer2>
      </body>
    </html>
  );
}
