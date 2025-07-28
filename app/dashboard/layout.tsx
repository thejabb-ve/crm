import type { Metadata } from 'next';
import { Footers, Menu, Loader } from 'jabb-astro-components';
import jabb from '../../settings/jabb.config';
import { legal, menu } from '../../settings/json/menus';
import Footer2 from '../../settings/footers/Footer2';
import '../../settings/App.css';
import 'jabb-astro-components/Dark.css';

export const metadata: Metadata = {
  icons: { icon: 'https://cdn.thejabb.com/logo/favicon.png' },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="darkMode1 md:m-auto">
        <header>
          <Menu.Menu2 {...menu} />
          <Menu.Responsive menu={menu.menu} />
        </header>
        <main className="text m-auto my-10 w-11/12">{children}</main>
        <Footers.Footer1
          companyName={jabb.company.commercialName}
          address={jabb.company.address}
          legal={legal}
        >
          <Footer2 />
          <div className="footer paragraph text col-span-2 m-auto text-right text-lg italic">
            <p className="">{jabb.slogan}</p>
          </div>
        </Footers.Footer1>
        <Loader.Loader1
          img="/images/loading.gif"
          alt="Espera mientras valida las credenciales"
          id="loading"
        />
      </body>
    </html>
  );
}
