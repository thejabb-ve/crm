// import { menu } from '../../json/menus';

export default function Footer() {
  return (
    <div className="footer">
      <p className="text mx-auto mb-2 font-semibold">Nosotros</p>
      {/* <ul>
        {menu.menu[2].subMenu?.map((item) => (
          <li className="text mb-2">
            <a href={item.href} aria-label={item.name} rel={item.rel}>
              {item.name}
            </a>
          </li>
        ))}
      </ul> */}
    </div>
  );
}
