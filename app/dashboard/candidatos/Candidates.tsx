import TwoButtons from '@/components/TwoButtons';
import Table from '@/toJabb/Table';
import Tag from '@/toJabb/Tag';
import Social from '@/toJabb/Social';
import Resume from '@/components/Resume';
import Search from '@/components/Search';
import Get from '@/functions/classes/getter';
import AddRecent from './AddRecent';

const twoButtons: Interface.TwoButtonsProps = {
  button1: {
    name: 'Nuevo',
    ariaLabel: 'Crear Candidato',
    href: '/dashboard/candidatos/nuevo',
  },
  button2: {
    name: 'Volver',
    ariaLabel: 'Volver al Dashboard',
    href: '/dashboard',
  },
};

const headers: string[] = [
  'Nombre',
  'Status',
  'Resumen',
  'Información de Contacto',
];

export default function Candidates({
  data,
  userId,
  owners,
  statuses,
  query,
  recent,
}: {
  data: Database.Candidate[];
  statuses: Database.Status[];
  owners: Database.getOwner[];
  query?: string;
  userId: string;
  recent: Database.Recent[];
}) {
  const fullDate: Date = new Date();
  const year: number = fullDate.getFullYear();
  const month: number = fullDate.getMonth();

  return (
    <section>
      <Search placeholder="Buscar..." defaultValue={query} />
      <Table headers={headers}>
        {data.length ? (
          data.map(
            (
              { estimated_expenses = 0, estimated_salary = 0, ...item },
              index,
            ) => (
              <tr
                key={item.phone}
                className="bg-white transition-colors hover:bg-blue-50"
              >
                <td className="tableElement">
                  <AddRecent id={userId} item={item} recent={recent} />
                </td>
                <td className="tableElement">
                  <Tag
                    statuses={statuses}
                    status={item.status}
                    id={`${item.name}-${index}`}
                  />
                </td>
                <td className="tableElement">
                  <Resume
                    phone={item.phone}
                    mail={item.email}
                    familyBurden={
                      item.family_burden && item.family_burden.length > 0
                        ? item.family_burden.length
                        : undefined
                    }
                    estimatedSave={
                      estimated_salary - estimated_expenses > 0
                        ? estimated_salary - estimated_expenses
                        : undefined
                    }
                    birthday={Get.age(year, month, item.birthday)}
                    owner={Get.filter(owners, item.owner_id).name}
                  />
                </td>
                <td className="tableElement">
                  <Social
                    id={item.id as any}
                    name={item.name}
                    phone={item.phone}
                    ig={item.instagram}
                    mail={item.email}
                  />
                </td>
              </tr>
            ),
          )
        ) : (
          <tr>
            <td className="absolute top-1/3 w-full text-center font-light">
              No existen Candidatos, ¡Crea el primero!
            </td>
          </tr>
        )}
      </Table>
      <TwoButtons {...twoButtons} />
    </section>
  );
}
