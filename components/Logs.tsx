'use client';
import { useState } from 'react';
import { Inputs, Button, Events } from 'jabb-astro-components';
import { via } from '@/settings/json/config';
import Get from '@/functions/classes/getter';
import { useRouter } from 'next/navigation';
import { createElement, updateStatus } from '@/functions/server';
import Validation from '@/functions/classes/validation';

export default function Logs({
  logs,
  owners,
  account_id,
  created_by,
  status,
  statuses,
}: {
  logs: Database.Logs[];
  owners: Database.getOwner[];
  account_id: Database.id;
  created_by: Database.id;
  status: number;
  statuses: Database.Status[];
}) {
  const router = useRouter();
  const [formData, setFormData] = useState<Database.Logs>({
    via: 0,
    message: '',
    account_id,
    created_by,
    date: new Date().toISOString().slice(0, 10),
  });
  const [response, setResponse] = useState<Forms.Response | undefined>();

  const options: string[] = ['Seleccione una opción'];
  via.forEach(({ name }) => options.push(name));

  async function submit() {
    Events.Utils.show('loading', true);
    const validate: Forms.Response = Validation.newLog(formData);
    if (validate.status < 200 || validate.status >= 300) {
      setResponse(validate);
      return Events.Utils.show('loading', false);
    }
    const form = document.getElementById('createLog') as HTMLFormElement;
    try {
      const { status: Status, response: Response } = await createElement(
        'logs',
        formData,
      );
      if (Status >= 200 && Status < 300) {
        await updateStatus(
          account_id as string,
          formData.via,
          status,
          statuses,
        );
        setResponse({
          response: 'Se ha creado el candidato exitosamente',
          status: Status,
        });
        form.reset();
        Events.Utils.show('loading', false);
        router.refresh();
      } else {
        setResponse({ status: Status, response: Response });
        return Events.Utils.show('loading', false);
      }
    } catch {
      return Events.Utils.show('loading', false);
    }
  }

  return (
    <section className="profileContainer darkContainer">
      <form action={submit} id="createLog">
        <fieldset className="grid grid-cols-2 gap-3">
          <legend className="darkTitle col-span-2">Registros</legend>
          <Inputs.Select
            label={{ className: 'label', text: 'Método de Contacto' }}
            name="via"
            options={options}
            className="input w-full"
            value={formData.via}
            onChange={(e) =>
              Events.Forms.handleInput(
                Number(e.target.value),
                'via',
                formData,
                setFormData,
              )
            }
            required={true}
          />
          <div>
            <Inputs.Date
              name="date"
              required={true}
              label={{ className: 'label', text: 'Día de Contacto' }}
              className="input w-full"
              defaultValue={formData.date}
              onChange={(e) =>
                Events.Forms.handleInput(
                  e.target.value,
                  'date',
                  formData,
                  setFormData,
                )
              }
            />
            <Inputs.Date
              name="next_meeting"
              required={false}
              label={{ className: 'label', text: 'Próxima Reunión' }}
              className="input w-full"
              onChange={(e) =>
                Events.Forms.handleInput(
                  e.target.value,
                  'next_meeting',
                  formData,
                  setFormData,
                )
              }
            />
          </div>
          <div className="col-span-2">
            <Inputs.TextArea
              name="message"
              required={true}
              label={{ className: 'label', text: 'Comentarios' }}
              className="input w-full"
              onChange={(e) =>
                Events.Forms.handleInput(
                  e.target.value,
                  'message',
                  formData,
                  setFormData,
                )
              }
            />
          </div>
        </fieldset>
        <Button.Button1
          ariaLabel="Crear nuevo registro"
          name="Guardar"
          type="submit"
        />
        {response && (
          <p
            className={`${response.status >= 200 && response.status < 300 ? 'text-green-500' : 'text-red-500'} m-auto w-full text-center text-sm italic`}
          >
            {response.response}
          </p>
        )}
      </form>
      <section>
        <h3>Registros Anteriores</h3>
        <div className="relative h-[300px] w-full">
          {logs.length ? (
            <div className="absolute h-[290px] w-full overflow-auto">
              {logs.map((item) => (
                <div
                  key={`key-candidate-log-${item.id}`}
                  className="darkAltContainer my-1 rounded bg-white p-3 shadow"
                >
                  <p className="darkContainer mb-2 rounded bg-gray-100 p-3 font-light leading-6">
                    {item.message}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <p className="text-sm">
                      Vía{' '}
                      <span className="italic">
                        {Get.filter(via, item.via).name}
                      </span>
                    </p>
                    <p className="text-sm">
                      Creado por{' '}
                      <span className="italic">
                        {Get.filter(owners, item.created_by).name}
                      </span>
                    </p>
                    {item.next_meeting && (
                      <p className="text-sm">
                        Prox. Reunión{' '}
                        <span className="italic">{item.next_meeting}</span>
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="m-auto text-center font-light">
              No existen registros, ¡crea el primero!
            </p>
          )}
        </div>
      </section>
    </section>
  );
}
