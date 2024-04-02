import Button from "@/app/settings/components/Button";

export default function Profile() {
    return (
        <main className="bg-white m-3">
            <h1>PERFIL DE CANDIDATO</h1>
            <div className="flex">
                <Button
                    buttonName="Volver"
                    ariaLabel="Ver lista de Candidatos"
                    buttonType="button"
                    url="/dashboard/candidatos"
                    target="_self"
                    rel="tag"
                />
            </div>
        </main>
    );
}
