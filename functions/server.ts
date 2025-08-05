'use server';

export async function logout() {
  console.log('work');
}

export async function createElement() {
  console.log('created');
}

export async function getCandidate(
  data: Database.Candidate[],
  id: Database.id,
): Promise<Database.Candidate> {
  const result: Database.Candidate = data.filter(
    (item) => item.id === Number(id),
  )[0];

  return result;
}

export async function getLogs(
  data: Database.Logs[],
  id: Database.id,
): Promise<Database.Logs[]> {
  const result: Database.Logs[] = data.filter(
    ({ account_id }) => account_id === Number(id),
  );

  return result;
}
