'use client';
import { Inputs, Button } from 'jabb-astro-components';
import { via } from '@/settings/json/config';
import { getOwner } from '@/functions/utils';

function getIndex(index: Database.Index[], id: number): string {
  const result: string = index.filter((item) => item.id === id)[0].name;
  return result;
}

export default function Logs({
  logs,
  users,
}: {
  logs: Database.Logs[];
  users: Database.User[];
}) {
  const options: string[] = [];
  via.forEach(({ name }) => options.push(name));

  async function submit(form: FormData) {}

  return (
    <section className="profileContainer">
      <form action={submit}>
        <fieldset className="grid grid-cols-2 gap-3">
          <legend className=" col-span-2">Registros</legend>
          <Inputs.Select
            Enum={{}}
            options={options}
            onChange={() => {}}
            name="via"
            required={true}
            label={{ className: 'label', text: 'Método de Contacto' }}
            className="input w-full"
          />
          <Inputs.Date
            name="next_meeting"
            required={false}
            label={{ className: 'label', text: 'Próxima Reunión' }}
            className="input w-full"
            onChange={() => {}}
          />
          <div className="col-span-2">
            <Inputs.TextArea
              name="message"
              required={true}
              label={{ className: 'label', text: 'Comentarios' }}
              className="input w-full"
              onChange={() => {}}
            />
          </div>
        </fieldset>
        <Button.Button1
          ariaLabel="Crear nuevo registro"
          name="Guardar"
          type="submit"
        />
      </form>
      <section>
        <h3>Registros Anteriores</h3>
        <div className="relative h-[300px] w-full">
          {logs.length ? (
            <div className="absolute h-[290px] w-full overflow-auto">
              {logs.map((item) => (
                <div
                  key={`key-candidate-log-${item.id}`}
                  className="my-1 rounded bg-white p-3 shadow"
                >
                  <p className="mb-2 rounded bg-gray-100 p-3 font-light leading-6">
                    {item.message}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    <p className="text-sm">
                      Vía{' '}
                      <span className="italic">{getIndex(via, item.via)}</span>
                    </p>
                    <p className="text-sm">
                      Creado por{' '}
                      <span className="italic">
                        {getOwner(users, item.created_by)}
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
