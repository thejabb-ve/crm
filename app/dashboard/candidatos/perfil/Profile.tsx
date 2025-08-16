'use client';
import { Inputs, Events } from 'jabb-astro-components';
import { useState } from 'react';
import TwoButtons from '@/components/TwoButtons';
import Date from '@/toJabb/Date';
import Validation from '@/functions/classes/validation';
import { updateElement } from '@/functions/server';

const twoButtons: Interface.TwoButtonsProps = {
  button1: {
    ariaLabel: 'Actualizar Candidato',
    name: 'Guardar',
    type: 'submit',
  },
  button2: {
    ariaLabel: 'Cancelar cambios de candidato',
    name: 'Regresar',
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
    id,
    name,
    email,
    phone,
    instagram,
    birthday,
    estimated_salary = 0,
    estimated_expenses = 0,
  } = data;

  const [formData, setFormData] = useState({
    name,
    email,
    phone,
    instagram,
    birthday,
    estimated_expenses,
    estimated_salary,
  });
  const [response, setResponse] = useState<Forms.Response | undefined>();

  async function submit() {
    Events.Utils.show('loading', true);
    const validate: Forms.Response = Validation.newCandidate(formData);
    if (validate.status < 200 || validate.status >= 300) {
      setResponse(validate);
      return Events.Utils.show('loading', false);
    }

    try {
      const { status, response: Response } = await updateElement(
        'accounts',
        {
          ...formData,
        },
        { column: 'id', value: id as string },
      );
      if (status >= 200 && status < 300) {
        setFormData(JSON.parse(Response));
        setResponse({
          response: 'Información actualizada exitosamente',
          status,
        });
        Events.Utils.show('loading', false);
      } else {
        setResponse({ status, response: Response });
        return Events.Utils.show('loading', false);
      }
    } catch {
      setResponse({
        status: 500,
        response: 'Ocurrió un error, intente nuevamente',
      });
      return Events.Utils.show('loading', false);
    }
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
            defaultValue={formData.name}
            placeholder="Nombre Apellido"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'name',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <p className="mx-2 my-auto align-middle text-sm">
            <span className="label">Propietario:</span> <span>{owner}</span>
          </p>
          <Inputs.Text
            name="phone"
            label={{ text: 'Número Telefónico', className: 'label' }}
            required={true}
            defaultValue={formData.phone}
            placeholder="04121234567"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'phone',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <Date
            name="birthday"
            label={{ text: 'Fecha de Nacimiento', className: 'label' }}
            required={false}
            defaultValue={formData.birthday}
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'birthday',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <Inputs.Text
            name="email"
            required={false}
            label={{ text: 'Correo Electrónico', className: 'label' }}
            defaultValue={formData.email}
            placeholder="correo@electronico.com"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'email',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <Inputs.Text
            name="instagram"
            required={false}
            label={{ text: 'Instagram', className: 'label' }}
            defaultValue={formData.instagram}
            placeholder="@usuario"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'instagram',
                formData,
                setFormData,
              )
            }
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
            defaultValue={
              formData.estimated_salary
                ? formData.estimated_salary.toString()
                : '0'
            }
            placeholder="0"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'estimated_salary',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <Inputs.Text
            name="estimated_expenses"
            required={false}
            label={{ text: 'Gasto Estimado', className: 'label' }}
            defaultValue={
              formData.estimated_expenses
                ? formData.estimated_expenses.toString()
                : '0'
            }
            placeholder="0"
            onChange={(e) =>
              Events.Forms.handleInput(
                e.target.value,
                'estimated_expenses',
                formData,
                setFormData,
              )
            }
            className="input w-full"
          />
          <p className="mx-2 my-auto align-middle text-sm">
            <span className="label">Ahorro Estimado:</span>{' '}
            <span>
              ${formData.estimated_salary - formData.estimated_expenses}
            </span>
          </p>
        </fieldset>
        <TwoButtons {...twoButtons} />
        {response && (
          <p
            className={`${response.status >= 200 && response.status < 300 ? 'text-green-500' : 'text-red-500'} m-auto w-full text-center text-sm italic`}
          >
            {response.response}
          </p>
        )}
      </form>
    </section>
  );
}
