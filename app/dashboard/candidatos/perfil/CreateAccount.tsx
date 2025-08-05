'use client';
import { Button } from 'jabb-astro-components';

export default function CreateAccount({ id }: { id: Database.id }) {
  async function convert(id: Database.id) {}

  return (
    <div className="profileContainer mb-2 grid grid-cols-2">
      <h2 className="m-auto">Convertir a Cuenta</h2>
      <Button.Button1
        ariaLabel="Convertir candidato a cuenta"
        name="Convertir"
        type="button"
        onClick={() => convert(id)}
      />
    </div>
  );
}
