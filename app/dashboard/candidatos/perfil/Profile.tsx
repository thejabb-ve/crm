'use client';
import { Inputs, Events } from 'jabb-astro-components';
import TwoButtons from '@/components/TwoButtons';
import Date from '@/toJabb/Date';

const twoButtons: Interface.TwoButtonsProps = {
  button1: {
    ariaLabel: 'Actualizar Candidato',
    name: 'Guardar',
    type: 'submit',
  },
  button2: {
    ariaLabel: 'Cancelar cambios de candidato',
    name: 'Cancelar',
    href: '/dashboard/candidatos',
  },
};

export default function Profile({
  data,
  owner,
}: {
  data: Database.Candidate;
  owner: string;
}) {
  const {
    name,
    email,
    phone,
    instagram,
    birthday,
    estimated_salary = 0,
    estimated_expenses = 0,
  } = data;

  async function submit(formData: FormData) {
    const rawFormData = Events.Utils.rawFormData(formData);

    console.log(rawFormData);
  }

  return (
    <section className="profileContainer">
      <form action={submit}>
        <fieldset className="grid grid-cols-2 gap-3">
          <legend className="col-span-2 mb-3">Información de Contacto</legend>
          <Inputs.Text
            name="name"
            required={true}
            label={{ text: 'Nombre', className: 'label' }}
            defaultValue={name}
            placeholder="Nombre Apellido"
            onChange={() => {}}
            className="input w-full"
          />
          <p className="mx-2 my-auto align-middle text-sm">
            <span className="label">Propietario:</span> <span>{owner}</span>
          </p>
          <Inputs.Text
            name="phone"
            label={{ text: 'Número Telefónico', className: 'label' }}
            required={true}
            defaultValue={phone}
            placeholder="04121234567"
            onChange={() => {}}
            className="input w-full"
          />
          <Date
            name="birthday"
            label={{ text: 'Fecha de Nacimiento', className: 'label' }}
            required={false}
            defaultValue={birthday}
            className="input w-full"
          />
          <Inputs.Text
            name="email"
            required={false}
            label={{ text: 'Correo Electrónico', className: 'label' }}
            defaultValue={email}
            placeholder="correo@electronico.com"
            onChange={() => {}}
            className="input w-full"
          />
          <Inputs.Text
            name="instagram"
            required={false}
            label={{ text: 'Instagram', className: 'label' }}
            defaultValue={instagram}
            placeholder="correo@electronico.com"
            onChange={() => {}}
            className="input w-full"
          />
        </fieldset>
        <fieldset className="mt-3 grid grid-cols-3 gap-3 rounded">
          <legend className="col-span-2 mb-3">
            Ingresos y Egresos Mensuales
          </legend>
          <Inputs.Text
            name="estimated_salary"
            required={false}
            label={{ text: 'Ingreso Estimado', className: 'label' }}
            defaultValue={estimated_salary ? estimated_salary.toString() : '0'}
            placeholder="0"
            onChange={() => {}}
            className="input w-full"
          />
          <Inputs.Text
            name="estimated_expenses"
            required={false}
            label={{ text: 'Gasto Estimado', className: 'label' }}
            defaultValue={
              estimated_expenses ? estimated_expenses.toString() : '0'
            }
            placeholder="0"
            onChange={() => {}}
            className="input w-full"
          />
          <p className="mx-2 my-auto align-middle text-sm">
            <span className="label">Ahorro Estimado:</span>{' '}
            <span>${estimated_salary - estimated_expenses}</span>
          </p>
        </fieldset>
        <TwoButtons {...twoButtons} />
      </form>
    </section>
  );
}
