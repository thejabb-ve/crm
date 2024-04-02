const principal: menu.principal[] = [
    {
        key: "home",
        page: "Home",
        url: "/dashboard",
        target: "_self",
        ariaLabel: "Ir a la página principal",
        rel: "tag",
    },
    {
        key: "candidates",
        page: "Candidatos",
        url: "/dashboard/candidatos",
        target: "_self",
        ariaLabel: "Ir a la página de candidatos",
        rel: "tag",
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
        key: "register",
        page: "Registros",
        url: "/dashboard/registros",
        target: "_self",
        ariaLabel: "Ir a la página de registros",
        rel: "tag",
    },
    {
        key: "logout",
        page: "Cerrar Sesión",
        url: "/",
        target: "_self",
        ariaLabel: "Cerrar Sesión",
        rel: "tag",
    },
];

export default { principal };
