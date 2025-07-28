import Login from './Login';
import jabb from '@/settings/jabb.config';

export const metadata = {
  title: `Inicio de Sesión | ${jabb.company.commercialName}`,
  description: 'Interface para Clients',
  keywords: [...jabb.keywords.split(', '), 'login', 'asociados'],
  authors: [{ name: 'Agencia Jabb', url: jabb.authors.principal }],
  openGraph: {
    title: 'Inicio de Sesión',
    description: 'Interface para Clients',
    url: jabb.company.web[0],
    siteName: jabb.company.commercialName,
    images: [
      {
        url: 'https://cdn.aprocre.org.ve/images/logo/logo.png',
        width: 1200,
        height: 630,
        alt: 'Agencia Jabb - Clients',
      },
    ],
    locale: 'es_VE',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return (
    <section>
      <Login />
    </section>
  );
}
