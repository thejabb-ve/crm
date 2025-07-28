'use client';
import { Button } from 'jabb-astro-components';

export default function Profile() {
  return (
    <main className="m-3 bg-white">
      <h1>PERFIL DE CANDIDATO</h1>
      <div className="flex">
        <Button.Button1
          name="Volver"
          ariaLabel="Ver lista de Candidatos"
          href="/dashboard/candidatos"
        />
      </div>
    </main>
  );
}
