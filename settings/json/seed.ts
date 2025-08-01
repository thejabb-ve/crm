export const sectors: Database.Index[] = [
  {
    id: 1,
    name: 'Tecnología',
  },
  {
    id: 2,
    name: 'Marketing',
  },
];

export const type: Database.Index[] = [
  {
    id: 1,
    name: 'candidate',
  },
  {
    id: 2,
    name: 'account',
  },
  {
    id: 3,
    name: 'key account',
  },
];

export const statuses: Database.Status[] = [
  {
    id: 1,
    name: 'New',
    config: 'bg-blue-200 border-blue-700 text-blue-700',
  },
  {
    id: 2,
    name: 'Open',
    config: 'bg-yellow-200 border-yellow-700 text-yellow-700',
  },
  {
    id: 3,
    name: 'Negotiating',
    config: 'bg-red-200 border-red-700 text-red-700',
  },
  {
    id: 4,
    name: 'Processing',
    config: 'bg-gray-200 border-gray-700 text-gray-700',
  },
  {
    id: 5,
    name: 'Active',
    config: 'bg-green-200 border-green-700 text-green-700',
  },
];

export const candidates: Database.Candidate[] = [
  {
    id: 1,
    name: 'Pedro Rosales',
    birthday: '1995-09-05',
    email: 'p@p.com',
    phone: '+58424291614',
    instagram: '@pedro',
    sector_id: 1,
    estimated_salary: 1000,
    estimated_expenses: 500,
    family_burden: [
      {
        birthday: '2010-05-03',
        name: 'Isabella Rosales',
        comments: 'Es su hermana',
      },
    ],
    type: 1,
    status: 3,
    owner_id: 1,
  },
  {
    id: 2,
    name: 'Alejandro Rosales',
    birthday: '1995-03-05',
    email: 'a@a.com',
    phone: '+584242916174',
    instagram: '@thejabb',
    sector_id: 1,
    estimated_salary: 0,
    estimated_expenses: 0,
    family_burden: [],
    type: 1,
    status: 5,
    owner_id: 1,
  },
];
