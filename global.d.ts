export {};

declare global {
    declare module basic {
        type RelationLink =
            | "nofollow"
            | "external"
            | "next"
            | "prev"
            | "tag"
            | "alternate";

        type ImgFormat = "jpeg" | "jpg" | "png" | "svg" | "webp";

        type TargetPage = "_blank" | "_self";

        type ButtonType = "button" | "submit" | "reset";

        type keyType = string | number;
    }

    declare module menu {
        type principal = {
            key: basic.keyType;
            page: string;
            url: string;
            target: basic.TargetPage;
            ariaLabel: string;
            rel: basic.RelationLink;
        };
    }

    declare module button {
        type basic = {
            buttonName: string;
            ariaLabel: string;
            buttonType: basic.ButtonType;
            url?: string;
            target?: basic.TargetPage;
            rel?: basic.RelationLink;
            addClass?: string;
        };
    }
}
