import Button from "../../settings/components/Button";

export default function Create() {
    return (
        <main className="bg-white m-3">
            <h1>CREAR REGISTRO</h1>
            <div className="flex">
                <Button
                    buttonName="Volver"
                    ariaLabel="Ver lista de logs"
                    buttonType="button"
                    url="/registros"
                    target="_self"
                    rel="tag"
                />
            </div>
        </main>
    );
}
