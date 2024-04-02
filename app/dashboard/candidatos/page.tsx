import Button from "@/app/settings/components/Button";

export default function Candidates() {
    return (
        <main className="bg-white m-3">
            <h1>CANDIDATOS</h1>

            <div className="flex">
                <Button
                    buttonName="Crear"
                    ariaLabel="Crear Candidato"
                    buttonType="button"
                    url="/dashboard/candidatos/crear"
                    target="_self"
                    rel="tag"
                />
                <Button
                    buttonName="Perfil"
                    ariaLabel="Perfil del Candidato"
                    buttonType="button"
                    url="/dashboard/candidatos/perfil"
                    target="_self"
                    rel="tag"
                />
            </div>
        </main>
    );
}
