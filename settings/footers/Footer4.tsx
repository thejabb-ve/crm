import { menu } from '../json/menus';
import { Events } from 'jabb-astro-components';

export default function Footer4() {
  return (
    <div className="footer">
      <p className="text mx-auto mb-2 font-semibold">Contáctame</p>
      <ul>
        {menu.menu[6].subMenu?.map((item) => (
          <li key={Events.Utils.slugify(item.name)} className="text mb-2">
            <a href={item.href} aria-label={item.name} rel={item.rel}>
              {item.ariaLabel}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
