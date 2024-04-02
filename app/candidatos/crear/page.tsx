import Button from "../../settings/components/Button";

export default function Create() {
    return (
        <main className="bg-white m-3">
            <h1>CREAR CANDIDATO</h1>
            <div className="flex">
                <Button
                    buttonName="Volver"
                    ariaLabel="Ver lista de Candidatos"
                    buttonType="button"
                    url="/candidatos"
                    target="_self"
                    rel="tag"
                />
            </div>
        </main>
    );
}
