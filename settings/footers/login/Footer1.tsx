import jabb from '../../jabb.config';
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from 'react-icons/fa';

export default function Footer() {
  const sloganParts: string[] = jabb.slogan.split(' ');
  const middle: number = Math.ceil(sloganParts.length / 2);
  const index: number = jabb.slogan.indexOf(sloganParts[middle]);
  const firstPart: string = jabb.slogan.slice(0, index);
  const finalPart: string = jabb.slogan.slice(index);

  const Social: Configuration.socialIcons[] = [];

  const rss: Configuration.Rss[] = [
    {
      rss: jabb.rss.instagram.length,
      Icon: FaInstagram,
      url: jabb.social.ig,
      ariaLabel: 'Ir a nuestro Instagram',
    },
    {
      rss: jabb.rss.phone.length,
      Icon: FaWhatsapp,
      url: jabb.social.wa,
      ariaLabel: 'Ir a nuestro WhatsApp',
    },
    {
      rss: jabb.rss.youTube.length,
      Icon: FaYoutube,
      url: jabb.social.yt,
      ariaLabel: 'Ir a nuestro canal de YouTube',
    },
    {
      rss: jabb.rss.twitter.length,
      Icon: FaTwitter,
      url: jabb.social.tw,
      ariaLabel: 'Ir a nuestra cuenta de X',
    },
    {
      rss: jabb.rss.facebook.length,
      Icon: FaFacebook,
      url: jabb.social.fb,
      ariaLabel: 'Ir a nuestra página de Facebook',
    },
    {
      rss: jabb.rss.linkedin.length,
      Icon: FaLinkedin,
      url: jabb.social.in,
      ariaLabel: 'Ir a nuestra página de LinkedIn',
    },
  ];

  rss.forEach((item) => {
    const { Icon, url, ariaLabel } = item;
    if (item.rss) {
      Social.push({
        Icon,
        url,
        ariaLabel,
      });
    }
  });

  return (
    <div className="footer">
      <picture>
        <source
          srcSet="/images/logo/white.png"
          media="(prefers-color-scheme: dark)"
        />
        <img
          src="/images/logo/logo.png"
          alt={`logo ${jabb.company.commercialName}`}
          loading="lazy"
          width={180}
          className="mx-auto"
        />
      </picture>
      <div className="my-6">
        <div className="flex justify-center space-x-3 py-1 text-xl">
          {Social.map((Item: Configuration.socialIcons) => (
            <a
              href={Item.url}
              aria-label={Item.ariaLabel}
              className="text hover:text-cyan-800"
              target="_blank"
              rel="nofollow"
            >
              <Item.Icon />
            </a>
          ))}
        </div>
        <p className="paragraph text">
          <i>
            {firstPart}
            <br />
            {finalPart}
          </i>
        </p>
      </div>
    </div>
  );
}
