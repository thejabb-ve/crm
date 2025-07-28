'use client';
import { Button } from 'jabb-astro-components';

export default function Create() {
  const inputClass: string = 'border border-red-200 mx-1 p-2 rounded';

  async function verifyPhone(phone: string) {
    const code: any = document.getElementById('newPhoneCode');
    if (phone.length === 10) return console.log(code.value + phone);
  }

  return (
    <main className="m-3 bg-white">
      <div className="flex">
        <Button.Button1
          name="Volver"
          ariaLabel="Ver lista de Candidatos"
          href="/dashboard/candidatos"
        />
        <h1 className="my-auto ml-3">CREAR CANDIDATO</h1>
      </div>
      <div className="my-5">
        <form id="newCandidate">
          <select
            name="newPhoneCode"
            id="newPhoneCode"
            className={`${inputClass}`}
            required
          >
            <option defaultValue="">Select</option>
            <option value="58">+58</option>
            <option value="1">+1</option>
          </select>
          <input
            type="tel"
            name="newPhone"
            className={`${inputClass}`}
            onChange={(e) => verifyPhone(e.target.value)}
            required
          />
        </form>
      </div>
    </main>
  );
}
