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

enum Phone {
  ve = '58',
}

export default function NewClient() {
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

      <Inputs.Label htmlFor="phone" name="Número Telefónico" required />
      <div className=" grid w-full grid-cols-5 gap-2">
        <Inputs.Select
          Enum={Phone}
          name="phoneExt"
          options={['+58']}
          required
          className="input w-full"
        />
        <div className="col-span-4 w-full">
          <Inputs.Text
            name="phone"
            required={true}
            placeholder="4121234567"
            onChange={() => {}}
            className="input w-full"
          />
        </div>
      </div>

      <TwoButtons {...twoButtons} />
    </form>
  );
}
