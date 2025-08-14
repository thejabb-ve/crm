'use client';
import { useState } from 'react';
import TwoButtons from '@/components/TwoButtons';
import { createElement } from '@/functions/server';
import { Inputs, Events } from 'jabb-astro-components';
import { useRouter } from 'next/navigation';
import Validation from '@/functions/classes/validation';

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

export default function NewCandidate({
  enterprise_id,
  id,
}: {
  enterprise_id: Database.id;
  id: Database.id;
}) {
  const router = useRouter();
  const [data, setData] = useState<{ name: string; phone: string }>({
    name: '',
    phone: '',
  });
  const [response, setResponse] = useState<Forms.Response | undefined>();

  async function submit() {
    Events.Utils.show('loading', true);
    const validate: Forms.Response = Validation.newCandidate(data);
    if (validate.status < 200 || validate.status >= 300) {
      setResponse(validate);
      return Events.Utils.show('loading', false);
    }

    try {
      const { status, response: Response } = await createElement({
        enterprise_id,
        owner_id: id,
        ...data,
      });
      if (status >= 200 && status < 300) {
        setResponse({
          response: 'Se ha creado el candidato exitosamente',
          status,
        });
        Events.Utils.show('loading', false);

        setTimeout(() => {
          return router.push(`/dashboard/candidatos/perfil?id=${Response}`);
        }, 1500);
      } else {
        setResponse({ status, response: Response });
        return Events.Utils.show('loading', false);
      }
    } catch {
      return Events.Utils.show('loading', false);
    }
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
        onChange={(e) =>
          Events.Forms.handleInput(e.target.value, 'name', data, setData)
        }
        className="input w-full"
      />

      <Inputs.Text
        name="phone"
        label={'Número Telefónico'}
        required={true}
        placeholder="04121234567"
        onChange={(e) =>
          Events.Forms.handleInput(e.target.value, 'phone', data, setData)
        }
        className="input w-full"
      />

      <TwoButtons {...twoButtons} />
      {response && (
        <p
          className={`${response.status >= 200 && response.status < 300 ? 'text-green-500' : 'text-red-500'} m-auto w-full text-center text-sm italic`}
        >
          {response.response}
        </p>
      )}
    </form>
  );
}
