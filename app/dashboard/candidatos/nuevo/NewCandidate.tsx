'use client';
import TwoButtons from '@/components/TwoButtons';
import { createElement } from '@/functions/server';
import { Inputs, Events } from 'jabb-astro-components';

const twoButtons: Interface.TwoButtonsProps = {
  button1: {
    ariaLabel: 'Crear Nuevo Candidato',
    name: 'Guardar',
    type: 'submit',
  },
  button2: {
    ariaLabel: 'Cancelar la creación de nuevo candidato',
    name: 'Cancelar',
    href: '/dashboard/candidatos',
  },
};

export default function NewCandidate() {
  async function submit(formData: FormData) {
    const rawFormData = Events.Utils.rawFormData(formData);
    console.log(rawFormData);
    await createElement();
  }

  return (
    <form
      action={submit}
      className="mx-auto my-5 w-6/12 rounded bg-gray-50 p-8 shadow"
    >
      <Inputs.Text
        name="name"
        required={true}
        label="Nombre del Candidato"
        placeholder="Nombre Apellido"
        onChange={() => {}}
        className="input w-full"
      />

      <Inputs.Text
        name="phone"
        label={'Número Telefónico'}
        required={true}
        placeholder="04121234567"
        onChange={() => {}}
        className="input w-full"
      />

      <TwoButtons {...twoButtons} />
    </form>
  );
}
