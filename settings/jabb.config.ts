const tagManagerId: string = '';
const dark: string = 'darkMode1';

const domainName: string = 'thejabb';
const domainExt: string = '.com';

const domain: string = `${domainName}${domainExt}`;
const url: string = `https://clients.${domain}`;

const company: Configuration.CompanyInformation = {
  commercialName: 'The Jabb',
  web: [url],
  legalName: 'The Jabb, C.A',
  id: 'J-503813717',
  address:
    'Entre Segunda y Tercera Avenida, Residencias Maury, Piso 1, Ap 2, Los Palos Grandes, Chacao, Estado Miranda, Venezuela. Zona Postal 1060',
  email: 'pedro.rosales@thejabb.com',
  motive:
    'Creación y gestión de páginas web, gestión de redes sociales, redacción de textos para medios digitales, alojamiento web (hosting), asesoría de publicidad y mercadeo, asesoría y mentoría financiera, cursos, talleres y bootcamp en línea, venta de productos digitales, automatización de procesos digitales, venta de espacios publicitarios en medios digitales, pudiendo igualmente dedicarse a cualquier otra actividad conexas o negocio licito, relacionado con el objeto.',
};

const slogan: string = 'Desarrollamos tu presencia digital';
const keywords: string = 'jabb, marketing digital, desarrollo web, seo';
const favicon: string = 'icon.png';
const icon: string = `/images/logo/${favicon}`;

enum authors {
  principal = 'https://thejabb.com/nosotros',
}

enum rss {
  phone = '584126043368',
  instagram = 'agenciajabb',
  waMessage = 'Hola! Quiero posicionarme en internet',
  youTube = '@thejabb',
  twitter = '',
  facebook = '',
  linkedin = '',
}

const social: Configuration.Social = {
  ig: `https://www.instagram.com/${rss.instagram}`,
  wa: `https://wa.me/${rss.phone}?text=${rss.waMessage.split(' ').join('%20')}`,
  yt: `https://www.youtube.com/${rss.youTube}`,
  tw: `https://www.twitter.com/${rss.twitter}`,
  fb: `https://www.facebook.com/${rss.facebook}`,
  in: `https://www.linkedin.com/company/${rss.linkedin}`,
};

const contactForm: string = 'https://portal.thejabb.com/api/contact';

export default {
  domainName,
  domain,
  slogan,
  company,
  keywords,
  icon,
  social,
  rss,
  authors,
  contactForm,
  tagManagerId,
  dark,
};
