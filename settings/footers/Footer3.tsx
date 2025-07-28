import { menu } from '../json/menus';
import { Events } from 'jabb-astro-components';

export default function Footer3() {
  return (
    <div className="footer">
      <p className="text mx-auto mb-2 font-semibold">Nosotros</p>
      <ul>
        {menu.menu[2].subMenu?.map((item) => (
          <li key={Events.Utils.slugify(item.name)} className="text mb-2">
            <a href={item.href} aria-label={item.name} rel={item.rel}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
