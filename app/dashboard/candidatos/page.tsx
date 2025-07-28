'use client';
import { Button } from 'jabb-astro-components';

export default function Candidates() {
  const candidates = [
    {
      name: 'Pedro',
      lastName: 'Rosales',
      company: 'Jabb',
      status: 'active',
      email: 'p@p.com',
      phone: '58400000',
      instagram: 'https://instagram.com/pedrorosaleshidalgo',
      ownerId: 1,
    },
    {
      name: 'Pedro',
      lastName: 'Rosales',
      company: 'Jabb',
      status: 'active',
      email: 'p@p.com',
      phone: '58400000',
      instagram: 'https://instagram.com/pedrorosaleshidalgo',
      ownerId: 1,
    },
  ];

  return (
    <main className="m-3 bg-white">
      <h1>CANDIDATOS</h1>
      <div>
        {candidates.map((item) => (
          <div key={item.phone}>
            <h2>{`${item.name} ${item.lastName}`}</h2>
            {item.company ? <h3>{item.company}</h3> : null}
            <h4>
              Status: <span>{item.status}</span>
            </h4>
            <div>
              <p>Tel: {item.phone}</p>
              <p>Ig: {item.instagram}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <Button.Button1
          name="Crear"
          ariaLabel="Crear Candidato"
          href="/dashboard/candidatos/crear"
        />
        <Button.Button1
          name="Perfil"
          ariaLabel="Perfil del Candidato"
          href="/dashboard/candidatos/perfil"
        />
      </div>
    </main>
  );
}
