export const legal: Menu.principal[] = [
  {
    name: 'Política de Privacidad',
    ariaLabel: 'Ver nuestra política de privacidad',
    href: 'https://clients.thejabb.com/politica-de-privacidad',
    target: '_blank',
    rel: 'nofollow',
  },
  {
    name: 'Política de Cookies',
    ariaLabel: 'Ver nuestra política de cookies',
    href: 'https://clients.thejabb.com/politica-de-cookies',
    target: '_blank',
    rel: 'nofollow',
  },
  {
    name: 'Aviso Legal',
    ariaLabel: 'Ver nuestro aviso legal',
    href: 'https://clients.thejabb.com/aviso-legal',
    target: '_blank',
    rel: 'nofollow',
  },
];

export const login: Menu.menu1 = {
  img: 'https://cdn.thejabb.com/logo/normal.png',
  dark: 'https://cdn.thejabb.com/logo/white.png',
  alt: 'Agencia Jabb - CRM Clients',
  fixed: false,
  menu: [],
};

export const menu: Menu.menu1 = {
  img: 'https://cdn.thejabb.com/logo/normal.png',
  dark: 'https://cdn.thejabb.com/logo/white.png',
  alt: 'Ir a la página principal',
  fixed: false,
  menu: [
    {
      name: 'Dashboard',
      href: '/dashboard',
      ariaLabel: 'Ir a la página principal',
    },
    {
      name: 'Candidatos',
      href: '/dashboard/candidatos',
      ariaLabel: 'Ir a la página de candidatos',
    },
    // {
    //     key: "clients",
    //     page: "Clientes",
    //     url: "/clientes",
    //     target: "_self",
    //     ariaLabel: "Ir a la página principal",
    //     rel: "tag",
    // },
    {
      name: 'Cerrar Sesión',
      ariaLabel: 'Cerrar Sesión',
    },
  ],
};

// export const profileMenu: { key: string; name: string; hr: boolean }[] = [
//   { key: 'company', name: 'Datos de la Compañía', hr: true },
//   { key: 'address', name: 'Dirección', hr: true },
//   { key: 'contact', name: 'Información de Contacto', hr: false },
// ];
