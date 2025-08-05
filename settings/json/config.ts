export const via: Database.Index[] = [
  {
    id: 1,
    name: 'Llamada',
  },
  {
    id: 2,
    name: 'Reunión Presencial',
  },
  {
    id: 3,
    name: 'Reunión Online',
  },
  {
    id: 4,
    name: 'Presentación Grupal',
  },
  {
    id: 5,
    name: 'Correo Electrónico',
  },
  {
    id: 6,
    name: 'WhatsApp',
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

export const tier: Database.Tier[] = [
  {
    id: 1,
    name: 'free',
    create_logs: true,
    month_limit_logs: 10,
  },
  {
    id: 2,
    name: 'basic',
    create_logs: true,
    month_limit_logs: 1000,
  },
  {
    id: 3,
    name: 'business',
    create_logs: true,
    month_limit_logs: 50000,
  },
  {
    id: 4,
    name: 'enterprise',
    create_logs: true,
    month_limit_logs: 1000000,
  },
];

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
