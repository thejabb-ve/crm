export {};

declare global {
    declare module database {
        type user = {
            id: number;
            username: string;
            email: string;
            password: string;
            compliance: boolean;
            sponsor: string;
        };

        type tree = {
            userId: number;
            subs: number[];
        };
    }
}
