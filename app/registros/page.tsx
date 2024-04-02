import Button from "../settings/components/Button";
export default function register() {
    return (
        <main className="bg-white m-3">
            <h1>REGISTROS</h1>
            <div className="flex">
                <Button
                    buttonName="Crear"
                    ariaLabel="Crear Registro"
                    buttonType="button"
                    url="/registros/crear"
                    target="_self"
                    rel="tag"
                />
            </div>
        </main>
    );
}
