import Button from "@/app/settings/components/Button";

export default function Home() {
    return (
        <Button
            buttonName="LOGIN"
            ariaLabel="login"
            buttonType="button"
            url="/dashboard"
            target="_self"
            rel="tag"
        />
    );
}
