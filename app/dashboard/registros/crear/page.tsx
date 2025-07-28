'use client';
import { Button } from 'jabb-astro-components';

export default function Create() {
  return (
    <main className="m-3 bg-white">
      <h1>CREAR REGISTRO</h1>
      <div className="flex">
        <Button.Button1
          name="Volver"
          ariaLabel="Ver lista de logs"
          href="/dashboard/registros"
        />
      </div>
    </main>
  );
}
