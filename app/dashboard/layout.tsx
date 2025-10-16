import type { Metadata } from 'next';
import { Footers, Menu, Loader } from 'jabb-astro-components';
import Cookies from '@/functions/classes/cookies';
import jabb from '../../settings/jabb.config';
import { legal, menu } from '../../settings/json/menus';
import Footer2 from '../../settings/footers/Footer2';
import RecentViewed from '@/components/Recent';
import Get from '@/functions/classes/getter';
import { logout } from '@/functions/server';
import ValidateSession from './Session';
import '../../settings/App.css';
import 'jabb-astro-components/Dark.css';
import { cookies } from 'next/headers';

const RECENT = process.env.RECENT as string;
const USER = process.env.USER_LOGIN as string;

export const metadata: Metadata = {
  icons: { icon: 'https://cdn.thejabb.com/logo/favicon.png' },
};

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieRecent = cookies().get(RECENT);
  const cookieUser = cookies().get(USER);

  const rawRecent = (await Cookies.read(cookieRecent)) as Database.getRecent;
  const rawUser = (await Cookies.read(cookieUser)) as Database.User;

  const recent: Database.Recent[] = rawRecent.recent_viewed;
  const user: Database.User = Get.userData(rawUser as Database.User);

  return (
    <html lang="es">
      <body className="darkMode1 md:m-auto">
        <header>
          <ValidateSession />
          <Menu.Menu2 {...menu} logout={logout} />
          <Menu.Responsive menu={menu.menu} />
          <RecentViewed recent={recent} user={user} />
        </header>
        <main className="text m-auto mb-10 w-11/12">{children}</main>
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
