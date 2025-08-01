import Dashboard from './Dashboard';
import jabb from '@/settings/jabb.config';

export const metadata = {
  title: `Dashboard | ${jabb.company.commercialName}`,
  description: 'Resumen de KPIs y métricas de la empresa',
  keywords: [...jabb.keywords.split(', '), 'dashboard'],
  authors: [{ name: 'Agencia Jabb', url: jabb.authors.principal }],
  openGraph: {
    title: 'Dashboard | Agencia Jabb',
    description: 'Resumen de KPIs y métricas de la empresa',
    url: jabb.company.web[0],
    siteName: jabb.company.commercialName,
    images: [
      {
        url: 'https://cdn.thejabb.com/logo/normal.png',
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
      <Dashboard />
    </section>
  );
}
