import { IconType } from 'react-icons';
import {
  FaInstagram,
  FaWhatsapp,
  FaMailBulk,
  // FaPhone,
  // FaYoutube,
  // FaFacebook,
  // FaTwitter,
  // FaLinkedin,
} from 'react-icons/fa';

interface Social {
  Icon: IconType;
  href?: string;
  ariaLabel: string;
}

function validInstagram(ig: string): string {
  return ig
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-_.]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function Social({
  id,
  name,
  phone,
  ig,
  mail,
  // yt,
  // fb,
  // x,
  // In,
}: {
  id: string;
  name: string;
  phone: string;
  ig?: string;
  yt?: string;
  fb?: string;
  x?: string;
  In?: string;
  mail?: string;
}) {
  const social: Social[] = [
    {
      Icon: FaWhatsapp,
      href: `https://wa.me/${phone}`,
      ariaLabel: `Escribir por Whatsapp a ${name}`,
    },
    {
      Icon: FaInstagram,
      href: ig && `https://www.instagram.com/${validInstagram(ig)}`,
      ariaLabel: `Ir al instagram de ${name}`,
    },
    {
      Icon: FaMailBulk,
      href: mail && `mailto:${mail}`,
      ariaLabel: `Enviar un correo electrónico a ${name}`,
    },
  ];

  return (
    <div className="inline-flex justify-center gap-3 space-x-3 py-1 text-xl">
      {social.map(({ Icon, href, ariaLabel }, index) => (
        <div key={`social-${id}-${index}`}>
          {href ? (
            <a
              href={href}
              aria-label={ariaLabel}
              className="h-2 w-2 text-gray-600 transition-colors hover:text-gray-400 dark:text-white"
              target="_blank"
              rel="nofollow"
            >
              <Icon />
            </a>
          ) : null}
        </div>
      ))}
    </div>
  );
}
