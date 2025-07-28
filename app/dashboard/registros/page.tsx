'use client';
import { Button } from 'jabb-astro-components';
export default function register() {
  return (
    <main className="m-3 bg-white">
      <h1>REGISTROS</h1>
      <div className="flex">
        <Button.Button1
          name="Crear"
          ariaLabel="Crear Registro"
          href="/dashboard/registros/crear"
        />
      </div>
    </main>
  );
}
