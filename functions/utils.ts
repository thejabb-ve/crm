export function getAge(year: number, month: number, date?: string): number {
  if (!date) return 0;

  const birthday: string[] = date.split('-');

  const age: number = year - Number(birthday[0]);
  const thisYear: number = Number(birthday[1]) - month - 1;

  return age + (thisYear > 0 ? -1 : 0);
}

export function getOwner(data: Database.User[], id: Database.id): string {
  const result: string = data.filter((item) => item.id === id)[0].name;

  return result;
}
