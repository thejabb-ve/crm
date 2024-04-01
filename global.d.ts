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
    }

    declare module menu {
        type principal = {
            key: string | number;
            page: string;
            url: string;
            target: basic.TargetPage;
            ariaLabel: string;
            rel: basic.RelationLink;
        };
    }
}
