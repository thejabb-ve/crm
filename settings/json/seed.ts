export const accounts: Database.Account[] = [
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
    status: 1,
    owner_id: '7b1e7038-6bab-4666-876c-02751f71b8a8',
    enterprise_id: 1,
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
    owner_id: '7b1e7038-6bab-4666-876c-02751f71b8a8',
    enterprise_id: 1,
  },
  {
    id: 3,
    name: 'Pepe Rosales',
    birthday: '1995-03-05',
    email: 'a@a.com',
    phone: '+584242916170',
    instagram: '@thejabb',
    sector_id: 1,
    estimated_salary: 0,
    estimated_expenses: 0,
    family_burden: [],
    type: 1,
    status: 5,
    owner_id: '7b1e7038-6bab-4666-876c-02751f71b8a8',
    enterprise_id: 1,
  },
];

export const enterprise: Database.Enterprise = {
  id: 1,
  name: 'The Jabb',
  tier: 4,
  payment_account: 1,
  statuses: [
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
  ],
  roles: [
    {
      id: 1,
      name: 'webmaster',
      create_logs: true,
    },
    {
      id: 2,
      name: 'administrator',
      create_logs: true,
    },
    {
      id: 3,
      name: 'employer',
      create_logs: true,
    },
  ],
};

export const users: Database.User[] = [
  {
    id: '7b1e7038-6bab-4666-876c-02751f71b8a8',
    email: 'pedro.rosales@thejabb.com',
    password: '',
    name: 'Pedro Rosales',
    role: 1,
    tags: [],
    active: true,
    enterprise_id: '3a5594a5-3b89-4036-9459-4b889b0325dc',
    created_at: '2025-08-05',
  },
];

export const user: Database.User = {
  id: '7b1e7038-6bab-4666-876c-02751f71b8a8',
  email: 'pedro.rosales@thejabb.com',
  password: '',
  name: 'Pedro Rosales',
  role: 1,
  tags: [],
  active: true,
  enterprise_id: '3a5594a5-3b89-4036-9459-4b889b0325dc',
  created_at: '2025-08-05',
};

export const logs: Database.Logs[] = [
  {
    id: 1,
    message:
      'Lorem, ipsum dolor sit amet consectetur adipisicing elit. In nisi unde optio obcaecati error ab, tempore perspiciatis exercitationem cumque expedita nostrum dicta laboriosam fugit eius temporibus reiciendis placeat rerum cupiditate officia excepturi reprehenderit praesentium, nam quasi debitis. Architecto enim iure maiores sed quod similique reiciendis voluptatibus voluptates corporis itaque qui ratione nihil aliquam aliquid dolorum nam at, totam excepturi nisi!',
    via: 1,
    next_meeting: '2025-08-10',
    account_id: 1,
    date: '2025-08-05',
    created_by: '7b1e7038-6bab-4666-876c-02751f71b8a8',
  },
  {
    id: 2,
    message: 'Segundo registro',
    via: 2,
    account_id: 2,
    date: '2025-08-05',
    created_by: '7b1e7038-6bab-4666-876c-02751f71b8a8',
  },
  {
    id: 3,
    message: 'Tercer registro',
    via: 3,
    account_id: 1,
    date: '2025-08-05',
    created_by: '7b1e7038-6bab-4666-876c-02751f71b8a8',
  },
];

export const recentViewed: Database.recentViewed[] = [
  {
    id: 1,
    name: 'Pedro Rosales',
    href: '/dashboard/candidatos/perfil?id=1',
    user_id: 1,
  },
  {
    id: 2,
    name: 'Alejandro Rosales',
    href: '/dashboard/candidatos/perfil?id=2',
    user_id: 2,
  },
];
