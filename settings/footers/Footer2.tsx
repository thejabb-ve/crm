import jabb from '../jabb.config';
import { Events } from 'jabb-astro-components';
import {
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from 'react-icons/fa/index.js';

export default function Footer1() {
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
    <div className="footer col-span-2">
      <div className="my-6">
        <div className="flex justify-center space-x-10 py-1 text-xl">
          {Social.map((Item: Configuration.socialIcons) => (
            <a
              key={Events.Utils.slugify(Item.ariaLabel)}
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
      </div>
    </div>
  );
}
